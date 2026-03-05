/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { handleApi } from "@/lib/api-handler";

export async function getHotels(page = 1, limit = 10) {
  return handleApi(() =>
    serverFetch.get(`/hotel?page=${page}&limit=${limit}`, {
      next: { tags: ["hotels"] },
    }),
  );
}

export async function getHotelById(id: string) {
  return handleApi(() =>
    serverFetch.get(`/hotel/${id}`, {
      next: { tags: ["hotels", id] },
    }),
  );
}

export async function createHotel(payload: any) {
  return handleApi(() => serverFetch.post("/hotel", payload), {
    revalidatePaths: ["/admin/hotels"],
    revalidateTags: ["hotels"],
  });
}

export async function updateHotel(id: string, payload: any) {
  return handleApi(() => serverFetch.patch(`/hotel/${id}`, payload), {
    revalidatePaths: ["/admin/hotels"],
    revalidateTags: ["hotels", id],
  });
}

export async function deleteHotel(id: string) {
  return handleApi(() => serverFetch.delete(`/hotel/${id}`), {
    revalidatePaths: ["/admin/hotels"],
    revalidateTags: ["hotels", id],
  });
}
