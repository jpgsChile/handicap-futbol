"use client";

import { useState } from "react";
import { roGetJugador } from "@/lib/readOnly";

export default function ObtenerJugador() {
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      const response = await roGetJugador(String(fd.get("wallet")));
      setResult(`Resultado: ${JSON.stringify(response, null, 2)}`);
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
      
      {result && <div style={{marginTop: 16, padding: 12, backgroundColor: "#e8f5e8", borderRadius: 8}}>
        <strong>Información del Jugador:</strong><br />
        <pre style={{whiteSpace: "pre-wrap", fontSize: "12px"}}>{result}</pre>
      </div>}
    </div>
  );
}
