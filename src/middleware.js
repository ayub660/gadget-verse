import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  /**
   * ১. Public routes check: যদি ইউজার লগইন না থাকে
   * এবং প্রটেক্টেড পেজে (Dashboard বা All Products) যাওয়ার চেষ্টা করে।
   */
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/products");

  if (!token && isProtectedRoute) {
    // লগইন পেজে পাঠানোর সময় 'callbackUrl' যোগ করা হয়েছে যাতে লগইন করার পর সরাসরি ঐ পেজেই ফিরে আসে
    return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
  }

  /**
   * ২. Authenticated users check: যদি ইউজার লগইন থাকে
   * এবং লগইন বা রেজিস্টার পেজে যেতে চায়, তবে হোমে পাঠিয়ে দাও।
   */
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

/**
 * Matcher configuration
 * এখানে '/products/:path*' যোগ করা হয়েছে যাতে অল প্রোডাক্ট এবং ডিটেইলস পেজও সিকিউর থাকে।
 */
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/products/:path*", 
    "/login", 
    "/register"
  ],
};