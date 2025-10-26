"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";

export default function AgregarAlineacion() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>📋 Agregar Jugador a Alineación</h1>
      <p>Agrega un jugador a la alineación de un partido.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
          <input id="line-gameId" type="number" required placeholder="1" />
        </label>
        
        <label>
          ID del Club *
          <input id="line-clubId" type="number" required placeholder="1" />
        </label>
        
        <label>
          Wallet del Jugador *
          <input id="line-wallet" required placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
        </label>
        
        <label>
          Posición *
          <select id="line-pos" required>
            <option value="">Seleccionar posición</option>
            <option value="GK">Portero (GK)</option>
            <option value="CB">Defensa Central (CB)</option>
            <option value="LB">Lateral Izquierdo (LB)</option>
            <option value="RB">Lateral Derecho (RB)</option>
            <option value="CM">Mediocampista (CM)</option>
            <option value="LM">Medio Izquierdo (LM)</option>
            <option value="RM">Medio Derecho (RM)</option>
            <option value="ST">Delantero (ST)</option>
            <option value="LW">Extremo Izquierdo (LW)</option>
            <option value="RW">Extremo Derecho (RW)</option>
          </select>
        </label>
        
        <label>
          ¿Es titular?
          <select id="line-titular" required>
            <option value="true">Sí</option>
            <option value="false">No (Suplente)</option>
          </select>
        </label>
        
        <label>
          Minuto de Inicio *
          <input id="line-minInicio" type="number" required placeholder="0" />
        </label>
        <HybridTransaction
          functionName="alineacion-agregar"
          contractNameOverride="ff-lineup"
          functionArgs={[
            () => Number((document.getElementById("line-gameId") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("line-clubId") as HTMLInputElement)?.value || 0),
            () => ({ cv: 'principal', value: (document.getElementById("line-wallet") as HTMLInputElement)?.value }),
            () => (document.getElementById("line-pos") as HTMLSelectElement)?.value,
            () => ((document.getElementById("line-titular") as HTMLSelectElement)?.value === 'true'),
            () => Number((document.getElementById("line-minInicio") as HTMLInputElement)?.value || 0),
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Agregar a Alineación"
          successMessage="Alineación agregada"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
