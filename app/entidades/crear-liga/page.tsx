"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { stringUtf8CV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function CrearLiga() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "crear-liga",
        functionArgs: [
          stringUtf8CV(String(fd.get("nombre"))),
          stringUtf8CV(String(fd.get("ubicacion"))),
          stringUtf8CV(String(fd.get("categoria")))
        ],
        network,
        appDetails: { name: APP_NAME, icon: "" },
        onFinish: () => setStatus("✅ Liga creada exitosamente"),
        onCancel: () => setStatus("❌ Operación cancelada"),
      });
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>🏆 Crear Nueva Liga</h1>
      <p>Crea una nueva liga de fútbol en el sistema.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Nombre de la Liga *
          <input name="nombre" required maxLength={64} placeholder="Liga Municipal de Santiago" />
        </label>
        
        <label>
          Ubicación *
          <input name="ubicacion" required maxLength={64} placeholder="Santiago, Chile" />
        </label>
        
        <label>
          Categoría *
          <select name="categoria" required>
            <option value="">Seleccionar categoría</option>
            <option value="barrial">Barrial</option>
            <option value="federada">Federada</option>
            <option value="escolar">Escolar</option>
            <option value="universitaria">Universitaria</option>
            <option value="profesional">Profesional</option>
          </select>
        </label>
        
        <button type="submit" className="btn">
          Crear Liga
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
