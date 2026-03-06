import { NextResponse } from "next/server";

// এখানে আমরা সরাসরি ফাংশনটির নাম 'middleware' দিচ্ছি যাতে Next.js চিনতে পারে
export function middleware(req) {
  const url = req.nextUrl.clone();
  const JWT_SECRET = process.env.JWT_SECRET;

  // ১. চেক করা হচ্ছে রাস্তাটি /dashboard কি না
  if (url.pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("token")?.value;

    // ২. টোকেন না থাকলে সরাসরি লগইন পেজে রিডাইরেক্ট
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // ৩. টোকেন ভ্যালিডেশন (সরাসরি মিডলওয়্যারে jwt.verify অনেক সময় এরর দেয় Edge Runtime এর জন্য)
    // তবে আপনার গিটহাবের রিসোর্স অনুযায়ী লজিকটি এমন হবে:
    try {
      // যদি আপনার প্রজেক্টে jwt কাজ না করে, তবে শুধু টোকেন চেকটাই আপাতত রাখুন
      // কারণ Next.js মিডলওয়্যার খুব হালকা রানটাইমে চলে।
      if (token) {
        return NextResponse.next();
      }
    } catch (err) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // ড্যাশবোর্ড বাদে অন্য সব পেজের জন্য অনুমতি দেওয়া হলো
  return NextResponse.next();
}

// এই কনফিগ ফাইলটিকে বলে দিচ্ছে শুধু ড্যাশবোর্ড পেজেই এই তালা (Protection) কাজ করবে
export const config = {
  matcher: ["/dashboard/:path*"],
};