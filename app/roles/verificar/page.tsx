"use client";

import { useState } from "react";
import { roTieneRol } from "@/lib/readOnly";

export default function VerificarRol() {
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      const response = await roTieneRol(
        String(fd.get("who")),
        Number(fd.get("role"))
      );
      
      setResult(`Resultado: ${response}`);
      setStatus("✅ Verificación completada");
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>🔍 Verificar si Usuario tiene Rol</h1>
      <p>Verifica si un usuario tiene un rol específico asignado.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Wallet del Usuario *
          <input name="who" required placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
        </label>
        
        <label>
          Rol a Verificar *
          <select name="role" required>
            <option value="">Seleccionar rol</option>
            <option value="1">JUGADOR (1)</option>
            <option value="2">DT - Director Técnico (2)</option>
            <option value="3">REP - Representante (3)</option>
            <option value="4">LIGA (4)</option>
          </select>
        </label>
        
        <button type="submit" className="btn">
          Verificar Rol
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
      
      {result && <div style={{marginTop: 16, padding: 12, backgroundColor: "#e8f5e8", borderRadius: 8}}>
        <strong>Resultado:</strong><br />
        {result}
      </div>}
    </div>
  );
}
