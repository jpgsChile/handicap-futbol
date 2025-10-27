"use client";

import { useState } from "react";
import { roGetClub, roGetLiga } from "@/lib/readOnly";

export default function ObtenerClub() {
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [ui, setUi] = useState<{ nombre?: string; leagueId?: number; gk?: boolean; leagueName?: string } | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      const id = Number(fd.get("id"));
      const response: any = await roGetClub(id);
      setResult(`Resultado: ${JSON.stringify(response, null, 2)}`);
      if (response?.success && response?.value?.value) {
        const v = response.value.value;
        const get = (k: string) => (v?.[k]?.value ?? v?.[k]);
        const leagueId = Number(get('league-id') ?? 0);
        let leagueName: string | undefined;
        if (leagueId > 0) {
          try {
            const liga: any = await roGetLiga(leagueId);
            const lv = liga?.value?.value;
            leagueName = String(lv?.['nombre']?.value ?? lv?.['nombre'] ?? '');
          } catch {}
        }
        setUi({
          nombre: String(get('nombre') ?? ''),
          leagueId,
          gk: Boolean(get('gk-fijo')),
          leagueName,
        });
      } else {
        setUi(null);
      }
      setStatus("✅ Información obtenida exitosamente");
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>⚽ Obtener Información de Club</h1>
      <p>Consulta la información de un club específico.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Club *
          <input name="id" type="number" required placeholder="1" />
        </label>
        
        <button type="submit" className="btn">
          Obtener Información
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
      
      {ui && (
        <div style={{marginTop: 16, padding: 16, backgroundColor: "#f9fafb", borderRadius: 8, border: '1px solid #e5e7eb'}}>
          <h3 style={{marginTop:0}}>Información del Club</h3>
          <div style={{display:'grid', gridTemplateColumns:'180px 1fr', rowGap:8}}>
            <div style={{color:'#6b7280'}}>Nombre de club</div>
            <div>{ui.nombre || '-'}</div>
            <div style={{color:'#6b7280'}}>Nombre de liga</div>
            <div>{ui.leagueName || `(ID ${ui.leagueId ?? '-'})`}</div>
            <div style={{color:'#6b7280'}}>Portero fijo</div>
            <div>{ui.gk ? 'Sí' : 'No'}</div>
          </div>
        </div>
      )}
      {result && (
        <details style={{marginTop:12}}>
          <summary style={{cursor:'pointer'}}>Ver respuesta completa</summary>
          <pre style={{whiteSpace: 'pre-wrap', fontSize: 12}}>{result}</pre>
        </details>
      )}
    </div>
  );
}
