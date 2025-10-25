import { StacksTestnet } from "@stacks/network";
export const network = new StacksTestnet();

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
export const CONTRACT_NAME = "handicap-futbol";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "FuturoFutbol Handicap";
export const APP_URL  = process.env.NEXT_PUBLIC_APP_URL  || "http://localhost:3000";
