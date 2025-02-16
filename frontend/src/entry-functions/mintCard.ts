import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export type MintCardArguments = {
  question: string;
  reading: string;
  card: string;
  position: string;
};

export const mintCard = (args: MintCardArguments): InputTransactionData => {
  const { question, reading, card, position } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::tarot::mint_card`,
      functionArguments: [question, reading, card, position],
    },
  };
};
