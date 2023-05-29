import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch("http://sommer.vin:8000/");
  const rawJs = await response.text();

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(rawJs);
  res.end();
}
