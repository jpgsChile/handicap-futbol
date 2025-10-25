"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV, stringUtf8CV, standardPrincipalCV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function RegistrarEventoYReputacion() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "registrar-evento-y-reputacion",
        functionArgs: [
          uintCV(Number(fd.get("gameId"))),
          uintCV(Number(fd.get("clubId"))),
          standardPrincipalCV(String(fd.get("wallet"))),
          stringUtf8CV(String(fd.get("tipo"))),
          uintCV(Number(fd.get("minuto"))),
          stringUtf8CV(String(fd.get("meta")))
        ],
        network,
        appDetails: { name: APP_NAME, icon: "" },
        onFinish: () => setStatus("✅ Evento registrado y reputación actualizada exitosamente"),
        onCancel: () => setStatus("❌ Operación cancelada"),
      });
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>⭐ Registrar Evento y Actualizar Reputación</h1>
      <p>Registra un evento y actualiza automáticamente la reputación del jugador.</p>
      
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
          Tipo de Evento *
          <select name="tipo" required>
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
          <input name="minuto" type="number" required placeholder="15" />
        </label>
        
        <label>
          Metadata Adicional
          <textarea name="meta" placeholder="Descripción del evento..." maxLength={64} />
        </label>
        
        <button type="submit" className="btn">
          Registrar Evento y Reputación
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
