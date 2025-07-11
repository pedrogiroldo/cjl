import { UserLoginDto } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import UserService from "@/lib/services/user-service";
import { encrypt } from "@/lib/session";

interface LoginRequest extends NextApiRequest {
  body: UserLoginDto;
}
export default async function handler(req: LoginRequest, res: NextApiResponse) {
  const userService = new UserService();
  const user = await userService.findUserByEmail(req.body.email);

  if (!user) return res.status(401).json({ message: "Wrong credentials!" });

  const encryptedSessionData = await encrypt({
    sub: user.id,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
  });

  const cookie = serialize("session", encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7 * 2, // Two weeks
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
  return res.status(200).json({ message: "Successfully set cookie!" });
}
