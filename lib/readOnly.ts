import { callReadOnlyFunction } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS } from "./stacks";
import { uintCV, standardPrincipalCV, stringUtf8CV } from "@stacks/transactions";

const SENDER_ADDRESS = "ST000000000000000000002AMW42H"; // any testnet addr

export async function roGetLiga(id: number) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: "ff-views",
      functionName: "liga-detalle",
      functionArgs: [uintCV(id)],
      network,
      senderAddress: SENDER_ADDRESS,
    });
    return result;
  } catch (error) {
    console.error("Error calling get-liga:", error);
    throw error;
  }
}

export async function roGetClub(id: number) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: "ff-views",
      functionName: "club-detalle",
      functionArgs: [uintCV(id)],
      network,
      senderAddress: SENDER_ADDRESS,
    });
    return result;
  } catch (error) {
    console.error("Error calling get-club:", error);
    throw error;
  }
}

export async function roGetJugador(principal: string) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: "ff-views",
      functionName: "jugador-detalle",
      functionArgs: [standardPrincipalCV(principal)],
      network,
      senderAddress: SENDER_ADDRESS,
    });
    return result;
  } catch (error) {
    console.error("Error calling get-jugador:", error);
    throw error;
  }
}

export async function roGetJuego(id: number) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: "ff-views",
      functionName: "juego-detalle",
      functionArgs: [uintCV(id)],
      network,
      senderAddress: SENDER_ADDRESS,
    });
    return result;
  } catch (error) {
    console.error("Error calling get-juego:", error);
    throw error;
  }
}

export async function roGetAlineacion(gameId: number, principal: string) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: "ff-views",
      functionName: "alineacion-detalle",
      functionArgs: [uintCV(gameId), standardPrincipalCV(principal)],
      network,
      senderAddress: SENDER_ADDRESS,
    });
    return result;
  } catch (error) {
    console.error("Error calling get-alineacion:", error);
    throw error;
  }
}

export async function roGetEvento(gameId: number, index: number) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: "ff-views",
      functionName: "evento-detalle",
      functionArgs: [uintCV(gameId), uintCV(index)],
      network,
      senderAddress: SENDER_ADDRESS,
    });
    return result;
  } catch (error) {
    console.error("Error calling get-evento:", error);
    throw error;
  }
}

export async function roGetEventoContador(gameId: number, tipo: string) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: "ff-views",
      functionName: "evento-contador",
      functionArgs: [uintCV(gameId), stringUtf8CV(tipo)],
      network,
      senderAddress: SENDER_ADDRESS,
    });
    return result;
  } catch (error) {
    console.error("Error calling evento-contador:", error);
    throw error;
  }
}

export async function roGetAttestResumen(entity: string, id: number) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: "ff-views",
      functionName: "attest-resumen",
      functionArgs: [stringUtf8CV(entity), uintCV(id)],
      network,
      senderAddress: SENDER_ADDRESS,
    });
    return result;
  } catch (error) {
    console.error("Error calling attest-resumen:", error);
    throw error;
  }
}

export async function roGetVerificacionJuego(id: number) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: "ff-views",
      functionName: "verificacion-juego",
      functionArgs: [uintCV(id)],
      network,
      senderAddress: SENDER_ADDRESS,
    });
    return result;
  } catch (error) {
    console.error("Error calling verificacion-juego:", error);
    throw error;
  }
}

export async function roTieneRol(who: string, role: number) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: "ff-views",
      functionName: "tiene-rol",
      functionArgs: [standardPrincipalCV(who), uintCV(role)],
      network,
      senderAddress: SENDER_ADDRESS,
    });
    return result;
  } catch (error) {
    console.error("Error calling tiene-rol:", error);
    throw error;
  }
}
