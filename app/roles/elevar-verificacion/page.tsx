"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV, stringUtf8CV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function ElevarVerificacion() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "elevar-verificacion",
        functionArgs: [
          uintCV(Number(fd.get("gameId"))),
          stringUtf8CV(String(fd.get("nivel")))
        ],
        network,
        appDetails: { name: APP_NAME, icon: "" },
        onFinish: () => setStatus("✅ Verificación elevada exitosamente"),
        onCancel: () => setStatus("❌ Operación cancelada"),
      });
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>⬆️ Elevar Nivel de Verificación</h1>
      <p>Eleva el nivel de verificación de un partido.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
          <input name="gameId" type="number" required placeholder="1" />
        </label>
        
        <label>
          Nuevo Nivel de Verificación *
          <select name="nivel" required>
            <option value="">Seleccionar nivel</option>
            <option value="club">Club</option>
            <option value="oficial">Oficial</option>
          </select>
        </label>
        
        <div style={{padding: 12, backgroundColor: "#fff3cd", borderRadius: 8, marginBottom: 16}}>
          <strong>Nota:</strong> Solo los propietarios de clubes pueden elevar a "club" y solo las ligas pueden elevar a "oficial".
        </div>
        
        <button type="submit" className="btn">
          Elevar Verificación
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
