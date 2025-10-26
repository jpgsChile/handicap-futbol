import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(_req: NextRequest) {
  try {
    // Intentar iniciar devnet en background y devolver PID/log
    const { stdout } = await execAsync(`nohup clarinet devnet start > /tmp/clarinet_devnet.log 2>&1 & echo $!`, {
      cwd: process.cwd(),
      timeout: 10000,
    });
    const pid = stdout?.trim();

    // Pequeña espera y ping
    try {
      await new Promise(res => setTimeout(res, 1500));
      const ping = await fetch('http://localhost:3999/v2/info', { cache: 'no-store' });
      const ok = ping.ok;
      return NextResponse.json({ success: true, pid, api: ok ? 'up' : 'starting' });
    } catch {
      return NextResponse.json({ success: true, pid, api: 'starting' });
    }
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || String(e) });
  }
}


