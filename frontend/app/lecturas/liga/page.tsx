"use client";

import { useState } from "react";
import { roGetLiga } from "@/lib/readOnly";

export default function ObtenerLiga() {
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      const response = await roGetLiga(Number(fd.get("id")));
      setResult(JSON.stringify(response, null, 2));
      setStatus("Información obtenida exitosamente.");
    } catch (error) {
      setStatus("Error: " + error);
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2>Obtener Información de Liga</h2>
      <p>
        Consulta la información de una liga específica usando su ID. 
        Esta es una función de solo lectura.
      </p>

      <form onSubmit={onSubmit} className="form">
        <label>ID de la Liga<input name="id" type="number" required placeholder="1" /></label>
        <button className="btn" type="submit">Obtener Información</button>
      </form>

      {status && <p style={{ marginTop: 16, color: "#2563eb" }}>{status}</p>}
      
      {result && (
        <div style={{ marginTop: 16, padding: 12, backgroundColor: "#f0f9ff", borderRadius: 8 }}>
          <h3>Resultado:</h3>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px", overflow: "auto" }}>
            {result}
          </pre>
        </div>
      )}
    </main>
  );
}
