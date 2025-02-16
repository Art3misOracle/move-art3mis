import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "@/constants";

export const drawsCard = (): InputTransactionData => {
  return {
    data: {
      function: `${MODULE_ADDRESS}::tarot::draws_card`,
      functionArguments: [],
    },
  };
};
