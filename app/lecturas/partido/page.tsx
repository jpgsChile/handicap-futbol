"use client";

import { useState } from "react";
import { roGetJuego, roGetLiga, roGetClub } from "@/lib/readOnly";

export default function ObtenerPartido() {
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [ui, setUi] = useState<{ leagueName?: string; localName?: string; visitName?: string; fecha?: string } | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      const id = Number(fd.get("id"));
      const response: any = await roGetJuego(id);
      setResult(`Resultado: ${JSON.stringify(response, null, 2)}`);
      if (response?.success && response?.value?.value) {
        const v = response.value.value;
        const get = (k: string) => (v?.[k]?.value ?? v?.[k]);
        const leagueId = Number(get('league-id') ?? 0);
        const localId = Number(get('club-local') ?? 0);
        const visitId = Number(get('club-visit') ?? 0);
        const fecha = Number(get('fecha') ?? 0);
        let leagueName: string | undefined;
        let localName: string | undefined;
        let visitName: string | undefined;
        try {
          if (leagueId > 0) {
            const liga: any = await roGetLiga(leagueId);
            leagueName = String(liga?.value?.value?.['nombre']?.value ?? liga?.value?.value?.['nombre'] ?? '');
          }
        } catch {}
        try {
          if (localId > 0) {
            const club: any = await roGetClub(localId);
            localName = String(club?.value?.value?.['nombre']?.value ?? club?.value?.value?.['nombre'] ?? '');
          }
        } catch {}
        try {
          if (visitId > 0) {
            const club: any = await roGetClub(visitId);
            visitName = String(club?.value?.value?.['nombre']?.value ?? club?.value?.value?.['nombre'] ?? '');
          }
        } catch {}
        const dateStr = fecha > 0 ? new Date(fecha * 1000).toLocaleString() : '';
        setUi({ leagueName, localName, visitName, fecha: dateStr });
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
      <h1>⚽ Obtener Información de Partido</h1>
      <p>Consulta la información de un partido específico.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
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
          <h3 style={{marginTop:0}}>Información del Partido</h3>
          <div style={{display:'grid', gridTemplateColumns:'180px 1fr', rowGap:8}}>
            <div style={{color:'#6b7280'}}>Nombre de liga</div>
            <div>{ui.leagueName || '-'}</div>
            <div style={{color:'#6b7280'}}>Nombre de local</div>
            <div>{ui.localName || '-'}</div>
            <div style={{color:'#6b7280'}}>Nombre de visita</div>
            <div>{ui.visitName || '-'}</div>
            <div style={{color:'#6b7280'}}>Fecha</div>
            <div>{ui.fecha || '-'}</div>
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
