import { NextApiRequest, NextApiResponse } from "next";
import { GeoCodeType } from "types/google/GeoCodeType";

const { GOOGLE_MAP_KEY } = process.env;

async function getAddress(latitude: string, longitude: string) {
  if (!GOOGLE_MAP_KEY) throw new Error("missing google maps key");

  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");

  url.searchParams.append("latlng", `${latitude},${longitude}`);
  url.searchParams.append("key", GOOGLE_MAP_KEY);

  const response = await fetch(url.href);

  console.log(response);

  const json: GeoCodeType = await response.json();

  return json.results[0].formatted_address;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { latlng } = request.query;

  if (!latlng) throw new Error("missing latlng");
  if (typeof latlng !== "string") throw new Error("latlng invalid type");

  const [latitude, longitude] = latlng.split(",");

  const address = await getAddress(latitude, longitude);

  response.status(200).json({ address });
}
