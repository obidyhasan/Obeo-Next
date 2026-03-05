"use server";

import { serverFetch } from "@/lib/server-fetch";
import { handleApi } from "@/lib/api-handler";
import { setCookie } from "@/services/auth/tokenHandlers";

export async function adminLogin(userData: {
  email: string;
  password: string;
}) {
  return handleApi<any>(() => serverFetch.post(`/auth/login`, userData), {
    revalidateTags: ["user"],
    onSuccess: async (data: any) => {
      if (data?.accessToken) {
        // No longer setting cookies here. The AuthForm redirects to /api/auth/callback
        // where cookies are set once with the correct global/domain scope.
        // This prevents duplicate cookies (host-only vs domain-scoped).
      }
    },
  });
}

export async function hotelLogin(userData: {
  email: string;
  password: string;
}) {
  return handleApi<any>(() => serverFetch.post(`/auth/hotel-login`, userData));
}

