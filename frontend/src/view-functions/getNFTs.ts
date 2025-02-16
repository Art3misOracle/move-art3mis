import {
  APTOS_COLLECTION_ADDRESS,
  NETWORK,
  MOVEMENT_GRAPHQL_ADDRESS,
  GPT_API_KEY,
  MODULE_ADDRESS,
} from "@/constants";
import axios from "axios";

export const getNFTs = async (address: string): Promise<any> => {
  try {
    const query = `
      query myQuery {
        current_token_ownerships_v2(
          where: {owner_address: {
          _eq: "${address}"
          }, amount: {_gt: "0"}}
      ) {
        current_token_data {
          collection_id
          token_properties
          token_uri
        }
        owner_address
        }
      }
    `;

    const response = await axios.post(
      MOVEMENT_GRAPHQL_ADDRESS,
      {
        query,
        operationName: "myQuery",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("test", response);

    if (response && response.data) {
      return response?.data.data.current_token_ownerships_v2.filter(
        (i) => i.current_token_data.collection_id === APTOS_COLLECTION_ADDRESS
      );
    } else {
      throw new Error("No nft data found");
    }
  } catch (error) {
    console.error("Error fetching nft:", error);
    throw error;
  }
};
