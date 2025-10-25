"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { stringUtf8CV, boolCV, someCV, noneCV, standardPrincipalCV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";

export default function RegistrarJugador() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "registrar-jugador-ff",
      functionArgs: [
        stringUtf8CV(String(fd.get("nombre"))),
        stringUtf8CV(String(fd.get("apodo"))),
        stringUtf8CV(String(fd.get("pos1"))),
        stringUtf8CV(String(fd.get("pos2") || "")),
        stringUtf8CV(String(fd.get("pos3") || "")),
        boolCV(fd.get("isMinor") === "true"),
        fd.get("consent") ? someCV(standardPrincipalCV(String(fd.get("consent")))) : noneCV(),
        stringUtf8CV(String(fd.get("visibility"))),
      ],
      network,
      appDetails: { name: APP_NAME, icon: "" },
      onFinish: () => setStatus("Jugador registrado exitosamente."),
      onCancel: () => setStatus("Acción cancelada."),
    });
  };

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2>Registrar Jugador</h2>
      <p>
        Registra un nuevo jugador en el sistema con protección a menores. 
        Se asignará automáticamente el rol de JUGADOR.
      </p>

      <form onSubmit={onSubmit} className="form">
        <label>Nombre Completo<input name="nombre" required placeholder="Juan Pérez" /></label>
        <label>Apodo<input name="apodo" required placeholder="El Toro" /></label>
        
        <div className="row">
          <label>Posición Principal
            <select name="pos1" required>
              <option value="">Seleccionar</option>
              <option value="GK">GK - Portero</option>
              <option value="CB">CB - Defensa Central</option>
              <option value="LB">LB - Lateral Izquierdo</option>
              <option value="RB">RB - Lateral Derecho</option>
              <option value="CM">CM - Mediocampista</option>
              <option value="LM">LM - Medio Izquierdo</option>
              <option value="RM">RM - Medio Derecho</option>
              <option value="ST">ST - Delantero</option>
              <option value="LW">LW - Extremo Izquierdo</option>
              <option value="RW">RW - Extremo Derecho</option>
            </select>
          </label>
          <label>Posición Secundaria
            <select name="pos2">
              <option value="">Ninguna</option>
              <option value="GK">GK - Portero</option>
              <option value="CB">CB - Defensa Central</option>
              <option value="LB">LB - Lateral Izquierdo</option>
              <option value="RB">RB - Lateral Derecho</option>
              <option value="CM">CM - Mediocampista</option>
              <option value="LM">LM - Medio Izquierdo</option>
              <option value="RM">RM - Medio Derecho</option>
              <option value="ST">ST - Delantero</option>
              <option value="LW">LW - Extremo Izquierdo</option>
              <option value="RW">RW - Extremo Derecho</option>
            </select>
          </label>
        </div>

        <label>Posición Terciaria
          <select name="pos3">
            <option value="">Ninguna</option>
            <option value="GK">GK - Portero</option>
            <option value="CB">CB - Defensa Central</option>
            <option value="LB">LB - Lateral Izquierdo</option>
            <option value="RB">RB - Lateral Derecho</option>
            <option value="CM">CM - Mediocampista</option>
            <option value="LM">LM - Medio Izquierdo</option>
            <option value="RM">RM - Medio Derecho</option>
            <option value="ST">ST - Delantero</option>
            <option value="LW">LW - Extremo Izquierdo</option>
            <option value="RW">RW - Extremo Derecho</option>
          </select>
        </label>

        <div className="row">
          <label>¿Es menor de edad?
            <select name="isMinor" required>
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </label>
          <label>Visibilidad
            <select name="visibility" required>
              <option value="public">Público</option>
              <option value="restricted">Restringido</option>
            </select>
          </label>
        </div>

        <label>Consentimiento del Guardián (si es menor)<input name="consent" placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" /></label>
        
        <button className="btn" type="submit">Registrar Jugador</button>
      </form>

      {status && <p style={{ marginTop: 16, color: "#2563eb" }}>{status}</p>}
    </main>
  );
}
