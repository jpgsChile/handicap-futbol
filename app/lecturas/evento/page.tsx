"use client";

import { useState } from "react";
import { roGetEvento } from "@/lib/readOnly";

export default function ObtenerEvento() {
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      const response = await roGetEvento(
        Number(fd.get("gameId")),
        Number(fd.get("index"))
      );
      setResult(`Resultado: ${JSON.stringify(response, null, 2)}`);
      setStatus("✅ Información obtenida exitosamente");
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>📝 Obtener Evento Específico</h1>
      <p>Consulta la información de un evento específico de un partido.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
          <input name="gameId" type="number" required placeholder="1" />
        </label>
        
        <label>
          Índice del Evento *
          <input name="index" type="number" required placeholder="0" />
        </label>
        
        <button type="submit" className="btn">
          Obtener Evento
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
      
      {result && <div style={{marginTop: 16, padding: 12, backgroundColor: "#e8f5e8", borderRadius: 8}}>
        <strong>Información del Evento:</strong><br />
        <pre style={{whiteSpace: "pre-wrap", fontSize: "12px"}}>{result}</pre>
      </div>}
    </div>
  );
}
