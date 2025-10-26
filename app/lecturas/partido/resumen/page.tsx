"use client";

import { useState } from "react";
import { roGetJuego, roGetEventoContador } from "@/lib/readOnly";

export default function ResumenPartido() {
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const tipos = ["goal", "assist", "yellow", "red", "sub", "injury", "offside"];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const id = Number(fd.get("id"));
    setStatus("🔄 Consultando...");
    try {
      const juego = await roGetJuego(id);
      const counters: Record<string, string> = {};
      for (const t of tipos) {
        const c = await roGetEventoContador(id, t);
        counters[t] = JSON.stringify(c);
      }
      setResult({ juego, counters });
      setStatus("✅ Resumen obtenido");
    } catch (err) {
      setStatus("❌ Error: " + err);
      setResult(null);
    }
  };

  return (
    <div style={{maxWidth: 720, margin: "0 auto", padding: 24}}>
      <h1>📊 Resumen de Partido</h1>
      <p>Consulta datos del partido y contadores de eventos por tipo.</p>

      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
          <input name="id" type="number" required placeholder="1" />
        </label>
        <button className="btn" type="submit">Obtener Resumen</button>
      </form>

      {status && (<div style={{marginTop: 16, padding: 12, background: "#f0f0f0", borderRadius: 8}}>{status}</div>)}

      {result && (
        <div style={{marginTop: 16, padding: 12, background: "#e8f5e8", borderRadius: 8}}>
          <h3>Juego</h3>
          <pre style={{whiteSpace: "pre-wrap", fontSize: 12}}>{JSON.stringify(result.juego, null, 2)}</pre>
          <h3>Contadores</h3>
          <ul>
            {tipos.map(t => (
              <li key={t}><strong>{t}</strong>: <code>{result.counters[t]}</code></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}



