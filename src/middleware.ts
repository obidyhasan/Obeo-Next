/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import {
  getDefaultDashboardRoute,
  getRoleFromToken,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth-utils";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0];
  const port = host.split(":")[1] || (url.protocol === "https:" ? "" : "3000");

  const isProduction = process.env.NODE_ENV === "production";
  const rootDomain = isProduction ? "obeopms.com" : "localhost";
  const protocol = url.protocol || "http:";

  // NORMALIZE PATH
  const pathname = url.pathname;
  const isAuth = isAuthRoute(pathname);

  const now = new Date().toISOString();
  const isInternal =
    req.headers.has("x-middleware-rewrite") ||
    req.headers.has("x-middleware-next");

  // IGNORE INTERNAL ASSETS
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("favicon.ico") ||
    pathname.includes("api")
  ) {
    return NextResponse.next();
  }

  console.log(
    `[Middleware][${now}] ${req.method} ${host}${pathname} (Auth: ${!!req.cookies.get("accessToken")}) ${isInternal ? "[INTERNAL]" : ""}`,
  );

  //  CONTEXT DETECTION
  const parts = hostname.split(".");
  let subdomain = "";

  if (isProduction) {
    if (parts.length > 2) subdomain = parts.slice(0, -2).join(".");
  } else {
    if (parts.length >= 2 && parts[parts.length - 1] === "localhost") {
      subdomain = parts.slice(0, -1).join(".");
    }
  }

  const isHotelSubdomain =
    subdomain && !["www", "admin", "localhost"].includes(subdomain);
  const isAdminSubdomain = hostname === `admin.${rootDomain}`;

  // AUTH GUARD
  const accessToken = req.cookies.get("accessToken")?.value || null;

  // Allow unauthenticated access to the subdomain login page
  const isSubdomainLoginPage = isHotelSubdomain && pathname === "/login";

  if (isHotelSubdomain && !accessToken && !isAuth && !isSubdomainLoginPage) {
    // Unauthenticated user on a protected subdomain route -> redirect to subdomain login
    const subdomainHost = isProduction
      ? `${subdomain}.${rootDomain}`
      : `${subdomain}.localhost${port ? `:${port}` : ""}`;
    const subdomainLogin = `${protocol}//${subdomainHost}/login`;
    console.log(
      `[Middleware][${now}] !!! PROTECTED SUBDOMAIN ACCESS -> FORCING SUBDOMAIN LOGIN: ${subdomainLogin}`,
    );
    return NextResponse.redirect(new URL(subdomainLogin), { status: 302 });
  }

  // Admin subdomain guard: unauthenticated access to any non-auth route -> /admin/login
  if (isAdminSubdomain && !accessToken && !isAuth) {
    const adminLogin = `${protocol}//admin.${rootDomain}${port ? `:${port}` : ""}/admin/login`;
    console.log(
      `[Middleware][${now}] !!! UNAUTHED ADMIN ACCESS -> FORCING ADMIN LOGIN: ${adminLogin}`,
    );
    return NextResponse.redirect(new URL(adminLogin), { status: 302 });
  }

  //  REST OF THE LOGIC
  const routeOwner = getRouteOwner(pathname);
  const effectiveRole: UserRole =
    isAdminSubdomain || pathname.startsWith("/admin") ? "ADMIN" : "HOTEL";

  // Logged-in hotel user on /login or /  -> redirect to /dashboard
  if (
    isHotelSubdomain &&
    accessToken &&
    (pathname === "/login" || pathname === "/")
  ) {
    console.log(
      `[Middleware][${now}] Logged-in hotel user on ${pathname} -> /dashboard`,
    );
    return NextResponse.redirect(`${protocol}//${host}/dashboard`);
  }

  if (accessToken && isAuth) {
    const dashboard =
      effectiveRole === "HOTEL"
        ? "/dashboard"
        : getDefaultDashboardRoute(effectiveRole);
    let targetHost = host;
    if (effectiveRole === "ADMIN" && !isAdminSubdomain)
      targetHost = `admin.${rootDomain}${port ? `:${port}` : ""}`;
    return NextResponse.redirect(`${protocol}//${targetHost}${dashboard}`);
  }

  // Admin login must be on admin subdomain
  if (pathname === "/admin/login" && !isAdminSubdomain) {
    return NextResponse.redirect(
      `${protocol}//admin.${rootDomain}${port ? `:${port}` : ""}/admin/login`,
    );
  }

  if (accessToken) {
    try {
      const decoded = jose.decodeJwt(accessToken);
      const userRole = getRoleFromToken(decoded);

      // Domain Mismatch checks
      if (userRole === "ADMIN" && !isAdminSubdomain) {
        return NextResponse.redirect(
          `${protocol}//admin.${rootDomain}${port ? `:${port}` : ""}/admin/dashboard`,
        );
      }
      if (userRole === "HOTEL" && !isHotelSubdomain) {
        const tokenSubdomain = (decoded as any).subdomain;
        if (tokenSubdomain) {
          const hotelHost = isProduction
            ? `${tokenSubdomain}.${rootDomain}`
            : `${tokenSubdomain}.localhost${port ? `:${port}` : ""}`;
          return NextResponse.redirect(`${protocol}//${hotelHost}/dashboard`);
        }
      }
    } catch (e) {
      // Token invalid -> Redirect handled by the guard above if no token
    }
  }

  //  SUBDOMAIN REWRITES
  const path = `${url.pathname}${url.searchParams.toString().length > 0 ? `?${url.searchParams.toString()}` : ""}`;

  if (isAdminSubdomain) {
    if (pathname.startsWith("/admin")) return NextResponse.next();
    return NextResponse.rewrite(new URL(`/admin${path}`, req.url));
  }

  if (isHotelSubdomain) {
    if (pathname.startsWith(`/${subdomain}`)) return NextResponse.next();
    return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|\\.well-known).*)",
  ],
};
