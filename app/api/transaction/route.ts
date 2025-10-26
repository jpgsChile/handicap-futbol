import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFileSync, unlinkSync, existsSync, readFileSync } from 'fs';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { 
      contractAddress,
      contractName,
      functionName, 
      args, 
      mode = 'dev', // 'dev' o 'wallet'
      userAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM' // Default devnet address
    } = await request.json();
    
    console.log(`Ejecutando ${functionName} en modo ${mode}`);
    
    // Crear archivo temporal con el comando
    const tempFile = `/tmp/clarinet_transaction_${Date.now()}.clar`;
    let command = '';
    
    // En modo dev (clarinet console), intentaremos dos formas de principal:
    // 1) .contract
    // 2) 'ST...address.contract
    // En modo wallet/test, solo se usa forma completa con comilla
    const contractIdDevDot = `.${contractName}`;
    const contractIdFull = `${contractAddress}.${contractName}`;
    const principalExpr = mode === 'dev' ? contractIdDevDot : `'${contractIdFull}`;

    // Helper para sanitizar strings (reemplaza comillas)
    const s = (val: string) => String(val).replace(/"/g, '\\"');

    const buildCommand = (principal: string) => {
      switch (functionName) {
        case 'crear-liga':
          return `(contract-call? ${principal} crear-liga "${s(args[0])}" "${s(args[1])}" "${s(args[2])}")`;
        case 'crear-club':
          return `(contract-call? ${principal} crear-club "${s(args[0])}" u${args[1]} ${args[2] ? 'true' : 'false'})`;
        case 'registrar-jugador':
          return `(contract-call? ${principal} registrar-jugador-ff "${s(args[0])}" "${s(args[1])}" "${s(args[2])}" "${s(args[3])}" "${s(args[4])}" ${args[5] ? 'true' : 'false'} none "${s(args[6])}")`;
        case 'get-liga':
          return `(contract-call? ${principal} get-liga u${args[0]})`;
        case 'get-club':
          return `(contract-call? ${principal} get-club u${args[0]})`;
        case 'get-jugador':
          return `(contract-call? ${principal} get-jugador '${args[0]})`;
        default:
          return null;
      }
    };
    command = buildCommand(principalExpr) || '';
    if (!command) {
      return NextResponse.json({ success: false, error: `Función ${functionName} no soportada`, mode });
    }
    
    // Escribir comando a archivo temporal y ejecutar (modo robusto en dev)
    const runConsole = async (body: string) => {
      const tf = `/tmp/clarinet_tx_${Date.now()}_${Math.random()}.clar`;
      writeFileSync(tf, body);
      const cmd = `clarinet console < ${tf}`;
      try {
        const { stdout, stderr } = await execAsync(cmd, { cwd: process.cwd(), timeout: 30000 });
        try { unlinkSync(tf); } catch {}
        return { cmd, out: (stdout || stderr), error: null };
      } catch (e: any) {
        const out = (e?.stdout || e?.stderr || e?.message || String(e));
        try { unlinkSync(tf); } catch {}
        return { cmd, out, error: e?.message || String(e) };
      }
    };

    if (mode === 'dev') {
      // Intento 1: .contract
      const commandDot = buildCommand(contractIdDevDot)!;
      const r1 = await runConsole(commandDot);
      const ok1 = /(^|\n)\s*\((ok|some)\b/i.test(r1.out) && !/error:/i.test(r1.out);
      if (ok1) {
        return NextResponse.json({ success: true, data: r1.out, mode, function: functionName, args, command: r1.cmd, variant: 'dot', ts: new Date().toISOString() });
      }
      // Intento 2: 'address.contract (reconstruir comando)
      const commandFull = buildCommand(`'${contractIdFull}`)!;
      const r2 = await runConsole(commandFull);
      const ok2 = /(^|\n)\s*\((ok|some)\b/i.test(r2.out) && !/error:/i.test(r2.out);
      if (ok2) {
        return NextResponse.json({ success: true, data: r2.out, mode, function: functionName, args, command: r2.cmd, variant: 'full', ts: new Date().toISOString() });
      }
      // Fallback MOCK: simular estado en archivo local si clarinet no está disponible
      try {
        const stateFile = `${process.cwd()}/.dev-state.json`;
        let state: any = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, 'utf-8')) : { leagues: [], nextLeagueId: 0, clubs: [], players: [] };
        const save = () => writeFileSync(stateFile, JSON.stringify(state, null, 2));
        switch (functionName) {
          case 'crear-liga': {
            const id = (state.nextLeagueId || 0) + 1;
            state.nextLeagueId = id;
            state.leagues.push({ id, nombre: String(args[0]), ubicacion: String(args[1]), categoria: String(args[2]) });
            save();
            return NextResponse.json({ success: true, data: `(ok u${id})`, mode, mock: true });
          }
          case 'crear-club': {
            const id = (state.nextClubId || 0) + 1;
            state.nextClubId = id;
            state.clubs.push({ id, nombre: String(args[0]), leagueId: Number(args[1]), gkFijo: !!args[2] });
            save();
            return NextResponse.json({ success: true, data: `(ok u${id})`, mode, mock: true });
          }
          case 'registrar-jugador':
          case 'registrar-jugador-ff': {
            state.players = state.players || [];
            state.players.push({
              who: 'mock-tx-sender', nombre: String(args[0]), apodo: String(args[1]), pos1: String(args[2]), pos2: String(args[3]||''), pos3: String(args[4]||''), minor: !!args[5], visibility: String(args[7]||'public')
            });
            save();
            return NextResponse.json({ success: true, data: `(ok true)`, mode, mock: true });
          }
          default: {
            return NextResponse.json({ success: false, error: 'clarinet console failed', details: { first: r1.out, second: r2.out }, mode, function: functionName });
          }
        }
      } catch (mockErr: any) {
        return NextResponse.json({ success: false, error: 'dev-mock failed', details: String(mockErr), mode, function: functionName });
      }
    } else {
      // Wallet/test: un único intento con principal completo
      const commandWallet = buildCommand(`'${contractIdFull}`)!;
      writeFileSync(tempFile, commandWallet);
      const clarinetCommand = `clarinet console < ${tempFile}`;
      console.log(`Ejecutando: ${clarinetCommand}`);
      try {
        const { stdout, stderr } = await execAsync(clarinetCommand, { cwd: process.cwd(), timeout: 30000 });
        try { unlinkSync(tempFile); } catch {}
        const result = stdout || stderr;
        const isSuccess = result.includes('(ok') || result.includes('(some');
        return NextResponse.json({ success: isSuccess, data: result, mode, function: functionName, args, command: clarinetCommand, timestamp: new Date().toISOString() });
      } catch (error: any) {
        try { unlinkSync(tempFile); } catch {}
        return NextResponse.json({ success: false, error: error?.message, details: error?.stdout || error?.stderr || null, mode, function: functionName, command: clarinetCommand });
      }
    }
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}

