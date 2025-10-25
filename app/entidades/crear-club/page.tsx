"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { stringUtf8CV, uintCV, boolCV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function CrearClub() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "crear-club",
        functionArgs: [
          stringUtf8CV(String(fd.get("nombre"))),
          uintCV(Number(fd.get("leagueId"))),
          boolCV(fd.get("gkFijo") === "true")
        ],
        network,
        appDetails: { name: APP_NAME, icon: "" },
        onFinish: () => setStatus("✅ Club creado exitosamente"),
        onCancel: () => setStatus("❌ Operación cancelada"),
      });
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>⚽ Crear Nuevo Club</h1>
      <p>Crea un nuevo club de fútbol en una liga existente.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Nombre del Club *
          <input name="nombre" required maxLength={64} placeholder="Club Deportivo Ejemplo" />
        </label>
        
        <label>
          ID de la Liga *
          <input name="leagueId" type="number" required placeholder="1" />
        </label>
        
        <label>
          ¿Tiene portero fijo?
          <select name="gkFijo" required>
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </label>
        
        <button type="submit" className="btn">
          Crear Club
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
