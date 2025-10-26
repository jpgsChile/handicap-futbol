"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";
import { CN_PLAYER } from "@/lib/stacks";

export default function UnirJugador() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>🤝 Unir Jugador a un Club</h1>
      <p>Une un jugador registrado a un club específico.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Club *
          <input id="join-clubId" type="number" required placeholder="1" />
        </label>
        <HybridTransaction
          functionName="jugador-unir-a-club"
          contractNameOverride={CN_PLAYER}
          functionArgs={[
            () => Number((document.getElementById("join-clubId") as HTMLInputElement)?.value || 0),
          ]}
          buttonText="Unir al Club"
          successMessage="Jugador unido"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
