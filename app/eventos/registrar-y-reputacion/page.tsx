"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";
import { CN_EVENT } from "@/lib/stacks";

export default function RegistrarEventoYReputacion() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>⭐ Registrar Evento y Actualizar Reputación</h1>
      <p>Registra un evento y actualiza automáticamente la reputación del jugador.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
          <input id="evr-gameId" type="number" required placeholder="1" />
        </label>
        
        <label>
          ID del Club *
          <input id="evr-clubId" type="number" required placeholder="1" />
        </label>
        
        <label>
          Wallet del Jugador *
          <input id="evr-wallet" required placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
        </label>
        
        <label>
          Tipo de Evento *
          <select id="evr-tipo" required>
            <option value="">Seleccionar tipo</option>
            <option value="goal">Gol (+5 reputación)</option>
            <option value="assist">Asistencia (+2 reputación)</option>
            <option value="yellow">Tarjeta Amarilla (-1 reputación)</option>
            <option value="red">Tarjeta Roja (-3 reputación)</option>
            <option value="sub">Cambio (0 reputación)</option>
            <option value="injury">Lesión (0 reputación)</option>
            <option value="offside">Fuera de Juego (0 reputación)</option>
          </select>
        </label>
        
        <label>
          Minuto *
          <input id="evr-minuto" type="number" required placeholder="15" />
        </label>
        
        <label>
          Metadata Adicional
          <textarea id="evr-meta" placeholder="Descripción del evento..." maxLength={64} />
        </label>
        <HybridTransaction
          functionName="registrar-evento-ff"
          contractNameOverride={CN_EVENT}
          functionArgs={[
            () => Number((document.getElementById("evr-gameId") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("evr-clubId") as HTMLInputElement)?.value || 0),
            () => ({ cv: 'principal', value: (document.getElementById("evr-wallet") as HTMLInputElement)?.value }),
            () => (document.getElementById("evr-tipo") as HTMLSelectElement)?.value,
            () => Number((document.getElementById("evr-minuto") as HTMLInputElement)?.value || 0),
            () => (document.getElementById("evr-meta") as HTMLTextAreaElement)?.value || "",
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Registrar Evento + Reputación"
          successMessage="Evento registrado"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
