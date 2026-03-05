export type UserRole = "ADMIN" | "HOTEL";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = ["/login", "/admin/login", "/api/auth/callback"];

export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};

export const userProtectedRoutes: RouteConfig = {
  patterns: [/^\/hotel/],
  exact: ["/dashboard", "/"],
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname);
};

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig,
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): "ADMIN" | "HOTEL" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathname, userProtectedRoutes)) {
    return "HOTEL";
  }

  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);
  if (routeOwner === null) {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};

export const getRoleFromToken = (decoded: any): UserRole | null => {
  if (!decoded) return null;

  // Hotel token structure
  if (decoded.role === "HOTEL") {
    return "HOTEL";
  }

  // Admin token structure (systemLevel: PMS or BOTH)
  if (
    decoded.userId &&
    (decoded.systemLevel === "PMS" || decoded.systemLevel === "BOTH")
  ) {
    return "ADMIN";
  }

  // If systemLevel is HOTEL but it's an admin user account
  if (decoded.userId && decoded.systemLevel === "HOTEL") {
    return "HOTEL";
  }

  return null;
};
