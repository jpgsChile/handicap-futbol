import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFileSync, unlinkSync } from 'fs';
import {
  CN_LEAGUE,
  CN_CLUB,
  CN_PLAYER,
  CN_GAME,
  CN_LINEUP,
  CN_EVENT,
  CN_ROLES,
  CN_ATTEST,
  CN_VIEWS,
} from '@/lib/stacks';

const execAsync = promisify(exec);

export async function GET(_req: NextRequest) {
  const summary: any = {
    devnet: { ok: false, info: null as any, error: null as any },
    views: { ok: false, output: null as any, error: null as any },
    modules: {} as Record<string, { ok: boolean; output?: string | null; error?: string | null }>,
  };

  // 1) Comprobar API devnet
  try {
    const res = await fetch('http://localhost:3999/v2/info', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const info = await res.json();
    summary.devnet.ok = true;
    summary.devnet.info = info;
  } catch (e: any) {
    summary.devnet.ok = false;
    summary.devnet.error = e?.message || String(e);
  }

  // 2) Probar lectura via clarinet console: (contract-call? .ff-views liga-detalle u0)
  const tempFile = `/tmp/clarinet_health_${Date.now()}.clar`;
  const commandBody = `(contract-call? .ff-views liga-detalle u0)`;
  const clarinetCommand = `clarinet console < ${tempFile}`;
  try {
    writeFileSync(tempFile, commandBody);
    const { stdout, stderr } = await execAsync(clarinetCommand, {
      cwd: process.cwd(),
      timeout: 15000,
    });
    const out = stdout || stderr;
    summary.views.ok = true;
    summary.views.output = out;
  } catch (e: any) {
    summary.views.ok = false;
    summary.views.error = e?.message || String(e);
  } finally {
    try { unlinkSync(tempFile); } catch {}
  }

  // 3) Chequeos de módulos cargados en devnet
  // Usamos llamadas read-only o contract-call mínimas y seguras
  const principal = "'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"; // devnet default
  const checks: Array<{ name: string; body: string }> = [
    { name: CN_LEAGUE, body: `(contract-call? .${CN_LEAGUE} get-liga u0)` },
    { name: CN_CLUB, body: `(contract-call? .${CN_CLUB} get-club u0)` },
    { name: CN_PLAYER, body: `(contract-call? .${CN_PLAYER} get-jugador ${principal})` },
    { name: CN_GAME, body: `(contract-call? .${CN_GAME} get-juego u0)` },
    { name: CN_LINEUP, body: `(contract-call? .${CN_LINEUP} get-alineacion u0 ${principal})` },
    { name: CN_EVENT, body: `(contract-call? .${CN_EVENT} get-evento u0 u1)` },
    { name: CN_ROLES, body: `(contract-call? .${CN_ROLES} tiene-rol ${principal} u1)` },
    { name: CN_ATTEST, body: `(contract-call? .${CN_ATTEST} attest-resumen \"juego\" u0)` },
    { name: CN_VIEWS, body: `(contract-call? .${CN_VIEWS} liga-detalle u0)` },
  ];

  for (const c of checks) {
    const f = `/tmp/clarinet_health_${c.name}_${Date.now()}.clar`;
    const cmd = `clarinet console < ${f}`;
    try {
      writeFileSync(f, c.body);
      const { stdout, stderr } = await execAsync(cmd, { cwd: process.cwd(), timeout: 15000 });
      summary.modules[c.name] = { ok: true, output: (stdout || stderr) };
    } catch (e: any) {
      summary.modules[c.name] = { ok: false, error: e?.message || String(e) };
    } finally {
      try { unlinkSync(f); } catch {}
    }
  }

  return NextResponse.json(summary);
}


