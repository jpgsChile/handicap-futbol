"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";

export default function RegistrarSalida() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>🚪 Registrar Salida de Jugador</h1>
      <p>Registra la salida de un jugador durante el partido.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
          <input id="out-gameId" type="number" required placeholder="1" />
        </label>
        
        <label>
          Wallet del Jugador *
          <input id="out-wallet" required placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
        </label>
        
        <label>
          Minuto de Salida *
          <input id="out-minSalida" type="number" required placeholder="45" />
        </label>
        <HybridTransaction
          functionName="alineacion-salida"
          contractNameOverride="ff-lineup"
          functionArgs={[
            () => Number((document.getElementById("out-gameId") as HTMLInputElement)?.value || 0),
            () => ({ cv: 'principal', value: (document.getElementById("out-wallet") as HTMLInputElement)?.value }),
            () => Number((document.getElementById("out-minSalida") as HTMLInputElement)?.value || 0),
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Registrar Salida"
          successMessage="Salida registrada"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
