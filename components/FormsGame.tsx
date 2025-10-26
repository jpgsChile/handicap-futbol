"use client";

import HybridTransaction from "./HybridTransaction";
import { CN_GAME, CN_LINEUP, CN_EVENT, CN_ATTEST } from "@/lib/stacks";

export default function FormsGame() {
  return (
    <section className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
      <div className="form">
        <h3>Crear Partido (con CID)</h3>
        <form onSubmit={(e:any)=>{e.preventDefault();}}>
          <label>ID Liga<input id="match-leagueId" type="number" required /></label>
          <label>ID Club Local<input id="match-clubLocal" type="number" required /></label>
          <label>ID Club Visitante<input id="match-clubVisit" type="number" required /></label>
          <label>Fecha (timestamp)<input id="match-fecha" type="number" required /></label>
          <label>Metadata CID (IPFS)<input id="match-metadataCid" placeholder="bafy..." /></label>
        </form>
        <HybridTransaction
          functionName="crear-juego-ff"
          functionArgs={[
            () => Number((document.getElementById("match-leagueId") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("match-clubLocal") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("match-clubVisit") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("match-fecha") as HTMLInputElement)?.value || 0),
            () => (document.getElementById("match-metadataCid") as HTMLInputElement)?.value || "",
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Crear Partido"
          successMessage="Partido creado"
          contractNameOverride={CN_GAME}
        />
      </div>

      <div className="form">
        <h3>Añadir a Alineación</h3>
        <form onSubmit={(e:any)=>{e.preventDefault();}}>
          <label>ID Partido<input id="lineup-gameId" type="number" required /></label>
          <label>ID Club<input id="lineup-clubId" type="number" required /></label>
          <label>Wallet Jugador (STX)<input id="lineup-playerWallet" required /></label>
          <div className="row">
            <label>Pos<input id="lineup-pos" placeholder="GK/CB/CM/ST" required /></label>
            <label>Min inicio<input id="lineup-minInicio" type="number" defaultValue="0" required /></label>
            <label><input type="checkbox" id="lineup-titular" defaultChecked /> Titular</label>
          </div>
        </form>
        <HybridTransaction
          functionName="alineacion-agregar"
          functionArgs={[
            () => Number((document.getElementById("lineup-gameId") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("lineup-clubId") as HTMLInputElement)?.value || 0),
            () => (document.getElementById("lineup-playerWallet") as HTMLInputElement)?.value,
            () => String((document.getElementById("lineup-pos") as HTMLInputElement)?.value).toUpperCase().slice(0,2),
            () => (document.getElementById("lineup-titular") as HTMLInputElement)?.checked,
            () => Number((document.getElementById("lineup-minInicio") as HTMLInputElement)?.value || 0),
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Agregar"
          successMessage="Alineación agregada"
          contractNameOverride={CN_LINEUP}
        />
      </div>

      <div className="form">
        <h3>Registrar Salida</h3>
        <form onSubmit={(e:any)=>{e.preventDefault();}}>
          <label>ID Partido<input id="subout-gameId" type="number" required /></label>
          <label>Wallet Jugador<input id="subout-playerWallet" required /></label>
          <label>Min salida<input id="subout-minSalida" type="number" required /></label>
        </form>
        <HybridTransaction
          functionName="alineacion-salida"
          functionArgs={[
            () => Number((document.getElementById("subout-gameId") as HTMLInputElement)?.value || 0),
            () => (document.getElementById("subout-playerWallet") as HTMLInputElement)?.value,
            () => Number((document.getElementById("subout-minSalida") as HTMLInputElement)?.value || 0),
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Guardar"
          successMessage="Salida registrada"
          contractNameOverride={CN_LINEUP}
        />
      </div>

      <div className="form">
        <h3>Evento + Reputación</h3>
        <form onSubmit={(e:any)=>{e.preventDefault();}}>
          <label>ID Partido<input id="evt-gameId" type="number" required /></label>
          <label>ID Club<input id="evt-clubId" type="number" required /></label>
          <label>Wallet Jugador<input id="evt-playerWallet" required /></label>
          <div className="row">
            <label>Tipo
              <select id="evt-tipo" defaultValue="goal">
                <option value="goal">goal</option>
                <option value="assist">assist</option>
                <option value="yellow">yellow</option>
                <option value="red">red</option>
                <option value="sub">sub</option>
                <option value="injury">injury</option>
                <option value="offside">offside</option>
              </select>
            </label>
            <label>Minuto<input id="evt-minuto" type="number" required /></label>
            <label>Meta<input id="evt-meta" placeholder="penal/ST/etc." /></label>
          </div>
          <label>Evidencia CID (IPFS)<input id="evt-evidenceCid" placeholder="bafy..." /></label>
        </form>
        <HybridTransaction
          functionName="registrar-evento-ff"
          functionArgs={[
            () => Number((document.getElementById("evt-gameId") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("evt-clubId") as HTMLInputElement)?.value || 0),
            () => (document.getElementById("evt-playerWallet") as HTMLInputElement)?.value,
            () => (document.getElementById("evt-tipo") as HTMLSelectElement)?.value,
            () => Number((document.getElementById("evt-minuto") as HTMLInputElement)?.value || 0),
            () => (document.getElementById("evt-meta") as HTMLInputElement)?.value || "",
            () => (document.getElementById("evt-evidenceCid") as HTMLInputElement)?.value || "",
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Registrar"
          successMessage="Evento + reputación registrado"
          contractNameOverride={CN_EVENT}
        />
      </div>

      <div className="form">
        <h3>Elevar Verificación</h3>
        <form onSubmit={(e:any)=>{e.preventDefault();}}>
          <label>ID Partido<input id="elevate-gameId" type="number" required /></label>
          <label>Nivel
            <select id="elevate-nivel" defaultValue="club">
              <option value="club">club</option>
              <option value="oficial">oficial</option>
            </select>
          </label>
        </form>
        <HybridTransaction
          functionName="elevar-verificacion"
          functionArgs={[
            () => Number((document.getElementById("elevate-gameId") as HTMLInputElement)?.value || 0),
            () => (document.getElementById("elevate-nivel") as HTMLSelectElement)?.value,
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Elevar"
          successMessage="Verificación elevada"
          contractNameOverride={CN_ATTEST}
        />
      </div>

      <div className="form">
        <h3>Cerrar Partido</h3>
        <form onSubmit={(e:any)=>{e.preventDefault();}}>
          <label>ID Partido<input id="close-gameId" type="number" required /></label>
        </form>
        <HybridTransaction
          functionName="cerrar-juego"
          functionArgs={[
            () => Number((document.getElementById("close-gameId") as HTMLInputElement)?.value || 0),
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Cerrar"
          successMessage="Partido cerrado"
          contractNameOverride={CN_GAME}
        />
      </div>
    </section>
  );
}
