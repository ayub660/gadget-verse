import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // যদি লগইন না থাকে এবং ড্যাশবোর্ডে যাওয়ার চেষ্টা করে, তবে লগইনে পাঠাবে
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // যদি লগইন থাকে এবং লগইন/রেজিস্টার পেজে যাওয়ার চেষ্টা করে, তবে হোমে পাঠাবে
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};