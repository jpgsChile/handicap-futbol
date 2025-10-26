"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";
import { CN_EVENT } from "@/lib/stacks";

export default function RegistrarEventoBasico() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>📝 Registrar Evento Básico</h1>
      <p>Registra un evento básico durante el partido.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
          <input id="evt-gameId" type="number" required placeholder="1" />
        </label>
        
        <label>
          ID del Club *
          <input id="evt-clubId" type="number" required placeholder="1" />
        </label>
        
        <label>
          Wallet del Jugador (opcional)
          <input id="evt-wallet" placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
        </label>
        
        <label>
          Tipo de Evento *
          <select id="evt-tipo" required>
            <option value="">Seleccionar tipo</option>
            <option value="goal">Gol</option>
            <option value="assist">Asistencia</option>
            <option value="yellow">Tarjeta Amarilla</option>
            <option value="red">Tarjeta Roja</option>
            <option value="sub">Cambio</option>
            <option value="injury">Lesión</option>
            <option value="offside">Fuera de Juego</option>
          </select>
        </label>
        
        <label>
          Minuto *
          <input id="evt-minuto" type="number" required placeholder="15" />
        </label>
        
        <label>
          Metadata Adicional
          <textarea id="evt-meta" placeholder="Descripción del evento..." maxLength={64} />
        </label>
        <HybridTransaction
          functionName="registrar-evento-ff"
          contractNameOverride={CN_EVENT}
          functionArgs={[
            () => Number((document.getElementById("evt-gameId") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("evt-clubId") as HTMLInputElement)?.value || 0),
            () => ({ cv: 'optional-principal', value: (document.getElementById("evt-wallet") as HTMLInputElement)?.value || "" }),
            () => (document.getElementById("evt-tipo") as HTMLSelectElement)?.value,
            () => Number((document.getElementById("evt-minuto") as HTMLInputElement)?.value || 0),
            () => (document.getElementById("evt-meta") as HTMLTextAreaElement)?.value || "",
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Registrar Evento"
          successMessage="Evento registrado"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
