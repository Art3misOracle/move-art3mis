import { APTOS_API_KEY, NETWORK } from "@/constants";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({
  network: Network.TESTNET,
  fullnode: "https://aptos.testnet.porto.movementlabs.xyz/v1",
  faucet: "https://fund.testnet.porto.movementlabs.xyz/",
});
const aptos = new Aptos(config);

// Reuse same Aptos instance to utilize cookie based sticky routing
export function aptosClient() {
  return aptos;
}
