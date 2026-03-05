
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { deleteCookie } from "@/services/auth/tokenHandlers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const host = (await headers()).get("host") || "";
  const isProduction = process.env.NODE_ENV === "production";
  const rootDomain = isProduction ? "obeopms.com" : "localhost";
  const hostname = host.split(":")[0];

  try {
    await serverFetch.post("/auth/logout");
  } catch (error) {
    console.error("Logout request failed:", error);
  } finally {
    // 1. Clear host‑only cookies (no domain)
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");

    // 2. Clear domain‑scoped cookies
    const domains = isProduction 
      ? [`.${rootDomain}`, `admin.${rootDomain}`, `hotel.${rootDomain}`]
      : ["localhost", "admin.localhost", "hotel.localhost"];

    for (const domain of domains) {
      await deleteCookie("accessToken", { domain });
      await deleteCookie("refreshToken", { domain });
    }

    const { revalidateTag } = await import("next/cache");
    (revalidateTag as any)("user", "max");
    console.log(`[Logout] Robust cookie deletion completed for ${hostname}`);
  }

  // Redirect based on subdomain
  if (hostname === `admin.${rootDomain}` || hostname.startsWith("admin.")) {
    redirect("/admin/login");
  } else {
    redirect("/login");
  }

}