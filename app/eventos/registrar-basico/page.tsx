"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { uintCV, stringUtf8CV, someCV, standardPrincipalCV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function RegistrarEventoBasico() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: "registrar-evento",
        functionArgs: [
          uintCV(Number(fd.get("gameId"))),
          uintCV(Number(fd.get("clubId"))),
          fd.get("wallet") ? someCV(standardPrincipalCV(String(fd.get("wallet")))) : someCV(standardPrincipalCV("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM")),
          stringUtf8CV(String(fd.get("tipo"))),
          uintCV(Number(fd.get("minuto"))),
          stringUtf8CV(String(fd.get("meta")))
        ],
        network,
        appDetails: { name: APP_NAME, icon: "" },
        onFinish: () => setStatus("✅ Evento registrado exitosamente"),
        onCancel: () => setStatus("❌ Operación cancelada"),
      });
    } catch (error) {
      setStatus("❌ Error: " + error);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>📝 Registrar Evento Básico</h1>
      <p>Registra un evento básico durante el partido.</p>
      
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
          Wallet del Jugador (opcional)
          <input name="wallet" placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" />
        </label>
        
        <label>
          Tipo de Evento *
          <select name="tipo" required>
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
          <input name="minuto" type="number" required placeholder="15" />
        </label>
        
        <label>
          Metadata Adicional
          <textarea name="meta" placeholder="Descripción del evento..." maxLength={64} />
        </label>
        
        <button type="submit" className="btn">
          Registrar Evento
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
