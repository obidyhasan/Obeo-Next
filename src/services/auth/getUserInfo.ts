"use server";

import { getCookie } from "./tokenHandlers";

export interface DecodedUser {
  userId: string;
  email: string;
  roles: string[];
  systemLevel: "SUPER" | "HOTEL" | string;
  name?: string;
}

function decodeJwtPayload(token: string): DecodedUser | null {
  try {
    const base64Payload = token.split(".")[1];
    if (!base64Payload) return null;
    const json = Buffer.from(
      base64Payload.replace(/-/g, "+").replace(/_/g, "/"),
      "base64",
    ).toString("utf-8");
    return JSON.parse(json) as DecodedUser;
  } catch {
    return null;
  }
}

export const getUserInfo = async (): Promise<DecodedUser | null> => {
  const accessToken = await getCookie("accessToken");
  if (!accessToken) return null;
  return decodeJwtPayload(accessToken);
};
