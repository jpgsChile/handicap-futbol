"use client";

import { useEffect, useState } from "react";
import { openContractCall } from "@stacks/connect";
import { stringUtf8CV, AnchorMode, PostConditionMode } from "@stacks/transactions";
import { testnetNetwork, APP_NAME, APP_ICON, TEST_WALLET_ADDRESS, CN_LEAGUE, getTestnetContract } from "@/lib/stacks";
import HybridTransaction from "@/components/HybridTransaction";
import { userSession } from "@/components/Connect";

export default function CrearLiga() {
  const [status, setStatus] = useState<string>("");
  const [mode] = useState<'wallet'>('wallet');
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddr, setWalletAddr] = useState<string>("");
  const [nonceLoading, setNonceLoading] = useState<boolean>(false);
  const [possibleNextNonce, setPossibleNextNonce] = useState<number | null>(null);
  const [nonceError, setNonceError] = useState<string>("");

  useEffect(() => {
    if (userSession?.isUserSignedIn?.()) {
      const stx = userSession.loadUserData().profile?.stxAddress?.testnet;
      setWalletAddr(stx || "");
    } else {
      setWalletAddr("");
    }
  }, []);

  const checkNonce = async (address: string) => {
    if (!address) return;
    setNonceLoading(true);
    setNonceError("");
    setPossibleNextNonce(null);
    try {
      const res = await fetch(`https://api.testnet.hiro.so/extended/v1/address/${address}/nonces`);
      if (!res.ok) throw new Error("No se pudo obtener el nonce");
      const data = await res.json();
      const next = typeof data?.possible_next_nonce === 'number' ? data.possible_next_nonce : null;
      setPossibleNextNonce(next);
    } catch (e: any) {
      setNonceError(e?.message || String(e));
    } finally {
      setNonceLoading(false);
    }
  };

  useEffect(() => {
    if (walletAddr) {
      checkNonce(walletAddr);
    }
  }, [walletAddr]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setIsLoading(true);
    setStatus("🔄 Procesando...");
    
    try {
      {
        // Usar wallet Leather con testnet
        const tn = getTestnetContract(CN_LEAGUE);
        if (!tn) {
          setStatus(`❌ Contrato ${CN_LEAGUE} no desplegado en Testnet. Configura NEXT_PUBLIC_TN_ADDR_FF_LEAGUE y reinicia el servidor, o usa Modo Dev.`);
          return;
        }
        await openContractCall({
          contractAddress: tn.address,
          contractName: tn.name,
          functionName: "crear-liga",
          functionArgs: [
            stringUtf8CV(String(fd.get("nombre"))),
            stringUtf8CV(String(fd.get("ubicacion"))),
            stringUtf8CV(String(fd.get("categoria")))
          ],
          network: testnetNetwork, // Usar testnet para wallet Leather
          appDetails: { name: APP_NAME, icon: APP_ICON },
          // Ayudas para Leather cuando no puede resolver nonce/fee
          nonce: typeof possibleNextNonce === 'number' ? possibleNextNonce : undefined,
          fee: 2000, // uSTX: valor seguro para contratos pequeños en testnet
          anchorMode: AnchorMode.Any,
          postConditionMode: PostConditionMode.Deny,
          onFinish: (data) => {
            setStatus(`✅ Liga creada exitosamente\nTxID: ${data.txId}\nWallet: ${TEST_WALLET_ADDRESS}`);
          },
          onCancel: () => setStatus("❌ Operación cancelada por el usuario"),
        });
      }
    } catch (error) {
      setStatus(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{maxWidth: 600, margin: "0 auto", padding: 24}}>
      <h1>🏆 Crear Nueva Liga</h1>
      <p>Crea una nueva liga de fútbol en el sistema.</p>
      
      {/* Solo Wallet */}
      <div style={{marginBottom: 24, padding: 16, backgroundColor: "#f0f8ff", borderRadius: 8}}>
        <h3>👛 Firma con Wallet</h3>
        <p style={{fontSize: "12px", color: "#666", marginTop: 8}}>
          Requiere wallet conectada: {TEST_WALLET_ADDRESS}
        </p>
        {
          <div style={{marginTop: 8, padding: 12, backgroundColor: "#fffbe6", border: "1px solid #ffe58f", borderRadius: 6}}>
            <div style={{fontSize: 12, color: "#8b8000"}}>
              Se firmará en Testnet usando tu wallet conectada.
            </div>
            <div style={{marginTop: 8, display: "flex", flexDirection: "column", gap: 8}}>
              <div style={{fontSize: 12}}>
                <strong>Dirección conectada:</strong> {walletAddr || "No conectada"}
              </div>
              {walletAddr && (
                <div style={{fontSize: 12}}>
                  <strong>Estado de nonce:</strong>{" "}
                  {nonceLoading ? "Consultando..." :
                    nonceError ? `Error: ${nonceError}` :
                    (possibleNextNonce === null ? "No disponible" : `Siguiente nonce: ${possibleNextNonce}`)
                  }
                </div>
              )}
              <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
                <a className="btn secondary" href="https://explorer.hiro.so/sandbox/faucet?chain=testnet" target="_blank" rel="noreferrer">🚰 Faucet Testnet</a>
                {walletAddr && (
                  <a className="btn secondary" href={`https://explorer.hiro.so/address/${walletAddr}?chain=testnet`} target="_blank" rel="noreferrer">🔎 Explorer</a>
                )}
                <button type="button" className="btn secondary" onClick={() => walletAddr && checkNonce(walletAddr)}>🔄 Refrescar estado</button>
              </div>
              {possibleNextNonce !== null && possibleNextNonce === 0 && (
                <div style={{fontSize: 12, color: "#8b8000"}}>
                  Sugerencia: si es tu primera transacción, fondea tu cuenta y realiza una transferencia pequeña para inicializar el nonce.
                </div>
              )}
            </div>
          </div>
        }
      </div>
      
      <form onSubmit={onSubmit} className="form">
        <label>
          Nombre de la Liga *
          <input name="nombre" required maxLength={64} placeholder="Liga Municipal de Santiago" />
        </label>
        
        <label>
          Ubicación *
          <input name="ubicacion" required maxLength={64} placeholder="Santiago, Chile" />
        </label>
        
        <label>
          Categoría *
          <select name="categoria" required>
            <option value="">Seleccionar categoría</option>
            <option value="barrial">Barrial</option>
            <option value="federada">Federada</option>
            <option value="escolar">Escolar</option>
            <option value="universitaria">Universitaria</option>
            <option value="profesional">Profesional</option>
          </select>
        </label>
        
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "🔄 Procesando..." : `Crear Liga (Wallet)`}
        </button>
      </form>
      
      {status && <div style={{marginTop: 16, padding: 12, backgroundColor: "#f0f0f0", borderRadius: 8}}>
        <pre style={{whiteSpace: "pre-wrap", fontSize: "12px"}}>{status}</pre>
      </div>}
    </div>
  );
}