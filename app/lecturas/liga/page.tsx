"use client";

import { useState } from "react";
import { roGetLiga } from "@/lib/readOnly";

export default function ObtenerLiga() {
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [ui, setUi] = useState<{ nombre?: string; ubicacion?: string; categoria?: string } | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      const response: any = await roGetLiga(Number(fd.get("id")));
      setResult(`Resultado: ${JSON.stringify(response, null, 2)}`);
      if (response?.success && response?.value?.value) {
        const v = response.value.value;
        const get = (k: string) => (v?.[k]?.value ?? v?.[k]);
        setUi({
          nombre: String(get('nombre') ?? ''),
          ubicacion: String(get('ubicacion') ?? ''),
          categoria: String(get('categoria') ?? ''),
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
      <h1>🏆 Obtener Información de Liga</h1>
      <p>Consulta la información de una liga específica.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID de la Liga *
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
          <h3 style={{marginTop:0}}>Información de la Liga</h3>
          <div style={{display:'grid', gridTemplateColumns:'160px 1fr', rowGap:8}}>
            <div style={{color:'#6b7280'}}>Nombre de Liga</div>
            <div>{ui.nombre || '-'}</div>
            <div style={{color:'#6b7280'}}>Ubicación</div>
            <div>{ui.ubicacion || '-'}</div>
            <div style={{color:'#6b7280'}}>Categoría</div>
            <div>{ui.categoria || '-'}</div>
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
