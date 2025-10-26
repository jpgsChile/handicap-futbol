"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { stringUtf8CV, uintCV, standardPrincipalCV, someCV, noneCV, boolCV, AnchorMode, PostConditionMode } from "@stacks/transactions";
import { network, testnetNetwork, CONTRACT_ADDRESS, CONTRACT_NAME, APP_NAME, APP_ICON, getTestnetContract } from "@/lib/stacks";

interface HybridTransactionProps {
  functionName: string;
  functionArgs: any[];
  buttonText: string;
  successMessage: string;
  contractNameOverride?: string; // para módulos separados (ff-league, etc.)
  contractAddressOverride?: string; // por si módulos en otra address
}

export default function HybridTransaction({ 
  functionName, 
  functionArgs, 
  buttonText, 
  successMessage,
  contractNameOverride,
  contractAddressOverride
}: HybridTransactionProps) {
  const [status, setStatus] = useState<string>("");
  const [mode, setMode] = useState<'wallet' | 'dev'>('dev');
  const [isLoading, setIsLoading] = useState(false);

  const executeTransaction = async () => {
    setIsLoading(true);
    setStatus("🔄 Procesando...");
    
    try {
      if (mode === 'dev') {
        // Usar API de desarrollo
        const response = await fetch('/api/transaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contractAddress: contractAddressOverride || CONTRACT_ADDRESS,
            contractName: contractNameOverride || CONTRACT_NAME,
            functionName: functionName,
            args: functionArgs,
            mode: 'dev'
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          setStatus(`✅ ${successMessage} (Modo Dev)\nResultado: ${result.data}`);
        } else {
          setStatus(`❌ Error en modo dev: ${result.error}`);
        }
      } else {
        // Usar wallet tradicional
        const args = functionArgs.map(arg => {
          // Structured helpers
          if (arg && typeof arg === 'object') {
            // principal
            if ((arg as any).cv === 'principal') return standardPrincipalCV((arg as any).value);
            if ((arg as any).cv === 'optional-principal') {
              const v = (arg as any).value;
              return v ? someCV(standardPrincipalCV(v)) : noneCV();
            }
          }
          if (typeof arg === 'string') return stringUtf8CV(arg);
          if (typeof arg === 'number') return uintCV(arg);
          if (typeof arg === 'boolean') return boolCV(arg);
          return arg;
        });

        // Resolver contrato para testnet si está configurado
        const targetName = contractNameOverride || CONTRACT_NAME;
        const tn = getTestnetContract(targetName);
        if (!tn) {
          setStatus(`❌ Contrato ${targetName} no desplegado en testnet. Usa modo Dev o configura NEXT_PUBLIC_TN_ADDR_*`);
          return;
        }

        await openContractCall({
          contractAddress: tn.address,
          contractName: tn.name,
          functionName: functionName,
          functionArgs: args,
          network: testnetNetwork,
          appDetails: { name: APP_NAME, icon: APP_ICON },
          anchorMode: AnchorMode.Any,
          postConditionMode: PostConditionMode.Deny,
          onFinish: () => setStatus(`✅ ${successMessage} (Modo Wallet)`),
          onCancel: () => setStatus("❌ Operación cancelada"),
        });
      }
    } catch (error) {
      setStatus(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{marginBottom: 24, padding: 16, backgroundColor: "#f8f9fa", borderRadius: 8}}>
      {/* Selector de Modo */}
      <div style={{marginBottom: 16}}>
        <h4>🔧 Modo de Ejecución</h4>
        <div style={{display: "flex", gap: 16, marginTop: 8}}>
          <label style={{display: "flex", alignItems: "center", gap: 8}}>
            <input 
              type="radio" 
              name={`mode-${functionName}`}
              value="dev" 
              checked={mode === 'dev'}
              onChange={(e) => setMode(e.target.value as 'dev')}
            />
            <span>🛠️ Dev</span>
          </label>
          <label style={{display: "flex", alignItems: "center", gap: 8}}>
            <input 
              type="radio" 
              name={`mode-${functionName}`}
              value="wallet"
              checked={mode === 'wallet'}
              onChange={(e) => setMode(e.target.value as 'wallet')}
            />
            <span>👛 Wallet</span>
          </label>
        </div>
      </div>

      <button 
        onClick={executeTransaction}
        className="btn" 
        disabled={isLoading}
        style={{width: "100%"}}
      >
        {isLoading ? "🔄 Procesando..." : `${buttonText} (${mode === 'dev' ? 'Dev' : 'Wallet'})`}
      </button>

      {status && (
        <div style={{marginTop: 12, padding: 8, backgroundColor: "#fff", borderRadius: 4, border: "1px solid #ddd"}}>
          <pre style={{whiteSpace: "pre-wrap", fontSize: "11px", margin: 0}}>{status}</pre>
        </div>
      )}
    </div>
  );
}

