"use client";

import { useEffect, useState } from "react";
import { userSession } from "./Connect";

export default function WalletStatus() {
  const [addr, setAddr] = useState<string>("");
  const [nonce, setNonce] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = async (address: string) => {
    if (!address) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.testnet.hiro.so/extended/v1/address/${address}/nonces`);
      const data = await res.json();
      setNonce(typeof data?.possible_next_nonce === 'number' ? data.possible_next_nonce : null);
    } catch {
      setNonce(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userSession?.isUserSignedIn?.()) {
      const stx = userSession.loadUserData().profile?.stxAddress?.testnet;
      setAddr(stx || "");
      if (stx) refresh(stx);
    }
  }, []);

  if (!addr) return null;

  return (
    <div style={{display:"flex", alignItems:"center", gap:8, fontSize:12, color:"#444"}}>
      <span title={addr} style={{maxWidth:160, overflow:"hidden", textOverflow:"ellipsis"}}>{addr}</span>
      <span>nonce: {loading ? "…" : (nonce ?? "-")}</span>
      <button className="btn secondary" onClick={() => refresh(addr)} style={{padding:"2px 8px"}}>Refrescar</button>
    </div>
  );
}



