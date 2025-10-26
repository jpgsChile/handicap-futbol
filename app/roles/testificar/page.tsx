"use client";

import { useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";

export default function CrearTestificacion() {
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>📜 Crear Testificación</h1>
      <p>Crea una testificación para una entidad específica.</p>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Entidad *
          <input id="att-entity" required maxLength={8} placeholder="juego|evento|perfil" />
        </label>
        
        <label>
          ID de la Entidad *
          <input id="att-id" type="number" required placeholder="1" />
        </label>
        
        <label>
          Peso de la Testificación *
          <input id="att-weight" type="number" required placeholder="5" />
        </label>
        
        <label>
          Comentario *
          <textarea id="att-comment" required maxLength={64} placeholder="Testificación positiva por buen comportamiento..." />
        </label>
        
        <label>
          CID de Evidencia (IPFS) *
          <input id="att-cid" required placeholder="bafy..." />
        </label>
        <HybridTransaction
          functionName="attest"
          contractNameOverride="ff-attest"
          functionArgs={[
            () => (document.getElementById("att-entity") as HTMLInputElement)?.value,
            () => Number((document.getElementById("att-id") as HTMLInputElement)?.value || 0),
            () => Number((document.getElementById("att-weight") as HTMLInputElement)?.value || 0),
            () => (document.getElementById("att-comment") as HTMLTextAreaElement)?.value,
            () => (document.getElementById("att-cid") as HTMLInputElement)?.value,
          ]}
          buttonText="Crear Testificación"
          successMessage="Testificación creada"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
