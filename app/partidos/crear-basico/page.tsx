"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function CrearPartidoBasico() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "crear-juego",
        functionArgs: [
          uintCV(Number(fd.get("leagueId"))),
          uintCV(Number(fd.get("clubLocal"))),
          uintCV(Number(fd.get("clubVisit"))),
          uintCV(Number(fd.get("fecha")))
        ],
        network,
        appDetails: { name: APP_NAME, icon: "" },
        onFinish: () => setStatus("✅ Partido creado exitosamente"),
        onCancel: () => setStatus("❌ Operación cancelada"),
      });
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>⚽ Crear Partido Básico</h1>
      <p>Crea un nuevo partido sin metadata IPFS.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID de la Liga *
          <input name="leagueId" type="number" required placeholder="1" />
        </label>
        
        <label>
          ID del Club Local *
          <input name="clubLocal" type="number" required placeholder="1" />
        </label>
        
        <label>
          ID del Club Visitante *
          <input name="clubVisit" type="number" required placeholder="2" />
        </label>
        
        <label>
          Fecha (Timestamp Unix) *
          <input name="fecha" type="number" required placeholder="1698765432" />
        </label>
        
        <button type="submit" className="btn">
          Crear Partido
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
