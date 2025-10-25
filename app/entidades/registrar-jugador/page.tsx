"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { stringUtf8CV, boolCV, someCV, noneCV, standardPrincipalCV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function RegistrarJugador() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "registrar-jugador-ff",
        functionArgs: [
          stringUtf8CV(String(fd.get("nombre"))),
          stringUtf8CV(String(fd.get("apodo"))),
          stringUtf8CV(String(fd.get("pos1"))),
          stringUtf8CV(String(fd.get("pos2"))),
          stringUtf8CV(String(fd.get("pos3"))),
          boolCV(fd.get("isMinor") === "true"),
          fd.get("consent") ? someCV(standardPrincipalCV(String(fd.get("consent")))) : noneCV(),
          stringUtf8CV(String(fd.get("visibility")))
        ],
        network,
        appDetails: { name: APP_NAME, icon: "" },
        onFinish: () => setStatus("✅ Jugador registrado exitosamente"),
        onCancel: () => setStatus("❌ Operación cancelada"),
      });
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>👤 Registrar Jugador</h1>
      <p>Registra un nuevo jugador en el sistema con protección a menores.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Nombre Completo *
          <input name="nombre" required maxLength={64} placeholder="Juan Pérez" />
        </label>
        
        <label>
          Apodo *
          <input name="apodo" required maxLength={64} placeholder="El Toro" />
        </label>
        
        <label>
          Posición Principal *
          <select name="pos1" required>
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
          <select name="pos2">
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
          <select name="pos3">
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
          <select name="isMinor" required>
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </label>
        
        <label>
          Consentimiento del Guardián (si es menor)
          <input name="consent" placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
        </label>
        
        <label>
          Visibilidad *
          <select name="visibility" required>
            <option value="public">Público</option>
            <option value="restricted">Restringido</option>
          </select>
        </label>
        
        <button type="submit" className="btn">
          Registrar Jugador
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
