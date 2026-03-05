"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies, headers } from "next/headers";

export const setCookie = async (
  key: string,
  value: string,
  options: Partial<ResponseCookie> & { domain?: string },
) => {
  const cookieStore = await cookies();
  
  const cookieOptions: any = {
    ...options,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  };

  if (options.domain) {
    cookieOptions.domain = options.domain;
  }

  console.log(
    `[setCookie] Setting ${key} (Domain: ${options.domain || "Host-Only"})`,
  );

  try {
    await cookieStore.set(key, value, cookieOptions);
  } catch (error) {
    console.error(`[setCookie] Error setting ${key}:`, error);
  }
};

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();
  return (await cookieStore).get(key)?.value || null;
};

export const deleteCookie = async (
  key: string,
  options?: { domain?: string },
) => {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  console.log(
    `[deleteCookie] Deleting ${key} (Domain: ${options?.domain || "Host-Only"})`,
  );

  try {
    const commonOptions: any = {
      path: "/",
      sameSite: "lax",
      secure: isProduction,
      httpOnly: true,
      ...(options?.domain ? { domain: options.domain } : {}),
    };

    // 1. Use the built-in delete method
    (await cookieStore).delete({
      name: key,
      ...commonOptions,
    });

    // 2. Fallback: Set to expired with same options
    (await cookieStore).set(key, "", {
      ...commonOptions,
      expires: new Date(0),
      maxAge: -1,
    });

  } catch (error) {
    console.error(`[deleteCookie] Error deleting ${key}:`, error);
  }
};
