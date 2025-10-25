"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function FinalizarPartido() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "cerrar-juego",
        functionArgs: [
          uintCV(Number(fd.get("gameId")))
        ],
        network,
        appDetails: { name: APP_NAME, icon: "" },
        onFinish: () => setStatus("✅ Partido finalizado exitosamente"),
        onCancel: () => setStatus("❌ Operación cancelada"),
      });
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>🏁 Finalizar Partido</h1>
      <p>Finaliza un partido en curso.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
          <input name="gameId" type="number" required placeholder="1" />
        </label>
        
        <button type="submit" className="btn">
          Finalizar Partido
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
