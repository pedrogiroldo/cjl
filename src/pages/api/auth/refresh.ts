import { NextApiRequest, NextApiResponse } from "next";
import { serialize, parse } from "cookie";
import { decrypt, encrypt } from "@/lib/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const sessionCookie = cookies.session;

  if (!sessionCookie) {
    return res.status(401).json({ message: "No session cookie found" });
  }

  let sessionData;
  try {
    sessionData = await decrypt(sessionCookie);
    if (sessionData === undefined)
      return res.status(401).json({ message: "Invalid session" });
    // eslint-disable-next-line
  } catch (e) {
    return res.status(401).json({ message: "Invalid session" });
  }

  // Atualiza a data de expiração
  const newSessionData = {
    sub: sessionData.sub as string,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // Two weeks
  };

  if (
    newSessionData.sub === undefined ||
    newSessionData.expiresAt === undefined
  )
    return res.status(401).json({ message: "Invalid session" });

  const encryptedSessionData = await encrypt(newSessionData);

  const cookie = serialize("session", encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7 * 2, // Two weeks
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
  return res.status(200).json({ message: "Session refreshed!" });
}
