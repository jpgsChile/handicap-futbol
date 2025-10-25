// Template para funciones Read-Only en Stacks
// Este archivo contiene ejemplos de cómo usar callReadOnlyFunction

import { callReadOnlyFunction, stringUtf8CV, uintCV, standardPrincipalCV, boolCV, someCV, noneCV } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME } from "@/lib/stacks";

const SENDER_ADDRESS = "ST000000000000000000002AMW42H"; // any testnet addr

// Template básico para función read-only
export async function templateReadOnlyFunction() {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "FUNCTION_NAME",
      functionArgs: [
        // Ejemplos de argumentos:
        // uintCV(123),                    // uint
        // stringUtf8CV("texto"),          // string-utf8
        // standardPrincipalCV("ST1..."),  // principal
        // boolCV(true),                   // bool
        // someCV(uintCV(123)),            // (optional uint)
        // noneCV(),                       // (optional uint) - none
      ],
      network,
      senderAddress: SENDER_ADDRESS,
    });
    return result;
  } catch (error) {
    console.error("Error calling FUNCTION_NAME:", error);
    throw error;
  }
}

// Ejemplos específicos para el contrato handicap-futbol

// 1. Obtener información de liga
export async function getLigaExample(id: number) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-liga",
    functionArgs: [uintCV(id)],
    network,
    senderAddress: SENDER_ADDRESS,
  });
  return result;
}

// 2. Obtener información de club
export async function getClubExample(id: number) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-club",
    functionArgs: [uintCV(id)],
    network,
    senderAddress: SENDER_ADDRESS,
  });
  return result;
}

// 3. Obtener información de jugador
export async function getJugadorExample(wallet: string) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-jugador",
    functionArgs: [standardPrincipalCV(wallet)],
    network,
    senderAddress: SENDER_ADDRESS,
  });
  return result;
}

// 4. Verificar si usuario tiene rol
export async function tieneRolExample(who: string, role: number) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "tiene-rol",
    functionArgs: [standardPrincipalCV(who), uintCV(role)],
    network,
    senderAddress: SENDER_ADDRESS,
  });
  return result;
}

// 5. Obtener información de partido
export async function getJuegoExample(id: number) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-juego",
    functionArgs: [uintCV(id)],
    network,
    senderAddress: SENDER_ADDRESS,
  });
  return result;
}

// 6. Obtener alineación de jugador
export async function getAlineacionExample(gameId: number, wallet: string) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-alineacion",
    functionArgs: [uintCV(gameId), standardPrincipalCV(wallet)],
    network,
    senderAddress: SENDER_ADDRESS,
  });
  return result;
}

// 7. Obtener evento específico
export async function getEventoExample(gameId: number, index: number) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-evento",
    functionArgs: [uintCV(gameId), uintCV(index)],
    network,
    senderAddress: SENDER_ADDRESS,
  });
  return result;
}

// 8. Verificar si existe liga
export async function existsLeagueExample(leagueId: number) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "exists-league",
    functionArgs: [uintCV(leagueId)],
    network,
    senderAddress: SENDER_ADDRESS,
  });
  return result;
}

// 9. Verificar si existe club
export async function existsClubExample(clubId: number) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "exists-club",
    functionArgs: [uintCV(clubId)],
    network,
    senderAddress: SENDER_ADDRESS,
  });
  return result;
}

// 10. Verificar si existe partido
export async function existsGameExample(gameId: number) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "exists-game",
    functionArgs: [uintCV(gameId)],
    network,
    senderAddress: SENDER_ADDRESS,
  });
  return result;
}

// 11. Verificar si es propietario del club
export async function isClubOwnerExample(clubId: number, who: string) {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "is-club-owner",
    functionArgs: [uintCV(clubId), standardPrincipalCV(who)],
    network,
    senderAddress: SENDER_ADDRESS,
  });
  return result;
}

/*
INSTRUCCIONES DE USO:

1. Importa las funciones necesarias:
   import { callReadOnlyFunction, uintCV, stringUtf8CV, standardPrincipalCV } from "@stacks/transactions";

2. Usa el template básico:
   const result = await callReadOnlyFunction({
     contractAddress: CONTRACT_ADDRESS,
     contractName: CONTRACT_NAME,
     functionName: "nombre-funcion",
     functionArgs: [/* argumentos con CV */],
     network,
     senderAddress: SENDER_ADDRESS,
   });

3. Tipos de argumentos comunes:
   - uintCV(123)                    // Números enteros
   - stringUtf8CV("texto")         // Strings
   - standardPrincipalCV("ST1...") // Direcciones de wallet
   - boolCV(true)                  // Booleanos
   - someCV(uintCV(123))           // Optional con valor
   - noneCV()                      // Optional sin valor

4. Manejo de errores:
   try {
     const result = await callReadOnlyFunction({...});
     return result;
   } catch (error) {
     console.error("Error:", error);
     throw error;
   }

5. En componentes React:
   const [result, setResult] = useState(null);
   
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const data = await getLigaExample(1);
       setResult(data);
     } catch (error) {
       console.error(error);
     }
   };
*/
