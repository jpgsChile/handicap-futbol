"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV, boolCV, standardPrincipalCV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function AsignarRol() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "asignar-rol",
        functionArgs: [
          standardPrincipalCV(String(fd.get("who"))),
          uintCV(Number(fd.get("role"))),
          boolCV(fd.get("enabled") === "true")
        ],
        network,
        appDetails: { name: APP_NAME, icon: "" },
        onFinish: () => setStatus("✅ Rol asignado exitosamente"),
        onCancel: () => setStatus("❌ Operación cancelada"),
      });
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>🔐 Asignar Rol a Usuario</h1>
      <p>Asigna un rol específico a un usuario del sistema.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Wallet del Usuario *
          <input name="who" required placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
        </label>
        
        <label>
          Rol *
          <select name="role" required>
            <option value="">Seleccionar rol</option>
            <option value="1">JUGADOR (1)</option>
            <option value="2">DT - Director Técnico (2)</option>
            <option value="3">REP - Representante (3)</option>
            <option value="4">LIGA (4)</option>
          </select>
        </label>
        
        <label>
          Estado del Rol
          <select name="enabled" required>
            <option value="true">Habilitado</option>
            <option value="false">Deshabilitado</option>
          </select>
        </label>
        
        <button type="submit" className="btn">
          Asignar Rol
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
