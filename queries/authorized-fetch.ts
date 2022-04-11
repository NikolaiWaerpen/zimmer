export default function authorizedFetch(url: string) {
  const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;

  if (!OPENSEA_API_KEY) throw new Error("missing OpenSea API key");

  return fetch(`https://api.opensea.io/api/v1${url}`, {
    headers: {
      "X-API-KEY": OPENSEA_API_KEY,
    },
  });
}
