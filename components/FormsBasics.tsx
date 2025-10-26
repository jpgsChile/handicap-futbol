"use client";

import { useState } from "react";
import HybridTransaction from "./HybridTransaction";
import { CN_LEAGUE, CN_CLUB, CN_PLAYER, CN_ROLES } from "@/lib/stacks";

export default function FormsBasics() {
  const [status, setStatus] = useState<string>("");

  return (
    <section className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
      <div className="form">
        <h3>Crear Liga</h3>
        <form onSubmit={(e:any)=>{e.preventDefault();}}>
          <label>Nombre<input id="league-nombre" required /></label>
          <label>Ubicación<input id="league-ubicacion" required /></label>
          <label>Categoría<input id="league-categoria" placeholder="barrial/federada..." required /></label>
        </form>
        <HybridTransaction
          functionName="crear-liga"
          functionArgs={[
            () => (document.getElementById("league-nombre") as HTMLInputElement)?.value,
            () => (document.getElementById("league-ubicacion") as HTMLInputElement)?.value,
            () => (document.getElementById("league-categoria") as HTMLInputElement)?.value,
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Crear Liga"
          successMessage="Liga creada"
          contractNameOverride={CN_LEAGUE}
        />
      </div>

      <div className="form">
        <h3>Crear Club</h3>
        <form onSubmit={(e:any)=>{e.preventDefault();}}>
          <label>Nombre<input id="club-nombre" required /></label>
          <label>ID Liga<input id="club-leagueId" type="number" required /></label>
          <label><input type="checkbox" id="club-gkFijo" /> GK fijo requerido</label>
        </form>
        <HybridTransaction
          functionName="crear-club"
          functionArgs={[
            () => (document.getElementById("club-nombre") as HTMLInputElement)?.value,
            () => Number((document.getElementById("club-leagueId") as HTMLInputElement)?.value || 0),
            () => (document.getElementById("club-gkFijo") as HTMLInputElement)?.checked,
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Crear Club"
          successMessage="Club creado"
          contractNameOverride={CN_CLUB}
        />
      </div>

      <div className="form">
        <h3>Registrar Jugador</h3>
        <form onSubmit={(e:any)=>{e.preventDefault();}}>
          <label>Nombre<input id="player-nombre" required /></label>
          <label>Apodo<input id="player-apodo" required /></label>
          <div className="row">
            <label>Pos1<input id="player-pos1" placeholder="GK/CB/CM/ST..." required /></label>
            <label>Pos2<input id="player-pos2" placeholder="opcional" /></label>
            <label>Pos3<input id="player-pos3" placeholder="opcional" /></label>
          </div>
          <div className="row">
            <label><input type="checkbox" id="player-isMinor" /> Menor de edad</label>
            <label>Guardian (principal)<input id="player-consent" placeholder="STX..." /></label>
            <label>Visibilidad
              <select id="player-visibility" defaultValue="public">
                <option value="public">public</option>
                <option value="restricted">restricted</option>
              </select>
            </label>
          </div>
        </form>
        <HybridTransaction
          functionName="registrar-jugador-ff"
          functionArgs={[
            () => (document.getElementById("player-nombre") as HTMLInputElement)?.value,
            () => (document.getElementById("player-apodo") as HTMLInputElement)?.value,
            () => (document.getElementById("player-pos1") as HTMLInputElement)?.value,
            () => (document.getElementById("player-pos2") as HTMLInputElement)?.value,
            () => (document.getElementById("player-pos3") as HTMLInputElement)?.value,
            () => (document.getElementById("player-isMinor") as HTMLInputElement)?.checked,
            () => (document.getElementById("player-consent") as HTMLInputElement)?.value,
            () => (document.getElementById("player-visibility") as HTMLSelectElement)?.value,
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Registrar"
          successMessage="Jugador registrado"
          contractNameOverride={CN_PLAYER}
        />
      </div>

      <div className="form">
        <h3>Unirse a Club</h3>
        <form onSubmit={(e:any)=>{e.preventDefault();}}>
          <label>ID Club<input id="join-clubId" type="number" required /></label>
        </form>
        <HybridTransaction
          functionName="jugador-unir-a-club"
          functionArgs={[
            () => Number((document.getElementById("join-clubId") as HTMLInputElement)?.value || 0),
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Unirme"
          successMessage="Jugador unido al club"
          contractNameOverride={CN_PLAYER}
        />
      </div>

      <div className="form">
        <h3>Asignar Rol (owner)</h3>
        <form onSubmit={(e:any)=>{e.preventDefault();}}>
          <label>Principal (STX...)<input id="role-who" required /></label>
          <label>Rol
            <select id="role-role" defaultValue="1">
              <option value="1">ROLE_JUGADOR (1)</option>
              <option value="2">ROLE_DT (2)</option>
              <option value="3">ROLE_REP (3)</option>
              <option value="4">ROLE_LIGA (4)</option>
            </select>
          </label>
          <label><input type="checkbox" id="role-enabled" defaultChecked /> enabled</label>
        </form>
        <HybridTransaction
          functionName="asignar-rol"
          functionArgs={[
            () => (document.getElementById("role-who") as HTMLInputElement)?.value,
            () => Number((document.getElementById("role-role") as HTMLSelectElement)?.value || 0),
            () => (document.getElementById("role-enabled") as HTMLInputElement)?.checked,
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Asignar"
          successMessage="Rol actualizado"
          contractNameOverride={CN_ROLES}
        />
      </div>

      <div className="form">
        <h3>Estado</h3>
        <p>{status}</p>
      </div>
    </section>
  );
}
