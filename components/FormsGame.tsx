"use client";

import { openContractCall } from "@stacks/connect";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME } from "@/lib/stacks";
import {
  stringUtf8CV, uintCV, standardPrincipalCV, boolCV, noneCV, someCV
} from "@stacks/transactions";
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

export default function FormsGame() {
  const [status, setStatus] = useState<string>("");

  const onCreateMatch = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await call("crear-juego-ff", [
      uintCV(Number(fd.get("leagueId"))),
      uintCV(Number(fd.get("clubLocal"))),
      uintCV(Number(fd.get("clubVisit"))),
      uintCV(Number(fd.get("fecha"))),         // timestamp
      stringUtf8CV(String(fd.get("metadataCid")))
    ]);
    setStatus("Partido creado.");
  };

  const onAddLineup = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await call("alineacion-agregar", [
      uintCV(Number(fd.get("gameId"))),
      uintCV(Number(fd.get("clubId"))),
      standardPrincipalCV(String(fd.get("playerWallet"))),
      stringUtf8CV(String(fd.get("pos")).toUpperCase().slice(0,2)),
      String(fd.get("titular")) === "on" ? boolCV(true) : boolCV(false),
      uintCV(Number(fd.get("minInicio")))
    ]);
    setStatus("Alineación agregada.");
  };

  const onSubOut = async (e:any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await call("alineacion-salida", [
      uintCV(Number(fd.get("gameId"))),
      standardPrincipalCV(String(fd.get("playerWallet"))),
      uintCV(Number(fd.get("minSalida")))
    ]);
    setStatus("Salida registrada.");
  };

  const onEvent = async (e:any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await call("registrar-evento-ff", [
      uintCV(Number(fd.get("gameId"))),
      uintCV(Number(fd.get("clubId"))),
      standardPrincipalCV(String(fd.get("playerWallet"))),
      stringUtf8CV(String(fd.get("tipo"))),     // goal/assist/yellow/red/sub/injury/offside
      uintCV(Number(fd.get("minuto"))),
      stringUtf8CV(String(fd.get("meta") || "")),
      stringUtf8CV(String(fd.get("evidenceCid") || "")),
    ]);
    setStatus("Evento + reputación registrado.");
  };

  const onAttest = async (e:any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await call("attest", [
      stringUtf8CV(String(fd.get("entity"))), // "juego"|"evento"|"perfil"
      uintCV(Number(fd.get("id"))),
      uintCV(Number(fd.get("weight"))),
      stringUtf8CV(String(fd.get("comment") || "")),
      stringUtf8CV(String(fd.get("cid") || "")),
    ]);
    setStatus("Attestation registrada.");
  };

  const onElevate = async (e:any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await call("elevar-verificacion", [
      uintCV(Number(fd.get("gameId"))),
      stringUtf8CV(String(fd.get("nivel"))), // "club"|"oficial"
    ]);
    setStatus("Verificación elevada.");
  };

  const onClose = async (e:any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await call("cerrar-juego", [ uintCV(Number(fd.get("gameId"))) ]);
    setStatus("Partido cerrado.");
  };

  return (
    <section className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
      <form className="form" onSubmit={onCreateMatch}>
        <h3>Crear Partido (con CID)</h3>
        <label>ID Liga<input name="leagueId" type="number" required /></label>
        <label>ID Club Local<input name="clubLocal" type="number" required /></label>
        <label>ID Club Visitante<input name="clubVisit" type="number" required /></label>
        <label>Fecha (timestamp)<input name="fecha" type="number" required /></label>
        <label>Metadata CID (IPFS)<input name="metadataCid" placeholder="bafy..." /></label>
        <button className="btn" type="submit">Crear Partido</button>
      </form>

      <form className="form" onSubmit={onAddLineup}>
        <h3>Añadir a Alineación</h3>
        <label>ID Partido<input name="gameId" type="number" required /></label>
        <label>ID Club<input name="clubId" type="number" required /></label>
        <label>Wallet Jugador (STX)<input name="playerWallet" required /></label>
        <div className="row">
          <label>Pos<input name="pos" placeholder="GK/CB/CM/ST" required /></label>
          <label>Min inicio<input name="minInicio" type="number" defaultValue="0" required /></label>
          <label><input type="checkbox" name="titular" defaultChecked /> Titular</label>
        </div>
        <button className="btn" type="submit">Agregar</button>
      </form>

      <form className="form" onSubmit={onSubOut}>
        <h3>Registrar Salida</h3>
        <label>ID Partido<input name="gameId" type="number" required /></label>
        <label>Wallet Jugador<input name="playerWallet" required /></label>
        <label>Min salida<input name="minSalida" type="number" required /></label>
        <button className="btn" type="submit">Guardar</button>
      </form>

      <form className="form" onSubmit={onEvent}>
        <h3>Evento + Reputación</h3>
        <label>ID Partido<input name="gameId" type="number" required /></label>
        <label>ID Club<input name="clubId" type="number" required /></label>
        <label>Wallet Jugador<input name="playerWallet" required /></label>
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
          <label>Minuto<input name="minuto" type="number" required /></label>
          <label>Meta<input name="meta" placeholder="penal/ST/etc." /></label>
        </div>
        <label>Evidencia CID (IPFS)<input name="evidenceCid" placeholder="bafy..." /></label>
        <button className="btn" type="submit">Registrar</button>
      </form>

      <form className="form" onSubmit={onAttest}>
        <h3>Attestation</h3>
        <label>Entidad
          <select name="entity" defaultValue="juego">
            <option value="juego">juego</option>
            <option value="evento">evento</option>
            <option value="perfil">perfil</option>
          </select>
        </label>
        <label>ID entidad<input name="id" type="number" required /></label>
        <label>Peso<input name="weight" type="number" defaultValue="1" required /></label>
        <label>Comentario<input name="comment" /></label>
        <label>CID (opcional)<input name="cid" placeholder="bafy..." /></label>
        <button className="btn" type="submit">Atestar</button>
      </form>

      <form className="form" onSubmit={onElevate}>
        <h3>Elevar Verificación</h3>
        <label>ID Partido<input name="gameId" type="number" required /></label>
        <label>Nivel
          <select name="nivel" defaultValue="club">
            <option value="club">club</option>
            <option value="oficial">oficial</option>
          </select>
        </label>
        <button className="btn" type="submit">Elevar</button>
      </form>

      <form className="form" onSubmit={onClose}>
        <h3>Cerrar Partido</h3>
        <label>ID Partido<input name="gameId" type="number" required /></label>
        <button className="btn" type="submit">Cerrar</button>
      </form>

      <div className="form">
        <h3>Estado</h3>
        <p>{status}</p>
      </div>
    </section>
  );
}
