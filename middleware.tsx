import { NextResponse } from "next/server";
import {
  withMiddlewareAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { NextFetchEvent, NextRequest } from "next/server";

export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const res = NextResponse.next();
  const session = await getSession(req, res);
  const pathname = req.nextUrl.pathname;

  // Public routes that don't require authentication
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.includes("/images/") ||
    pathname.includes(".") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)", "/"],
};
