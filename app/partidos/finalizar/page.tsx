"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";
import { CN_GAME } from "@/lib/stacks";

export default function FinalizarPartido() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>🏁 Finalizar Partido</h1>
      <p>Finaliza un partido en curso.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
          <input id="fnl-gameId" type="number" required placeholder="1" />
        </label>
        <HybridTransaction
          functionName="cerrar-juego"
        contractNameOverride={CN_GAME}
          functionArgs={[
            () => Number((document.getElementById("fnl-gameId") as HTMLInputElement)?.value || 0),
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Finalizar Partido"
          successMessage="Partido finalizado"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
