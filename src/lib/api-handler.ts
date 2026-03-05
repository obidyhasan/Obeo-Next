/* eslint-disable @typescript-eslint/no-explicit-any */


export async function handleApi<T>(
  apiCall: () => Promise<Response>,
  options: {
    onSuccess?: (data: T) => void | Promise<void>;
    revalidateTags?: string[];
    revalidatePaths?: string[];
  } = {},
) {
  try {
    const response = await apiCall();
    
    const contentType = response.headers.get("content-type");
    let result: any;
    
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();
      return {
        success: false,
        message: `Invalid API response Format: ${text.slice(0, 100)}...`,
      };
    }

    if (result.success || response.ok) {
      if (options.onSuccess) {
        await options.onSuccess(result.data || result);
      }

      if (options.revalidateTags || options.revalidatePaths) {
        const { revalidateTag, revalidatePath } = await import("next/cache");
        options.revalidateTags?.forEach((tag) => (revalidateTag as any)(tag, "max"));
        options.revalidatePaths?.forEach((path) =>
          revalidatePath(path, "page"),
        );
      }


      return {
        success: true,
        data: (result.data || result) as T,
        message: result.message || "Operation successful",
      };
    }

    return {
      success: false,
      message: result.message || "Operation failed",
    };

  } catch (error: any) {
    console.error("[API Error]:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "An unexpected error occurred. Please try again.",
    };
  }
}
