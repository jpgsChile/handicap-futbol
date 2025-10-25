"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV, stringUtf8CV, boolCV, standardPrincipalCV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function AgregarAlineacion() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "alineacion-agregar",
        functionArgs: [
          uintCV(Number(fd.get("gameId"))),
          uintCV(Number(fd.get("clubId"))),
          standardPrincipalCV(String(fd.get("wallet"))),
          stringUtf8CV(String(fd.get("pos"))),
          boolCV(fd.get("titular") === "true"),
          uintCV(Number(fd.get("minInicio")))
        ],
        network,
        appDetails: { name: APP_NAME, icon: "" },
        onFinish: () => setStatus("✅ Jugador agregado a alineación exitosamente"),
        onCancel: () => setStatus("❌ Operación cancelada"),
      });
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>📋 Agregar Jugador a Alineación</h1>
      <p>Agrega un jugador a la alineación de un partido.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
          <input name="gameId" type="number" required placeholder="1" />
        </label>
        
        <label>
          ID del Club *
          <input name="clubId" type="number" required placeholder="1" />
        </label>
        
        <label>
          Wallet del Jugador *
          <input name="wallet" required placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
        </label>
        
        <label>
          Posición *
          <select name="pos" required>
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
          <select name="titular" required>
            <option value="true">Sí</option>
            <option value="false">No (Suplente)</option>
          </select>
        </label>
        
        <label>
          Minuto de Inicio *
          <input name="minInicio" type="number" required placeholder="0" />
        </label>
        
        <button type="submit" className="btn">
          Agregar a Alineación
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
