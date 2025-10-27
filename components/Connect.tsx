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
  const [hasLeather, setHasLeather] = useState<boolean>(false);
  const [hasXverse, setHasXverse] = useState<boolean>(false);

  const refreshAddr = () => {
    if (userSession.isUserSignedIn()) {
      const stx = userSession.loadUserData().profile?.stxAddress?.testnet;
      setAddr(stx || "");
    } else {
      setAddr("");
    }
  };

  useEffect(() => {
    refreshAddr();
    if (typeof window !== 'undefined') {
      const w: any = window as any;
      const leather = !!(w.LeatherProvider) || (w.StacksProvider && typeof w.StacksProvider === 'object' && String(w.StacksProvider?.name || '').toLowerCase().includes('leather'));
      const xverse = !!(w.XverseProviders && w.XverseProviders.stacks);
      setHasLeather(leather);
      setHasXverse(xverse);
      const onFocus = () => refreshAddr();
      const onVisibility = () => refreshAddr();
      window.addEventListener('focus', onFocus);
      document.addEventListener('visibilitychange', onVisibility);
      return () => {
        window.removeEventListener('focus', onFocus);
        document.removeEventListener('visibilitychange', onVisibility);
      };
    }
  }, []);

  const connectWallet = (_walletType: string) => {
    setIsConnecting(true);
    setShowWalletOptions(false);
    
    console.log(`Intentando conectar con ${_walletType}`);
    try {
      const w: any = typeof window !== 'undefined' ? (window as any) : {};
      if (_walletType === 'Leather' && w.LeatherProvider) {
        // Forzar Leather como provider activo
        w.StacksProvider = w.LeatherProvider;
      }
      if (_walletType === 'Xverse' && w.XverseProviders?.stacks) {
        // Forzar Xverse como provider activo
        w.StacksProvider = w.XverseProviders.stacks;
      }
    } catch {}

    showConnect({
      userSession,
      appDetails: {
        name: APP_NAME,
        icon: APP_ICON,
      },
      onFinish: () => {
        refreshAddr();
        setIsConnecting(false);
        console.log("Wallet conectada");
      },
      onCancel: () => {
        setIsConnecting(false);
        console.log("Conexión cancelada");
      },
    });
  };

  const onSignOut = () => {
    try {
      userSession.signUserOut("/");
    } finally {
      setAddr("");
    }
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
          title={hasXverse ? "Conectar con Xverse" : "Xverse no detectado: abre la extensión y recarga si no aparece"}
        >
          {isConnecting ? "Conectando..." : "Xverse"}
        </button>
        <button 
          className="btn secondary" 
          onClick={() => connectWallet("Leather")}
          disabled={isConnecting}
          title={hasLeather ? "Conectar con Leather" : "Leather no detectado: abre la extensión y recarga si no aparece"}
        >
          {isConnecting ? "Conectando..." : "Leather"}
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