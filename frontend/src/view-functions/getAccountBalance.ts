import { aptosClient } from "@/utils/aptosClient";

export type AccountAPTBalanceArguments = {
  accountAddress: string | undefined;
};

export const getAccountAPTBalance = async (
  args: AccountAPTBalanceArguments
): Promise<number> => {
  const { accountAddress } = args;
  const balance = await aptosClient().view<[number]>({
    payload: {
      function: "0x1::coin::balance",
      typeArguments: ["0x1::aptos_coin::AptosCoin"],
      functionArguments: [accountAddress],
    },
  });
  return balance[0] ? Math.floor((balance[0] / 100_000_000) * 1000) / 1000 : 0;
};
