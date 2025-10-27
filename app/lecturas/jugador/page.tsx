"use client";

import { useState } from "react";
import { roGetJugador } from "@/lib/readOnly";

export default function ObtenerJugador() {
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [ui, setUi] = useState<{ nombre?: string; apodo?: string; pos1?: string; pos2?: string; pos3?: string } | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      const response: any = await roGetJugador(String(fd.get("wallet")));
      setResult(`Resultado: ${JSON.stringify(response, null, 2)}`);
      if (response?.success && response?.value?.value) {
        const v = response.value.value;
        const get = (k: string) => (v?.[k]?.value ?? v?.[k]);
        setUi({
          nombre: String(get('nombre') ?? ''),
          apodo: String(get('apodo') ?? ''),
          pos1: String(get('pos1') ?? ''),
          pos2: String(get('pos2') ?? ''),
          pos3: String(get('pos3') ?? ''),
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
      <h1>👤 Obtener Información de Jugador</h1>
      <p>Consulta la información de un jugador específico.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Wallet del Jugador *
          <input name="wallet" required placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
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
          <h3 style={{marginTop:0}}>Información del Jugador</h3>
          <div style={{display:'grid', gridTemplateColumns:'180px 1fr', rowGap:8}}>
            <div style={{color:'#6b7280'}}>Nombre completo</div>
            <div>{ui.nombre || '-'}</div>
            <div style={{color:'#6b7280'}}>Apodo</div>
            <div>{ui.apodo || '-'}</div>
            <div style={{color:'#6b7280'}}>Posición favorita</div>
            <div>{ui.pos1 || '-'}</div>
            <div style={{color:'#6b7280'}}>Posición 2</div>
            <div>{ui.pos2 || '-'}</div>
            <div style={{color:'#6b7280'}}>Posición 3</div>
            <div>{ui.pos3 || '-'}</div>
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
