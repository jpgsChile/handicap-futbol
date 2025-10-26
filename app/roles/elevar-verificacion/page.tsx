"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";
import { CN_ATTEST } from "@/lib/stacks";

export default function ElevarVerificacion() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>⬆️ Elevar Nivel de Verificación</h1>
      <p>Eleva el nivel de verificación de un partido.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          ID del Partido *
          <input id="veri-gameId" type="number" required placeholder="1" />
        </label>
        
        <label>
          Nuevo Nivel de Verificación *
          <select id="veri-nivel" required>
            <option value="">Seleccionar nivel</option>
            <option value="club">Club</option>
            <option value="oficial">Oficial</option>
          </select>
        </label>
        
        <div style={{padding: 12, backgroundColor: "#fff3cd", borderRadius: 8, marginBottom: 16}}>
          <strong>Nota:</strong> Solo los propietarios de clubes pueden elevar a "club" y solo las ligas pueden elevar a "oficial".
        </div>
        
        <HybridTransaction
          functionName="elevar-verificacion"
          contractNameOverride={CN_ATTEST}
          functionArgs={[
            () => Number((document.getElementById("veri-gameId") as HTMLInputElement)?.value || 0),
            () => (document.getElementById("veri-nivel") as HTMLSelectElement)?.value,
          ].map(f => (typeof f === 'function' ? f() : f))}
          buttonText="Elevar Verificación"
          successMessage="Verificación elevada"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
