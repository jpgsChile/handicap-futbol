"use client";

import { useState } from "react";
import {
  APP_NAME,
  APP_URL,
  CONTRACT_ADDRESS,
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
  const [health] = useState<any>(null);

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

  // Devnet removido: solo chequeos de Testnet via ff-views

  return (
    <div style={{maxWidth: 900, margin: "0 auto", padding: 24}}>
      <h1>🧪 Diagnóstico de Configuración</h1>
      <p>Verifica variables críticas antes de firmar en Testnet.</p>

      <div className="form" style={{marginBottom: 16}}>
        <h3>App</h3>
        <ul style={{margin:0, paddingLeft: 20}}>
          <li><strong>APP_NAME</strong>: {APP_NAME}</li>
          <li><strong>APP_URL</strong>: {APP_URL}</li>
          {/* isDevMode removido */}
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
        {/* Devnet removido */}
        {status && (
          <div style={{marginTop: 12}}>{status}</div>
        )}
        {output && (
          <pre style={{whiteSpace: "pre-wrap", fontSize: 12, marginTop: 12}}>{output}</pre>
        )}
        {/* health devnet removido */}
      </div>
    </div>
  );
}


