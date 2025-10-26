"use client";

import { useEffect, useState } from "react";
import HybridTransaction from "@/components/HybridTransaction";
import { CN_PLAYER } from "@/lib/stacks";
import { userSession } from "@/components/Connect";
import { roGetClub } from "@/lib/readOnly";

export default function UnirJugador() {
  const [status, setStatus] = useState<string>("");
  const [addr, setAddr] = useState<string>("");
  const [clubId, setClubId] = useState<string>("");
  const [clubPreview, setClubPreview] = useState<{ nombre?: string } | null>(null);
  const [checking, setChecking] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Array<{ id: number; nombre: string }>>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    if (userSession?.isUserSignedIn?.()) {
      const stx = userSession.loadUserData().profile?.stxAddress?.testnet;
      setAddr(stx || "");
    }
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  const handleCheckClub = async (val: string) => {
    setClubPreview(null);
    const n = Number(val);
    if (!val || Number.isNaN(n) || n <= 0) return;
    setChecking(true);
    try {
      const res: any = await roGetClub(n);
      if (res?.success) {
        const nombre = res?.value?.value?.nombre?.value ?? res?.value?.value?.nombre;
        setClubPreview({ nombre });
      } else {
        setClubPreview(null);
      }
    } catch {
      setClubPreview(null);
    } finally {
      setChecking(false);
    }
  };

  // Búsqueda simple off-chain (MVP): escanea IDs 1..50 y filtra por nombre
  useEffect(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results: Array<{ id: number; nombre: string }> = [];
        const maxScan = 50; // ajustar si es necesario
        // Si es un número, priorizar ese ID
        const maybeId = Number(q);
        if (!Number.isNaN(maybeId) && maybeId > 0) {
          try {
            const res: any = await roGetClub(maybeId);
            const nombre = res?.value?.value?.nombre?.value ?? res?.value?.value?.nombre;
            if (nombre) results.push({ id: maybeId, nombre });
          } catch {}
        }
        // Escaneo acotado
        for (let i = 1; i <= maxScan; i++) {
          if (results.length >= 10) break;
          if (!Number.isNaN(maybeId) && i === maybeId) continue;
          try {
            const res: any = await roGetClub(i);
            const nombre: string | undefined = res?.value?.value?.nombre?.value ?? res?.value?.value?.nombre;
            if (typeof nombre === 'string' && nombre.toLowerCase().includes(q)) {
              results.push({ id: i, nombre });
            }
          } catch {
            // ignorar IDs inexistentes
          }
        }
        if (!cancelled) setSuggestions(results);
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchTerm]);

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>🤝 Unir Jugador a un Club</h1>
      <p>Se unirá el jugador asociado a tu wallet conectada.</p>
      <div style={{marginBottom:12, fontSize:12, color:'#444'}}>
        Wallet: {addr ? <span title={addr} style={{fontWeight:600}}>{addr}</span> : <span style={{color:'#b91c1c'}}>No conectada</span>}
      </div>
      
      <form onSubmit={onSubmit} className="form" style={{ position: 'relative' }}>
        <label>
          Buscar club (nombre o ID)
          <input
            placeholder="Ej: municipal, 3, deportivo..."
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
          />
        </label>
        {searchTerm && suggestions.length > 0 && (
          <div style={{
            position:'absolute',
            background:'#fff',
            border:'1px solid #e5e7eb',
            boxShadow:'0 10px 25px rgba(0,0,0,0.08)',
            borderRadius:10,
            padding:8,
            zIndex:40,
            width:'100%',
            maxWidth:560,
          }}>
            {suggestions.map(s => (
              <div key={s.id} style={{padding:'6px 8px', borderRadius:8, cursor:'pointer'}}
                onClick={()=>{ setClubId(String(s.id)); setSearchTerm(s.nombre); setSuggestions([]); handleCheckClub(String(s.id)); }}
                onMouseDown={(e)=> e.preventDefault()}
              >
                {s.nombre} <span style={{color:'#6b7280'}}>(ID #{s.id})</span>
              </div>
            ))}
            {isSearching && <div style={{padding:'6px 8px', color:'#6b7280'}}>Buscando…</div>}
          </div>
        )}
        <label>
          ID del Club *
          <input 
            id="join-clubId" 
            type="number" 
            required 
            placeholder="1"
            value={clubId}
            onChange={(e)=>{
              setClubId(e.target.value);
              handleCheckClub(e.target.value);
            }}
          />
        </label>
        {clubId && (
          <div style={{fontSize:12, color:'#555', marginTop:6}}>
            {checking ? 'Verificando club…' : clubPreview ? (
              <>Club seleccionado: <strong>{clubPreview.nombre || 'Sin nombre'}</strong></>
            ) : (
              <span style={{color:'#b45309'}}>No se encontró el club {clubId}</span>
            )}
          </div>
        )}
        <HybridTransaction
          functionName="jugador-unir-a-club"
          contractNameOverride={CN_PLAYER}
          functionArgs={[
            () => Number(clubId || 0),
          ]}
          buttonText="Unir al Club"
          successMessage="Jugador unido"
        />
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
