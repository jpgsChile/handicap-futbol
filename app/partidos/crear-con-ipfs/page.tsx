"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";
import { CN_GAME } from "@/lib/stacks";

export default function CrearPartidoConIPFS() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>📁 Crear Partido con Metadata IPFS</h1>
      <p>Crea un nuevo partido con metadata IPFS para evidencia.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID de la Liga *
          <input id="ci-leagueId" type="number" required placeholder="1" />
        </label>
        
        <label>
          ID del Club Local *
          <input id="ci-clubLocal" type="number" required placeholder="1" />
        </label>
        
        <label>
          ID del Club Visitante *
          <input id="ci-clubVisit" type="number" required placeholder="2" />
        </label>
        
        <label>
          Fecha (Timestamp Unix) *
          <input id="ci-fecha" type="number" required placeholder="1698765432" />
        </label>
        
        <label>
          Metadata CID (IPFS) *
          <input id="ci-metadataCid" required placeholder="bafy..." />
        </label>
        <HybridTransaction
          functionName="crear-juego-ff"
          contractNameOverride={CN_GAME}
          functionArgs={[
            () => Number((document.getElementById("ci-leagueId") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("ci-clubLocal") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("ci-clubVisit") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("ci-fecha") as HTMLInputElement)?.value || 0),
            () => (document.getElementById("ci-metadataCid") as HTMLInputElement)?.value,
          ]}
          buttonText="Crear Partido con IPFS"
          successMessage="Partido creado con IPFS"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
