import { OPENSEA_API_URL } from "../consts";

export enum ENDPOINT {
  assets = "assets",
  events = "events",
  collection = "collection",
  "asset-contract" = "asset-contract",
}

export default async function openseaFetch(endpoint: ENDPOINT, params: string) {
  const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;

  if (!OPENSEA_API_KEY) throw new Error("missing OpenSea API key");

  const url = `${OPENSEA_API_URL}/${endpoint}?${params}`;

  const response = await fetch(url, {
    headers: {
      "x-api-key": OPENSEA_API_KEY,
    },
  });

  return response.json();
}
