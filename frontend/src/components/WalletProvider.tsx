"use client";

// Internal components
import { useToast } from "@/components/ui/use-toast";
// Internal constants
import { APTOS_API_KEY, NETWORK } from "@/constants";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import type { PropsWithChildren } from "react";
import { AptosConfig, Network } from "@aptos-labs/ts-sdk";

export function WalletProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();

  const config = new AptosConfig({
    network: Network.TESTNET,
    fullnode: "https://aptos.testnet.porto.movementlabs.xyz/v1",
    faucet: "https://fund.testnet.porto.movementlabs.xyz/",
  });

  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={config}
      // optInWallets={["Continue with Google","Petra","Nightly","Pontem Wallet", "Mizu Wallet"]}
      optInWallets={["Petra"]}
      onError={(error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Unknown wallet error",
        });
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
