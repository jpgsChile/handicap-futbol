"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";

export default function CrearClub() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>⚽ Crear Nuevo Club</h1>
      <p>Crea un nuevo club de fútbol en una liga existente.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Nombre del Club *
          <input id="club-nombre" required maxLength={64} placeholder="Club Deportivo Ejemplo" />
        </label>
        
        <label>
          ID de la Liga *
          <input id="club-leagueId" type="number" required placeholder="1" />
        </label>
        
        <label>
          ¿Tiene portero fijo?
          <select id="club-gkFijo" required>
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </label>
        <HybridTransaction
          functionName="crear-club"
          functionArgs={[
            () => (document.getElementById("club-nombre") as HTMLInputElement)?.value,
            () => Number((document.getElementById("club-leagueId") as HTMLInputElement)?.value || 0),
            () => ((document.getElementById("club-gkFijo") as HTMLSelectElement)?.value === 'true'),
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Crear Club"
          successMessage="Club creado"
          contractNameOverride="ff-club"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
