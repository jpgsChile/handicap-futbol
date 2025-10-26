"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";
import { CN_GAME } from "@/lib/stacks";

export default function CrearPartidoBasico() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>⚽ Crear Partido Básico</h1>
      <p>Crea un nuevo partido sin metadata IPFS.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID de la Liga *
          <input id="cb-leagueId" type="number" required placeholder="1" />
        </label>
        
        <label>
          ID del Club Local *
          <input id="cb-clubLocal" type="number" required placeholder="1" />
        </label>
        
        <label>
          ID del Club Visitante *
          <input id="cb-clubVisit" type="number" required placeholder="2" />
        </label>
        
        <label>
          Fecha (Timestamp Unix) *
          <input id="cb-fecha" type="number" required placeholder="1698765432" />
        </label>
        <HybridTransaction
          functionName="crear-juego-ff"
          contractNameOverride={CN_GAME}
          functionArgs={[
            () => Number((document.getElementById("cb-leagueId") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("cb-clubLocal") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("cb-clubVisit") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("cb-fecha") as HTMLInputElement)?.value || 0),
            () => "",
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Crear Partido"
          successMessage="Partido creado"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
