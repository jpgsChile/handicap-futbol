"use client";

import { useState } from "react";
import {
  APP_NAME,
  APP_URL,
  CONTRACT_ADDRESS,
  isDevMode,
  CN_LEAGUE,
  CN_CLUB,
  CN_PLAYER,
  CN_GAME,
  CN_LINEUP,
  CN_EVENT,
  CN_ATTEST,
  CN_VIEWS,
} from "@/lib/stacks";
import { roGetLiga } from "@/lib/readOnly";

export default function Diagnostico() {
  const [status, setStatus] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [health, setHealth] = useState<any>(null);

  const probarViews = async () => {
    setStatus("🔄 Probando ff-views.liga-detalle u0...");
    setOutput("");
    try {
      const res = await roGetLiga(0);
      setOutput(JSON.stringify(res, null, 2));
      setStatus("✅ ff-views operativo (respuesta capturada)");
    } catch (e: any) {
      setStatus("❌ Error probando ff-views: " + (e?.message || String(e)));
    }
  };

  const chequearDevnet = async () => {
    setStatus("🔄 Chequeando devnet/ff-views...");
    try {
      const res = await fetch('/api/devnet/health', { cache: 'no-store' });
      const data = await res.json();
      setHealth(data);
      setStatus(data.devnet?.ok ? "✅ Devnet OK" : "❌ Devnet no disponible");
    } catch (e: any) {
      setStatus("❌ Error chequear devnet: " + (e?.message || String(e)));
    }
  };

  const iniciarDevnet = async () => {
    setStatus("🔄 Iniciando devnet...");
    try {
      const res = await fetch('/api/devnet/start', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setStatus(`✅ Devnet iniciado (PID: ${data.pid || '?'}, API: ${data.api})`);
      } else {
        setStatus(`❌ Error al iniciar devnet: ${data.error}`);
      }
    } catch (e: any) {
      setStatus("❌ Error al iniciar devnet: " + (e?.message || String(e)));
    }
  };

  return (
    <div style={{maxWidth: 900, margin: "0 auto", padding: 24}}>
      <h1>🧪 Diagnóstico de Configuración</h1>
      <p>Verifica variables críticas antes de firmar en testnet o ejecutar en dev.</p>

      <div className="form" style={{marginBottom: 16}}>
        <h3>App</h3>
        <ul style={{margin:0, paddingLeft: 20}}>
          <li><strong>APP_NAME</strong>: {APP_NAME}</li>
          <li><strong>APP_URL</strong>: {APP_URL}</li>
          <li><strong>isDevMode</strong>: {String(isDevMode)}</li>
        </ul>
      </div>

      <div className="form" style={{marginBottom: 16}}>
        <h3>Contrato base</h3>
        <ul style={{margin:0, paddingLeft: 20}}>
          <li><strong>CONTRACT_ADDRESS</strong>: {CONTRACT_ADDRESS}</li>
        </ul>
      </div>

      <div className="form" style={{marginBottom: 16}}>
        <h3>Nombres de módulos (CN_*)</h3>
        <ul style={{margin:0, paddingLeft: 20}}>
          <li><strong>CN_LEAGUE</strong>: {CN_LEAGUE}</li>
          <li><strong>CN_CLUB</strong>: {CN_CLUB}</li>
          <li><strong>CN_PLAYER</strong>: {CN_PLAYER}</li>
          <li><strong>CN_GAME</strong>: {CN_GAME}</li>
          <li><strong>CN_LINEUP</strong>: {CN_LINEUP}</li>
          <li><strong>CN_EVENT</strong>: {CN_EVENT}</li>
          <li><strong>CN_ATTEST</strong>: {CN_ATTEST}</li>
          <li><strong>CN_VIEWS</strong>: {CN_VIEWS}</li>
        </ul>
      </div>

      <div className="form" style={{marginBottom: 16}}>
        <h3>Prueba rápida de lecturas</h3>
        <p>Ejecuta un llamado read-only a <code>ff-views.liga-detalle u0</code>.</p>
        <button className="btn" onClick={probarViews}>Probar ff-views</button>
        <button className="btn secondary" onClick={chequearDevnet} style={{marginLeft: 8}}>Chequeo devnet</button>
        <button className="btn secondary" onClick={iniciarDevnet} style={{marginLeft: 8}}>Iniciar devnet</button>
        {status && (
          <div style={{marginTop: 12}}>{status}</div>
        )}
        {output && (
          <pre style={{whiteSpace: "pre-wrap", fontSize: 12, marginTop: 12}}>{output}</pre>
        )}
        {health && (
          <pre style={{whiteSpace: "pre-wrap", fontSize: 12, marginTop: 12}}>{JSON.stringify(health, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}


