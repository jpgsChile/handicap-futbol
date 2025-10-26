"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";

export default function CrearClub() {
  const [status, setStatus] = useState<string>("");

  // Estado controlado para evitar valores undefined por getElementById
  const [nombre, setNombre] = useState<string>("");
  const [leagueId, setLeagueId] = useState<string>("");
  const [gkFijo, setGkFijo] = useState<string>("false");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>⚽ Crear Nuevo Club</h1>
      <p>Crea un nuevo club de fútbol en una liga existente.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Nombre del Club *
          <input 
            required 
            maxLength={64} 
            placeholder="Club Deportivo Ejemplo" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        
        <label>
          ID de la Liga *
          <input 
            type="number" 
            required 
            placeholder="1" 
            value={leagueId}
            onChange={(e) => setLeagueId(e.target.value)}
          />
        </label>
        
        <label>
          ¿Tiene portero fijo?
          <select 
            required 
            value={gkFijo}
            onChange={(e) => setGkFijo(e.target.value)}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </label>
        <HybridTransaction
          functionName="crear-club"
          functionArgs={[
            nombre,
            Number(leagueId),
            gkFijo === 'true',
          ]}
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
