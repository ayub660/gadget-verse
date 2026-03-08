import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  /**
   * 
   * Dashboar  er vitoer card protected
   */
  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
  }

  /**
   * ২. Authenticated users check:
   */
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/login", 
    "/register"
   ],
};