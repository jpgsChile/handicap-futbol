"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { stringUtf8CV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function CrearLiga() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "crear-liga",
      functionArgs: [
        stringUtf8CV(String(fd.get("nombre"))),
        stringUtf8CV(String(fd.get("ubicacion"))),
        stringUtf8CV(String(fd.get("categoria"))),
      ],
      network,
      appDetails: { name: APP_NAME, icon: "" },
      onFinish: () => setStatus("Liga creada exitosamente."),
      onCancel: () => setStatus("Acción cancelada."),
    });
  };

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2>Crear Nueva Liga</h2>
      <p>
        Crea una nueva liga de fútbol en el sistema. 
        Se asignará un ID único automáticamente.
      </p>

      <form onSubmit={onSubmit} className="form">
        <label>Nombre de la Liga<input name="nombre" required placeholder="Liga Municipal de Santiago" /></label>
        <label>Ubicación<input name="ubicacion" required placeholder="Santiago, Chile" /></label>
        
        <label>Categoría
          <select name="categoria" required>
            <option value="">Seleccionar categoría</option>
            <option value="barrial">Barrial</option>
            <option value="federada">Federada</option>
            <option value="escolar">Escolar</option>
            <option value="universitaria">Universitaria</option>
            <option value="profesional">Profesional</option>
          </select>
        </label>
        
        <button className="btn" type="submit">Crear Liga</button>
      </form>

      {status && <p style={{ marginTop: 16, color: "#2563eb" }}>{status}</p>}
    </main>
  );
}
