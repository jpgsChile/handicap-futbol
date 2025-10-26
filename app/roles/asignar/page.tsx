"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";
import { CN_ROLES } from "@/lib/stacks";

export default function AsignarRol() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>🔐 Asignar Rol a Usuario</h1>
      <p>Asigna un rol específico a un usuario del sistema.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Wallet del Usuario *
          <input id="role-who" required placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
        </label>
        
        <label>
          Rol *
          <select id="role-role" required>
            <option value="">Seleccionar rol</option>
            <option value="1">JUGADOR (1)</option>
            <option value="2">DT - Director Técnico (2)</option>
            <option value="3">REP - Representante (3)</option>
            <option value="4">LIGA (4)</option>
          </select>
        </label>
        
        <label>
          Estado del Rol
          <select id="role-enabled" required>
            <option value="true">Habilitado</option>
            <option value="false">Deshabilitado</option>
          </select>
        </label>
        <HybridTransaction
          functionName="asignar-rol"
          contractNameOverride={CN_ROLES}
          functionArgs={[
            () => ({ cv: 'principal', value: (document.getElementById("role-who") as HTMLInputElement)?.value }),
            () => Number((document.getElementById("role-role") as HTMLSelectElement)?.value || 0),
            () => ((document.getElementById("role-enabled") as HTMLSelectElement)?.value === 'true'),
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Asignar Rol"
          successMessage="Rol asignado"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
