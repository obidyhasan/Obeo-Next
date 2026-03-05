
"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies, headers } from "next/headers";

export const setCookie = async (
  key: string,
  value: string,
  options: Partial<ResponseCookie> & { domain?: string },
) => {
  const cookieStore = await cookies();
  const host = (await headers()).get("host") || "";
  const hostname = host.split(":")[0];

  const cookieOptions: any = {
    ...options,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };

  if (options.domain) {
    cookieOptions.domain = options.domain;
  }

  console.log(
    `[setCookie] Setting ${key} (Host-Only: ${!options.domain}, Domain: ${options.domain})`,
  );

  try {
    await cookieStore.set(key, value, cookieOptions);
  } catch (error) {
    console.error(`[setCookie] Error setting ${key}:`, error);
  }

};

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value || null;
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

    console.log(`[deleteCookie] Clearing ${key} with options:`, commonOptions);

    // Try both delete and setting expired to be extremely thorough
    cookieStore.delete({
      name: key,
      ...commonOptions,
    });

    // Manually setting to expired as a fallback
    cookieStore.set(key, "", {
      ...commonOptions,
      expires: new Date(0),
      maxAge: -1,
    });

  } catch (error) {
    console.error(`[deleteCookie] Error deleting ${key}:`, error);
  }

};
