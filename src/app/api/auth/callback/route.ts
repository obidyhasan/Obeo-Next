import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const redirect = searchParams.get("redirect") || "/dashboard";

  const host = req.headers.get("host") || "localhost:3000";
  const protocol =
    req.nextUrl.protocol || (req.url.startsWith("https") ? "https:" : "http:");

  if (!accessToken) {
    return NextResponse.json(
      { success: false, error: "Missing token" },
      { status: 400 },
    );
  }
  const absoluteRedirectUrl = `${protocol}//${host}${redirect.startsWith("/") ? "" : "/"}${redirect}`;
  const response = NextResponse.redirect(absoluteRedirectUrl);
  const isProduction = process.env.NODE_ENV === "production";

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
    secure: isProduction,
    ...(isProduction ? { domain: ".obeopms.com" } : {}),
  });

  if (refreshToken) {
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secure: isProduction,
      ...(isProduction ? { domain: ".obeopms.com" } : {}),
    });
  }


  return response;
}
