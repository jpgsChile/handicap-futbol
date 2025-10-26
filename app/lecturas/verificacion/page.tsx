"use client";

import { useState } from "react";
import { roGetAttestResumen } from "@/lib/readOnly";
import { VERIFY_MIN_SUM, VERIFY_MIN_COUNT } from "@/lib/stacks";

export default function EstadoVerificacion() {
  const [status, setStatus] = useState<string>("");
  const [resumen, setResumen] = useState<any>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("🔄 Consultando...");
    try {
      const entity = String(fd.get("entity"));
      const id = Number(fd.get("id"));
      const r = await roGetAttestResumen(entity, id);
      setResumen(r);
      setStatus("✅ OK");
    } catch (err) {
      setResumen(null);
      setStatus("❌ Error: " + err);
    }
  };

  const badge = (sum: number, count: number) => {
    const score = sum;
    let bg = "#fef3c7", label = "Medio";
    if (score >= VERIFY_MIN_SUM && count >= VERIFY_MIN_COUNT) { bg = "#dcfce7"; label = "Verificado"; }
    else if (score <= Math.max(2, Math.floor(VERIFY_MIN_SUM/5))) { bg = "#fee2e2"; label = "Bajo"; }
    return <span style={{background:bg, padding:"2px 8px", borderRadius:6, fontSize:12}}>{label}</span>;
  };

  return (
    <div style={{maxWidth: 680, margin: "0 auto", padding: 24}}>
      <h1>✅ Estado de Verificación</h1>
      <p>Consulta el resumen de testificaciones (sumatoria de pesos y cantidad).</p>

      <form onSubmit={onSubmit} className="form">
        <label>
          Entidad
          <select name="entity" defaultValue="juego">
            <option value="juego">juego</option>
            <option value="evento">evento</option>
            <option value="perfil">perfil</option>
          </select>
        </label>
        <label>
          ID
          <input name="id" type="number" required />
        </label>
        <button className="btn" type="submit">Consultar</button>
      </form>

      {status && (<div style={{marginTop:12, padding:10, background:"#f0f0f0", borderRadius:8}}>{status}</div>)}

      {resumen && (
        <div style={{marginTop:16, padding:12, background:"#fff", border:"1px solid #eee", borderRadius:8}}>
          <h3 style={{marginTop:0}}>Resumen</h3>
          <p>sum: <strong>{JSON.stringify(resumen.value?.sum ?? resumen.sum ?? 0)}</strong></p>
          <p>count: <strong>{JSON.stringify(resumen.value?.count ?? resumen.count ?? 0)}</strong></p>
          {badge(Number(resumen.value?.sum ?? resumen.sum ?? 0), Number(resumen.value?.count ?? resumen.count ?? 0))}
        </div>
      )}
    </div>
  );
}


