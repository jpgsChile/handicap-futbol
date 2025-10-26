"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";

export default function RegistrarJugador() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>👤 Registrar Jugador</h1>
      <p>Registra un nuevo jugador en el sistema con protección a menores.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Nombre Completo *
          <input id="player-nombre" required maxLength={64} placeholder="Juan Pérez" />
        </label>
        
        <label>
          Apodo *
          <input id="player-apodo" required maxLength={64} placeholder="El Toro" />
        </label>
        
        <label>
          Posición Principal *
          <select id="player-pos1" required>
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
          Posición Secundaria
          <select id="player-pos2">
            <option value="">Ninguna</option>
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
          Posición Terciaria
          <select id="player-pos3">
            <option value="">Ninguna</option>
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
          ¿Es menor de edad?
          <select id="player-isMinor" required>
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </label>
        
        <label>
          Consentimiento del Guardián (si es menor)
          <input id="player-consent" placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
        </label>
        
        <label>
          Visibilidad *
          <select id="player-visibility" required>
            <option value="public">Público</option>
            <option value="restricted">Restringido</option>
          </select>
        </label>
        
        <HybridTransaction
          functionName="registrar-jugador-ff"
          contractNameOverride="ff-player"
          functionArgs={[
            () => (document.getElementById("player-nombre") as HTMLInputElement)?.value,
            () => (document.getElementById("player-apodo") as HTMLInputElement)?.value,
            () => (document.getElementById("player-pos1") as HTMLSelectElement)?.value,
            () => (document.getElementById("player-pos2") as HTMLSelectElement)?.value || "",
            () => (document.getElementById("player-pos3") as HTMLSelectElement)?.value || "",
            () => ((document.getElementById("player-isMinor") as HTMLSelectElement)?.value === 'true'),
            () => {
              const isMinor = (document.getElementById("player-isMinor") as HTMLSelectElement)?.value === 'true';
              const consent = (document.getElementById("player-consent") as HTMLInputElement)?.value || "";
              return isMinor
                ? { cv: 'optional-principal', value: consent }
                : { cv: 'optional-principal', value: null };
            },
            () => (document.getElementById("player-visibility") as HTMLSelectElement)?.value,
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Registrar Jugador"
          successMessage="Jugador registrado"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
