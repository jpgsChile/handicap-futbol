"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { stringUtf8CV, AnchorMode, PostConditionMode } from "@stacks/transactions";
import { testnetNetwork, CONTRACT_ADDRESS, APP_NAME, TEST_WALLET_ADDRESS, CN_LEAGUE, getTestnetContract } from "@/lib/stacks";

export default function PruebasComparativas() {
  const [results, setResults] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testDevMode = async () => {
    setIsLoading(true);
    setResults("🔄 Probando Modo Desarrollo...\n");

    try {
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractAddress: CONTRACT_ADDRESS,
          contractName: CN_LEAGUE,
          functionName: 'crear-liga',
          args: ["Liga Test Dev", "Santiago", "barrial"],
          mode: 'dev'
        })
      });

      const result = await response.json();

      if (result.success) {
        setResults(prev => prev + `✅ Modo Dev: EXITOSO\nResultado: ${result.data}\n\n`);
      } else {
        setResults(prev => prev + `❌ Modo Dev: ERROR\nError: ${result.error}\n\n`);
      }
    } catch (error) {
      setResults(prev => prev + `❌ Modo Dev: ERROR\nError: ${error}\n\n`);
    } finally {
      setIsLoading(false);
    }
  };

  const testWalletMode = async () => {
    setIsLoading(true);
    setResults(prev => prev + "🔄 Probando Modo Wallet Leather...\n");

    try {
      const tn = getTestnetContract(CN_LEAGUE);
      if (!tn) {
        setResults(prev => prev + `❌ Modo Wallet: Contrato ${CN_LEAGUE} no desplegado en Testnet. Configura NEXT_PUBLIC_TN_ADDR_FF_LEAGUE y reinicia.\n\n`);
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
        appDetails: { name: APP_NAME, icon: "/images/futurofutbol_logo.jpeg" },
        anchorMode: AnchorMode.Any,
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
          setResults(prev => prev + `✅ Modo Wallet: EXITOSO\nTxID: ${data.txId}\nWallet: ${TEST_WALLET_ADDRESS}\n\n`);
          setIsLoading(false);
        },
        onCancel: () => {
          setResults(prev => prev + `❌ Modo Wallet: CANCELADO por usuario\n\n`);
          setIsLoading(false);
        },
        onError: (error) => {
          setResults(prev => prev + `❌ Modo Wallet: ERROR\nError: ${error.message || error}\n\n`);
          setIsLoading(false);
        },
      });
    } catch (error) {
      setResults(prev => prev + `❌ Modo Wallet: ERROR\nError: ${error}\n\n`);
      setIsLoading(false);
    }
  };

  const testBothModes = async () => {
    setResults("🧪 Iniciando Pruebas Comparativas...\n\n");
    await testDevMode();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa entre pruebas
    await testWalletMode();
  };

  const clearResults = () => {
    setResults("");
  };

  return (
    <div style={{maxWidth: 800, margin: "0 auto", padding: 24}}>
      <h1>🔍 Pruebas Comparativas: Dev vs Wallet</h1>
      <p>Compara el rendimiento entre el Modo Desarrollo y el Modo Wallet Leather.</p>

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
          onClick={testDevMode} 
          className="btn" 
          disabled={isLoading}
          style={{backgroundColor: "#10b981"}}
        >
          🛠️ Probar Solo Dev Mode
        </button>
        
        <button 
          onClick={testWalletMode} 
          className="btn" 
          disabled={isLoading}
          style={{backgroundColor: "#f59e0b"}}
        >
          👛 Probar Solo Wallet
        </button>
        
        <button 
          onClick={testBothModes} 
          className="btn" 
          disabled={isLoading}
          style={{backgroundColor: "#3b82f6"}}
        >
          🔄 Probar Ambos Modos
        </button>
        
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
          <p><strong>✅ Modo Dev Exitoso:</strong> El código funciona correctamente</p>
          <p><strong>❌ Modo Wallet Falla:</strong> Problema específico de wallet/conexión</p>
          <p><strong>❌ Ambos Fallan:</strong> Problema en el contrato o configuración</p>
          <p><strong>✅ Ambos Exitosos:</strong> Sistema funcionando correctamente</p>
        </div>
      </div>
    </div>
  );
}

