import { StacksTestnet, StacksDevnet } from "@stacks/network";

// Configuración de red - cambiar según el modo
export const isDevMode = process.env.NODE_ENV === 'development';
export const network = isDevMode ? new StacksDevnet() : new StacksTestnet();

// Para pruebas con wallet Leather, usar testnet
export const testnetNetwork = new StacksTestnet();

// Permitir que NEXT_PUBLIC_CONTRACT_ADDRESS sea:
// - solo address: ST... (recomendado)
// - o contractId: ST....handicap-futbol (lo parseamos)
const RAW_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
let parsedAddress = RAW_CONTRACT_ADDRESS;
let parsedName: string | null = null;
if (RAW_CONTRACT_ADDRESS.includes('.')) {
  const [addr, name] = RAW_CONTRACT_ADDRESS.split('.', 2);
  parsedAddress = addr;
  parsedName = name || null;
}

export const CONTRACT_ADDRESS = parsedAddress;
export const CONTRACT_NAME = parsedName || "handicap-futbol";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "FuturoFutbol Handicap";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const APP_ICON = `${APP_URL}/images/futurofutbol_logo.jpeg`;

// Wallet de prueba Leather
export const TEST_WALLET_ADDRESS = "ST3M85VSB6P5BW6FW1CHNKPYPR5S2A8SFQYZSB94Q";

// Nombres de contratos modulares (permite override por env)
export const CN_ROLES = process.env.NEXT_PUBLIC_CN_ROLES || "ff-roles";
export const CN_LEAGUE = process.env.NEXT_PUBLIC_CN_LEAGUE || "ff-league";
export const CN_CLUB = process.env.NEXT_PUBLIC_CN_CLUB || "ff-club";
export const CN_PLAYER = process.env.NEXT_PUBLIC_CN_PLAYER || "ff-player";
export const CN_GAME = process.env.NEXT_PUBLIC_CN_GAME || "ff-game";
export const CN_LINEUP = process.env.NEXT_PUBLIC_CN_LINEUP || "ff-lineup";
export const CN_EVENT = process.env.NEXT_PUBLIC_CN_EVENT || "ff-event";
export const CN_ATTEST = process.env.NEXT_PUBLIC_CN_ATTEST || "ff-attest";
export const CN_VIEWS = process.env.NEXT_PUBLIC_CN_VIEWS || "ff-views";

// Umbrales de verificación (para UI)
export const VERIFY_MIN_SUM = Number(process.env.NEXT_PUBLIC_VERIFY_MIN_SUM || 10);
export const VERIFY_MIN_COUNT = Number(process.env.NEXT_PUBLIC_VERIFY_MIN_COUNT || 3);

// Direcciones de contratos en Testnet (si están desplegados)
export const TN_ADDR_LEAGUE = process.env.NEXT_PUBLIC_TN_ADDR_FF_LEAGUE || null;
export const TN_ADDR_CLUB = process.env.NEXT_PUBLIC_TN_ADDR_FF_CLUB || null;
export const TN_ADDR_PLAYER = process.env.NEXT_PUBLIC_TN_ADDR_FF_PLAYER || null;
export const TN_ADDR_GAME = process.env.NEXT_PUBLIC_TN_ADDR_FF_GAME || null;
export const TN_ADDR_LINEUP = process.env.NEXT_PUBLIC_TN_ADDR_FF_LINEUP || null;
export const TN_ADDR_EVENT = process.env.NEXT_PUBLIC_TN_ADDR_FF_EVENT || null;
export const TN_ADDR_ROLES = process.env.NEXT_PUBLIC_TN_ADDR_FF_ROLES || null;
export const TN_ADDR_ATTEST = process.env.NEXT_PUBLIC_TN_ADDR_FF_ATTEST || null;
export const TN_ADDR_VIEWS = process.env.NEXT_PUBLIC_TN_ADDR_FF_VIEWS || null;

export function getTestnetContract(contractName: string): { address: string, name: string } | null {
  const name = contractName;
  switch (contractName) {
    case CN_LEAGUE: return TN_ADDR_LEAGUE ? { address: TN_ADDR_LEAGUE, name } : null;
    case CN_CLUB: return TN_ADDR_CLUB ? { address: TN_ADDR_CLUB, name } : null;
    case CN_PLAYER: return TN_ADDR_PLAYER ? { address: TN_ADDR_PLAYER, name } : null;
    case CN_GAME: return TN_ADDR_GAME ? { address: TN_ADDR_GAME, name } : null;
    case CN_LINEUP: return TN_ADDR_LINEUP ? { address: TN_ADDR_LINEUP, name } : null;
    case CN_EVENT: return TN_ADDR_EVENT ? { address: TN_ADDR_EVENT, name } : null;
    case CN_ROLES: return TN_ADDR_ROLES ? { address: TN_ADDR_ROLES, name } : null;
    case CN_ATTEST: return TN_ADDR_ATTEST ? { address: TN_ADDR_ATTEST, name } : null;
    case CN_VIEWS: return TN_ADDR_VIEWS ? { address: TN_ADDR_VIEWS, name } : null;
    default:
      // También permitir CONTRACT_NAME monolítico
      if (name === CONTRACT_NAME) return { address: CONTRACT_ADDRESS, name };
      return null;
  }
}
