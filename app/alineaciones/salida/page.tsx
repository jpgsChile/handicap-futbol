"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV, standardPrincipalCV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function RegistrarSalida() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "alineacion-salida",
        functionArgs: [
          uintCV(Number(fd.get("gameId"))),
          standardPrincipalCV(String(fd.get("wallet"))),
          uintCV(Number(fd.get("minSalida")))
        ],
        network,
        appDetails: { name: APP_NAME, icon: "" },
        onFinish: () => setStatus("✅ Salida de jugador registrada exitosamente"),
        onCancel: () => setStatus("❌ Operación cancelada"),
      });
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>🚪 Registrar Salida de Jugador</h1>
      <p>Registra la salida de un jugador durante el partido.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
          <input name="gameId" type="number" required placeholder="1" />
        </label>
        
        <label>
          Wallet del Jugador *
          <input name="wallet" required placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
        </label>
        
        <label>
          Minuto de Salida *
          <input name="minSalida" type="number" required placeholder="45" />
        </label>
        
        <button type="submit" className="btn">
          Registrar Salida
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
