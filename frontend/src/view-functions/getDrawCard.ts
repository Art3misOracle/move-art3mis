import { MODULE_ADDRESS } from "@/constants";
import { aptosClient } from "@/utils/aptosClient";

export const getDrawCard = async (): Promise<string> => {
  const content = await aptosClient()
    .view<[string]>({
      payload: {
        function: `${MODULE_ADDRESS}::tarot::draws_card`,
      },
    })
    .catch((error) => {
      console.error(error);
      return ["card not found"];
    });
  console.log("test", content);

  return content[0];
};
