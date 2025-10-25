"use client";

import { openContractCall } from "@stacks/connect";
import {
  stringUtf8CV, uintCV, noneCV, someCV, standardPrincipalCV, boolCV
} from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME, APP_URL } from "@/lib/stacks";
import { userSession } from "./Connect";
import { useState } from "react";

async function call(functionName: string, functionArgs: any[]) {
  return openContractCall({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName,
    functionArgs,
    network,
    appDetails: { name: APP_NAME, icon: "" },
    onFinish: () => {},
    onCancel: () => {},
  });
}

export default function FormsBasics() {
  const [status, setStatus] = useState<string>("");

  const onCreateLeague = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await call("crear-liga", [
      stringUtf8CV(String(fd.get("nombre"))),
      stringUtf8CV(String(fd.get("ubicacion"))),
      stringUtf8CV(String(fd.get("categoria"))),
    ]);
    setStatus("Liga enviada.");
  };

  const onCreateClub = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await call("crear-club", [
      stringUtf8CV(String(fd.get("nombre"))),
      uintCV(Number(fd.get("leagueId"))),
      boolCV(Boolean(fd.get("gkFijo"))),
    ]);
    setStatus("Club enviado.");
  };

  const onRegisterPlayer = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const isMinor = String(fd.get("isMinor")) === "on";
    const consent = String(fd.get("consent")).trim();
    await call("registrar-jugador-ff", [
      stringUtf8CV(String(fd.get("nombre"))),
      stringUtf8CV(String(fd.get("apodo"))),
      stringUtf8CV(String(fd.get("pos1"))),
      stringUtf8CV(String(fd.get("pos2") || "")),
      stringUtf8CV(String(fd.get("pos3") || "")),
      boolCV(isMinor),
      consent ? someCV(standardPrincipalCV(consent)) : noneCV(),
      stringUtf8CV(String(fd.get("visibility")) || "public"),
    ]);
    setStatus("Jugador registrado.");
  };

  const onJoinClub = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await call("jugador-unir-a-club", [uintCV(Number(fd.get("clubId")))]);
    setStatus("Jugador unido al club.");
  };

  const onAssignRole = async (e:any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await call("asignar-rol", [
      standardPrincipalCV(String(fd.get("who"))),
      uintCV(Number(fd.get("role"))),
      boolCV(String(fd.get("enabled")) === "on"),
    ]);
    setStatus("Rol actualizado.");
  };

  return (
    <section className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
      <form className="form" onSubmit={onCreateLeague}>
        <h3>Crear Liga</h3>
        <label>Nombre<input name="nombre" required /></label>
        <label>Ubicación<input name="ubicacion" required /></label>
        <label>Categoría<input name="categoria" placeholder="barrial/federada..." required /></label>
        <button className="btn" type="submit">Crear Liga</button>
      </form>

      <form className="form" onSubmit={onCreateClub}>
        <h3>Crear Club</h3>
        <label>Nombre<input name="nombre" required /></label>
        <label>ID Liga<input name="leagueId" type="number" required /></label>
        <label><input type="checkbox" name="gkFijo" /> GK fijo requerido</label>
        <button className="btn" type="submit">Crear Club</button>
      </form>

      <form className="form" onSubmit={onRegisterPlayer}>
        <h3>Registrar Jugador</h3>
        <label>Nombre<input name="nombre" required /></label>
        <label>Apodo<input name="apodo" required /></label>
        <div className="row">
          <label>Pos1<input name="pos1" placeholder="GK/CB/CM/ST..." required /></label>
          <label>Pos2<input name="pos2" placeholder="opcional" /></label>
          <label>Pos3<input name="pos3" placeholder="opcional" /></label>
        </div>
        <div className="row">
          <label><input type="checkbox" name="isMinor" /> Menor de edad</label>
          <label>Guardian (principal)<input name="consent" placeholder="STX..." /></label>
          <label>Visibilidad
            <select name="visibility" defaultValue="public">
              <option value="public">public</option>
              <option value="restricted">restricted</option>
            </select>
          </label>
        </div>
        <button className="btn" type="submit">Registrar</button>
      </form>

      <form className="form" onSubmit={onJoinClub}>
        <h3>Unirse a Club</h3>
        <label>ID Club<input name="clubId" type="number" required /></label>
        <button className="btn" type="submit">Unirme</button>
      </form>

      <form className="form" onSubmit={onAssignRole}>
        <h3>Asignar Rol (owner)</h3>
        <label>Principal (STX...)<input name="who" required /></label>
        <label>Rol
          <select name="role" defaultValue="1">
            <option value="1">ROLE_JUGADOR (1)</option>
            <option value="2">ROLE_DT (2)</option>
            <option value="3">ROLE_REP (3)</option>
            <option value="4">ROLE_LIGA (4)</option>
          </select>
        </label>
        <label><input type="checkbox" name="enabled" defaultChecked /> enabled</label>
        <button className="btn" type="submit">Asignar</button>
      </form>

      <div className="form">
        <h3>Estado</h3>
        <p>{status}</p>
      </div>
    </section>
  );
}
