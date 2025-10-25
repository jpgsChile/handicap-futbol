"use client";

import { useEffect, useState } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

export default function Connect() {
  const [addr, setAddr] = useState<string>("");

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const stx = userSession.loadUserData().profile?.stxAddress?.testnet;
      setAddr(stx || "");
    }
  }, []);

  const onConnect = () =>
    showConnect({
      userSession,
      appDetails: {
        name: process.env.NEXT_PUBLIC_APP_NAME || "FuturoFutbol Handicap",
        icon: "",
      },
      onFinish: () => {
        const stx = userSession.loadUserData().profile?.stxAddress?.testnet;
        setAddr(stx || "");
      },
    });

  const onSignOut = () => {
    userSession.signUserOut("/");
    setAddr("");
  };

  return (
    <div className="row" style={{alignItems:"center"}}>
      {addr ? (
        <>
          <span style={{fontSize:12}}>Conectado: {addr}</span>
          <button className="btn secondary" onClick={onSignOut}>Desconectar</button>
        </>
      ) : (
        <button className="btn" onClick={onConnect}>Conectar Wallet</button>
      )}
    </div>
  );
}
