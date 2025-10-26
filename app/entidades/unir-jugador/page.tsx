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
  const [clubsOptions, setClubsOptions] = useState<Array<{ id: number; nombre: string }>>([]);
  const [loadingClubs, setLoadingClubs] = useState<boolean>(false);

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

  // Cargar lista de clubes (MVP): escanear IDs 1..50; se detiene tras 10 fallas consecutivas
  const loadClubs = async () => {
    setLoadingClubs(true);
    const results: Array<{ id: number; nombre: string }> = [];
    let misses = 0;
    const maxScan = 50;
    for (let i = 1; i <= maxScan; i++) {
      if (misses >= 10) break;
      try {
        const res: any = await roGetClub(i);
        const nombre: string | undefined = res?.value?.value?.nombre?.value ?? res?.value?.value?.nombre;
        if (typeof nombre === 'string' && nombre.length > 0) {
          results.push({ id: i, nombre });
          misses = 0;
        } else {
          misses++;
        }
      } catch {
        misses++;
      }
    }
    setClubsOptions(results);
    setLoadingClubs(false);
  };

  useEffect(() => {
    loadClubs();
  }, []);

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>🤝 Unir Jugador a un Club</h1>
      <p>Se unirá el jugador asociado a tu wallet conectada.</p>
      <div style={{marginBottom:12, fontSize:12, color:'#444'}}>
        Wallet: {addr ? <span title={addr} style={{fontWeight:600}}>{addr}</span> : <span style={{color:'#b91c1c'}}>No conectada</span>}
      </div>
      
      <form onSubmit={onSubmit} className="form" style={{ position: 'relative' }}>
        <div className="row" style={{alignItems:'flex-end', gap:8}}>
          <label style={{flex:1}}>
            Seleccionar Club
            <select
              value={clubId}
              onChange={(e)=> { setClubId(e.target.value); handleCheckClub(e.target.value); }}
            >
              <option value="">-- Selecciona un club --</option>
              {clubsOptions.map(c => (
                <option key={c.id} value={c.id}>{c.nombre} (ID #{c.id})</option>
              ))}
            </select>
          </label>
          <button type="button" className="btn secondary" onClick={loadClubs} disabled={loadingClubs}>
            {loadingClubs ? 'Actualizando…' : 'Actualizar lista'}
          </button>
        </div>
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
        {addr && clubPreview ? (
          <HybridTransaction
            functionName="jugador-unir-a-club"
            contractNameOverride={CN_PLAYER}
            functionArgs={[
              () => Number(clubId || 0),
            ]}
            buttonText="Unir al Club"
            successMessage="Jugador unido"
          />
        ) : (
          <button className="btn" disabled title={!addr ? 'Conecta tu wallet' : 'Selecciona un club válido'}>
            Unir al Club
          </button>
        )}
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        {status}
      </div>}
    </div>
  );
}
