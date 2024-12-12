import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Fetch the token from the request using next-auth
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Define protected routes (add more as needed)
  const protectedRoutes = ["/friends", "/groups", "/account"];

  // Check if the requested path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Redirect to /login if the user is unauthenticated and accessing a protected route
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure the matcher to include all paths except public routes
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|login|api/auth).*)",
};
