"use client";

import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import { stringUtf8CV, uintCV, standardPrincipalCV, someCV, noneCV, boolCV, AnchorMode, PostConditionMode } from "@stacks/transactions";
import { testnetNetwork, CONTRACT_NAME, APP_NAME, APP_ICON, getTestnetContract } from "@/lib/stacks";

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
  const [mode] = useState<'wallet'>('wallet');
  const [isLoading, setIsLoading] = useState(false);

  const executeTransaction = async () => {
    setIsLoading(true);
    setStatus("🔄 Procesando...");
    
    try {
      {
        // Evaluar y validar argumentos de formulario (permitimos funciones perezosas)
        const evaluated = functionArgs.map(arg => (typeof arg === 'function' ? (arg as any)() : arg));
        // Validaciones mínimas (permitimos strings vacíos para campos opcionales)
        const hasEmpty = evaluated.some(v => v === undefined || v === null);
        const hasNaN = evaluated.some(v => typeof v === 'number' && Number.isNaN(v));
        if (hasEmpty || hasNaN) {
          setStatus("❌ Parámetros inválidos: revisa campos vacíos o IDs inválidos");
          return;
        }

        // Usar wallet tradicional
        const args = evaluated.map(arg => {
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
          setStatus(`❌ Contrato ${targetName} no desplegado en Testnet. Configura NEXT_PUBLIC_TN_ADDR_*`);
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
          onFinish: () => setStatus(`✅ ${successMessage}`),
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
      {/* Solo Wallet */}

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

