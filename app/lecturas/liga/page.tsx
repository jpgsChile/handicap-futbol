"use client";

import { useState } from "react";
import { roGetLiga } from "@/lib/readOnly";

export default function ObtenerLiga() {
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      const response = await roGetLiga(Number(fd.get("id")));
      setResult(`Resultado: ${JSON.stringify(response, null, 2)}`);
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
      
      {result && <div style={{marginTop: 16, padding: 12, backgroundColor: "#e8f5e8", borderRadius: 8}}>
        <strong>Información de la Liga:</strong><br />
        <pre style={{whiteSpace: "pre-wrap", fontSize: "12px"}}>{result}</pre>
      </div>}
    </div>
  );
}
