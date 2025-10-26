"use client";

import { useEffect, useState } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { testnetNetwork, APP_NAME, APP_ICON } from "@/lib/stacks";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

export default function ConnectWallet() {
  const [addr, setAddr] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [showWalletOptions, setShowWalletOptions] = useState<boolean>(false);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const stx = userSession.loadUserData().profile?.stxAddress?.testnet;
      setAddr(stx || "");
    }
  }, []);

  const connectWallet = (walletType: string) => {
    setIsConnecting(true);
    setShowWalletOptions(false);
    
    console.log(`Intentando conectar con ${walletType}`);
    
    showConnect({
      userSession,
      network: testnetNetwork,
      appDetails: {
        name: APP_NAME,
        icon: APP_ICON,
      },
      onFinish: () => {
        const stx = userSession.loadUserData().profile?.stxAddress?.testnet;
        setAddr(stx || "");
        setIsConnecting(false);
        console.log("Wallet conectada:", stx);
      },
      onCancel: () => {
        setIsConnecting(false);
        console.log("Conexión cancelada");
      },
    });
  };

  const onSignOut = () => {
    userSession.signUserOut("/");
    setAddr("");
  };

  if (addr) {
    return (
      <div className="row" style={{alignItems:"center"}}>
        <span style={{fontSize:12}}>Conectado: {addr}</span>
        <button className="btn secondary" onClick={onSignOut}>Desconectar</button>
      </div>
    );
  }

  if (showWalletOptions) {
    return (
      <div className="row" style={{alignItems:"center", gap: "8px"}}>
        <button 
          className="btn" 
          onClick={() => connectWallet("Xverse")}
          disabled={isConnecting}
        >
          {isConnecting ? "Conectando..." : "Xverse"}
        </button>
        <button 
          className="btn secondary" 
          onClick={() => connectWallet("Hiro")}
          disabled={isConnecting}
        >
          {isConnecting ? "Conectando..." : "Hiro"}
        </button>
        <button 
          className="btn secondary" 
          onClick={() => setShowWalletOptions(false)}
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="row" style={{alignItems:"center"}}>
      <button 
        className="btn" 
        onClick={() => setShowWalletOptions(true)}
        disabled={isConnecting}
      >
        {isConnecting ? "Conectando..." : "Conectar Wallet"}
      </button>
    </div>
  );
}