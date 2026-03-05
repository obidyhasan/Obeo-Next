"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getUser() {
  try {
    const response = await serverFetch.get(`/auth/me`, {
      next: { tags: ["user"] },
    });
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}
