import { dbConnect } from "@/lib/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        const db = await dbConnect();
        
        // ১. ডাটাবেজে ইউজার চেক
        const user = await db.collection("users").findOne({ email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        // ২. পাসওয়ার্ড চেক
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        // ৩. ইউজারের ডাটা রিটার্ন (ইমেজসহ যা টোকেনে যাবে)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image, // নিশ্চিত করুন ডাটাবেজে image কী (key) ব্যবহার করছেন
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // JWT টোকেনে ইউজারের ডাটা ইনজেক্ট করা
    async jwt({ token, user, trigger, session }) {
      // যখন প্রথমবার লগইন হয় তখন authorize() থেকে user ডাটা আসে
      if (user) {
        token.id = user.id;
        token.image = user.image; 
      }
      
      // প্রোফাইল আপডেট করলে যেন সাথে সাথে পরিবর্তন দেখা যায়
      if (trigger === "update" && session?.image) {
        token.image = session.image;
      }
      
      return token;
    },
    
    // ফ্রন্টএন্ডের useSession() হুক এই ডাটা রিসিভ করে
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.image = token.image; // টোকেন থেকে সেশনে পাস
      }
      return session;
    },

    // গুগল দিয়ে লগইন করলে ডাটাবেজে সেভ করার লজিক
async signIn({ user, account }) {
  if (account.provider === "google") {
    try {
      const db = await dbConnect();
      const existingUser = await db.collection("users").findOne({ email: user.email });
      
      // যদি ইউজার ডাটাবেজে না থাকে, তবে নতুন করে সেভ হবে
      if (!existingUser) {
        await db.collection("users").insertOne({
          name: user.name,   // গুগলের দেওয়া নাম
          email: user.email, // গুগলের দেওয়া ইমেইল
          image: user.image, // গুগলের দেওয়া প্রোফাইল ছবি
          role: "user",
          provider: "google",
          createdAt: new Date()
        });
      } else {
        // যদি ইউজার আগে থেকেই থাকে কিন্তু নাম/ছবি না থাকে, তবে আপডেট করে দিন
        await db.collection("users").updateOne(
          { email: user.email },
          { 
            $set: { 
              name: existingUser.name || user.name, 
              image: existingUser.image || user.image 
            } 
          }
        );
      }
      return true;
    } catch (error) {
      console.error("Error saving Google user:", error);
      return false;
    }
  }
  return true; // Credentials লগইনের জন্য
}
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // ৩০ দিন
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };