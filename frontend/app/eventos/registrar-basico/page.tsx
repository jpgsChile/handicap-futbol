"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import {
  stringUtf8CV,
  uintCV,
  standardPrincipalCV,
  someCV,
} from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function RegistrarEventoBasico() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "registrar-evento",
      functionArgs: [
        uintCV(Number(fd.get("gameId"))),
        uintCV(Number(fd.get("clubId"))),
        someCV(standardPrincipalCV(String(fd.get("playerWallet")))),
        stringUtf8CV(String(fd.get("tipo"))),
        uintCV(Number(fd.get("minuto"))),
        stringUtf8CV(String(fd.get("meta") || "")),
      ],
      network,
      appDetails: { name: APP_NAME, icon: "" },
      onFinish: () => setStatus("Evento básico enviado al contrato."),
      onCancel: () => setStatus("Acción cancelada."),
    });
  };

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2>Registrar Evento Básico</h2>
      <p>
        Usa esta vista para registrar eventos del partido sin evidencia IPFS. 
        Actualiza automáticamente el marcador si el evento es un gol.
      </p>

      <form onSubmit={onSubmit} className="form">
        <label>ID Partido<input name="gameId" type="number" required /></label>
        <label>ID Club<input name="clubId" type="number" required /></label>
        <label>Wallet Jugador<input name="playerWallet" required placeholder="STX..." /></label>

        <div className="row">
          <label>Tipo
            <select name="tipo" defaultValue="goal">
              <option value="goal">goal</option>
              <option value="assist">assist</option>
              <option value="yellow">yellow</option>
              <option value="red">red</option>
              <option value="sub">sub</option>
              <option value="injury">injury</option>
              <option value="offside">offside</option>
            </select>
          </label>
          <label>Minuto<input name="minuto" type="number" defaultValue="0" required /></label>
        </div>

        <label>Meta / descripción<input name="meta" placeholder="penal / cabeza / otro..." /></label>
        <button className="btn" type="submit">Registrar evento</button>
      </form>

      {status && <p style={{ marginTop: 16, color: "#2563eb" }}>{status}</p>}
    </main>
  );
}
