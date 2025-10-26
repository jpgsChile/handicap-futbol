"use client";

import { useEffect, useState } from "react";
import { userSession } from "./Connect";

export default function WalletStatus() {
  const [addr, setAddr] = useState<string>("");

  // Nonce oculto y sin refresh según solicitud

  useEffect(() => {
    if (userSession?.isUserSignedIn?.()) {
      const stx = userSession.loadUserData().profile?.stxAddress?.testnet;
      setAddr(stx || "");
    }
  }, []);

  if (!addr) return null;

  return (
    <div style={{
      display:"inline-flex",
      alignItems:"center",
      gap:8,
      fontSize:12,
      color:"#111",
      background:"#f3f4f6",
      border:"1px solid #e5e7eb",
      borderRadius:999,
      padding:"4px 10px"
    }}>
      <span
        title={addr}
        style={{maxWidth:180, overflow:"hidden", textOverflow:"ellipsis"}}
      >{addr}</span>
      <span style={{width:6, height:6, background:"#10b981", borderRadius:999}} />
    </div>
  );
}



