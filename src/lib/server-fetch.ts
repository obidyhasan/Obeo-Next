import { getCookie } from "@/services/auth/tokenHandlers";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit & { body?: any } = {},
): Promise<Response> => {
  const { headers = {}, body, ...restOptions } = options;

  const accessToken = await getCookie("accessToken");

  const isJsonBody =
    body && typeof body === "object" && !(body instanceof FormData);

  return await fetch(`${BACKEND_API_URL}${endpoint}`, {
    ...(restOptions.method === "GET" && { cache: "force-cache" }),
    headers: {
      ...(isJsonBody && { "Content-Type": "application/json" }),
      ...headers,
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
    },
    body: isJsonBody ? JSON.stringify(body) : body,
    ...restOptions,
  });
};

export const serverFetch = {
  get: (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: (endpoint: string, body?: any, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "POST", body }),

  patch: (endpoint: string, body?: any, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH", body }),

  put: (endpoint: string, body?: any, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "PUT", body }),

  delete: (endpoint: string, options: RequestInit = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
