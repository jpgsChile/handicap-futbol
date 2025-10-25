import { callReadOnlyFunction } from "@stacks/transactions";
import { network, CONTRACT_ADDRESS, CONTRACT_NAME } from "./stacks";
import { uintCV, standardPrincipalCV } from "@stacks/transactions";

export async function roGetLiga(id: number) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "get-liga",
      functionArgs: [uintCV(id)],
      network,
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
      contractName: CONTRACT_NAME,
      functionName: "get-club",
      functionArgs: [uintCV(id)],
      network,
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
      contractName: CONTRACT_NAME,
      functionName: "get-jugador",
      functionArgs: [standardPrincipalCV(principal)],
      network,
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
      contractName: CONTRACT_NAME,
      functionName: "get-juego",
      functionArgs: [uintCV(id)],
      network,
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
      contractName: CONTRACT_NAME,
      functionName: "get-alineacion",
      functionArgs: [uintCV(gameId), standardPrincipalCV(principal)],
      network,
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
      contractName: CONTRACT_NAME,
      functionName: "get-evento",
      functionArgs: [uintCV(gameId), uintCV(index)],
      network,
    });
    return result;
  } catch (error) {
    console.error("Error calling get-evento:", error);
    throw error;
  }
}

export async function roTieneRol(who: string, role: number) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "tiene-rol",
      functionArgs: [standardPrincipalCV(who), uintCV(role)],
      network,
    });
    return result;
  } catch (error) {
    console.error("Error calling tiene-rol:", error);
    throw error;
  }
}
