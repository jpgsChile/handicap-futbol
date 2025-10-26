"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { stringUtf8CV, AnchorMode, PostConditionMode } from "@stacks/transactions";
import { testnetNetwork, CONTRACT_ADDRESS, APP_NAME, APP_ICON, TEST_WALLET_ADDRESS, CN_LEAGUE, getTestnetContract } from "@/lib/stacks";

export default function PruebasComparativas() {
  const [results, setResults] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Dev mode removido

  const testWalletMode = async () => {
    setIsLoading(true);
    setResults(prev => prev + "🔄 Probando transacción con Wallet...\n");

    try {
      const tn = getTestnetContract(CN_LEAGUE);
      if (!tn) {
        setResults(prev => prev + `❌ Contrato ${CN_LEAGUE} no desplegado en Testnet. Configura NEXT_PUBLIC_TN_ADDR_FF_LEAGUE y reinicia.\n\n`);
        setIsLoading(false);
        return;
      }

      await openContractCall({
        contractAddress: tn.address,
        contractName: tn.name,
        functionName: "crear-liga",
        functionArgs: [
          stringUtf8CV("Liga Test Wallet"),
          stringUtf8CV("Santiago"),
          stringUtf8CV("barrial")
        ],
        network: testnetNetwork,
        appDetails: { name: APP_NAME, icon: APP_ICON },
        anchorMode: AnchorMode.Any,
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
          setResults(prev => prev + `✅ Transacción enviada\nTxID: ${data.txId}\nWallet: ${TEST_WALLET_ADDRESS}\n\n`);
          setIsLoading(false);
        },
        onCancel: () => {
          setResults(prev => prev + `❌ Operación cancelada por usuario\n\n`);
          setIsLoading(false);
        },
      });
    } catch (error) {
      setResults(prev => prev + `❌ Error\nDetalles: ${error}\n\n`);
      setIsLoading(false);
    }
  };

  // Solo wallet

  const clearResults = () => {
    setResults("");
  };

  return (
    <div style={{maxWidth: 800, margin: "0 auto", padding: 24}}>
      <h1>🔍 Prueba de transacción</h1>
      <p>Prueba rápida de envío de transacción en Testnet.</p>

      {/* Información de la Wallet */}
      <div style={{marginBottom: 24, padding: 16, backgroundColor: "#f0f8ff", borderRadius: 8}}>
        <h3>👛 Wallet de Prueba Leather</h3>
        <p><strong>Dirección:</strong> {TEST_WALLET_ADDRESS}</p>
        <p><strong>Red:</strong> Stacks Testnet Público</p>
        <p><strong>Propósito:</strong> Validar si los errores son de wallet o de código</p>
      </div>

      {/* Botones de Prueba */}
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24}}>
        <button 
          onClick={testWalletMode} 
          className="btn" 
          disabled={isLoading}
          style={{backgroundColor: "#f59e0b"}}
        >
          👛 Enviar transacción
        </button>
        
        {/* Botón de ambos modos removido */}
        
        <button 
          onClick={clearResults} 
          className="btn secondary"
          disabled={isLoading}
        >
          🗑️ Limpiar Resultados
        </button>
      </div>

      {/* Resultados */}
      <div style={{padding: 16, backgroundColor: "#f8f9fa", borderRadius: 8, minHeight: 200}}>
        <h3>📊 Resultados de las Pruebas</h3>
        {isLoading && <p>🔄 Ejecutando pruebas...</p>}
        <pre style={{
          whiteSpace: "pre-wrap", 
          fontSize: "12px", 
          backgroundColor: "#fff", 
          padding: 12, 
          borderRadius: 4, 
          border: "1px solid #ddd",
          marginTop: 12
        }}>
          {results || "Esperando pruebas..."}
        </pre>
      </div>

      {/* Análisis */}
      <div style={{marginTop: 24, padding: 16, backgroundColor: "#e8f5e8", borderRadius: 8}}>
        <h3>📈 Análisis de Resultados</h3>
        <div style={{fontSize: "14px"}}>
          <p><strong>✅ Exitoso:</strong> Sistema funcionando correctamente</p>
          <p><strong>❌ Falla:</strong> Revisar configuración de Wallet/Testnet y contratos</p>
        </div>
      </div>
    </div>
  );
}

