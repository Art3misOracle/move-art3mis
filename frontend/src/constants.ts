import type { Network } from "@aptos-labs/wallet-adapter-react";

// @ts-ignore
export const NETWORK: Network =
  (process.env.NEXT_PUBLIC_APP_NETWORK as Network) ?? "testnet";
export const MODULE_ADDRESS = process.env.NEXT_PUBLIC_MODULE_ADDRESS;
export const APTOS_API_KEY = process.env.NEXT_PUBLIC_APTOS_API_KEY;
export const GPT_API_KEY = process.env.NEXT_GPT_API_KEY;
export const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
// export const APTOS_GRAPHQL_ADDRESS = `https://api.${NETWORK}.aptoslabs.com/v1/graphql`;
export const MOVEMENT_GRAPHQL_ADDRESS = `https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql`;
export const APTOS_COLLECTION_ADDRESS = `0x4388093d9f53631fa9d3fb0e39d907a00ba125d5451a0360673016919c939adc`;
