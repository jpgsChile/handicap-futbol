"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { stringUtf8CV, uintCV, boolCV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function CrearClub() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "crear-club",
      functionArgs: [
        stringUtf8CV(String(fd.get("nombre"))),
        uintCV(Number(fd.get("leagueId"))),
        boolCV(fd.get("gkFijo") === "true"),
      ],
      network,
      appDetails: { name: APP_NAME, icon: "" },
      onFinish: () => setStatus("Club creado exitosamente."),
      onCancel: () => setStatus("Acción cancelada."),
    });
  };

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2>Crear Nuevo Club</h2>
      <p>
        Crea un nuevo club de fútbol en una liga existente. 
        Se asignará un ID único automáticamente.
      </p>

      <form onSubmit={onSubmit} className="form">
        <label>Nombre del Club<input name="nombre" required placeholder="Club Deportivo Ejemplo" /></label>
        <label>ID de la Liga<input name="leagueId" type="number" required placeholder="1" /></label>
        
        <label>¿Tiene portero fijo?
          <select name="gkFijo" required>
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </label>
        
        <button className="btn" type="submit">Crear Club</button>
      </form>

      {status && <p style={{ marginTop: 16, color: "#2563eb" }}>{status}</p>}
    </main>
  );
}
