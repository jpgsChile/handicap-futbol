"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV, stringUtf8CV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function CrearTestificacion() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "attest",
        functionArgs: [
          stringUtf8CV(String(fd.get("entity"))),
          uintCV(Number(fd.get("id"))),
          uintCV(Number(fd.get("weight"))),
          stringUtf8CV(String(fd.get("comment"))),
          stringUtf8CV(String(fd.get("cid")))
        ],
        network,
        appDetails: { name: APP_NAME, icon: "" },
        onFinish: () => setStatus("✅ Testificación creada exitosamente"),
        onCancel: () => setStatus("❌ Operación cancelada"),
      });
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>📜 Crear Testificación</h1>
      <p>Crea una testificación para una entidad específica.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Entidad *
          <input name="entity" required maxLength={8} placeholder="jugador" />
        </label>
        
        <label>
          ID de la Entidad *
          <input name="id" type="number" required placeholder="1" />
        </label>
        
        <label>
          Peso de la Testificación *
          <input name="weight" type="number" required placeholder="5" />
        </label>
        
        <label>
          Comentario *
          <textarea name="comment" required maxLength={64} placeholder="Testificación positiva por buen comportamiento..." />
        </label>
        
        <label>
          CID de Evidencia (IPFS) *
          <input name="cid" required placeholder="QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx" />
        </label>
        
        <button type="submit" className="btn">
          Crear Testificación
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
