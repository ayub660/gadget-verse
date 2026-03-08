import { dbConnect } from "@/lib/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

   
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) return null;

        const db = await dbConnect();
        const user = await db.collection("users").findOne({ email });

        if (!user || !user.password) return null;

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return null;

        return user;
      },
    }),
  ],
  
 
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
   
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const db = await dbConnect();
          const usersCollection = db.collection("users");

          const existingUser = await usersCollection.findOne({ email: user.email });

          if (!existingUser) {
            await usersCollection.insertOne({
              name: user.name,
              email: user.email,
              image: user.image,
              role: "user",
              createdAt: new Date(),
            });
          }
          return true;
        } catch (error) {
          console.error("Error saving google user:", error);
          return false;
        }
      }
      return true;
    },
    
   
    async session({ session, token }) {
      return session;
    },
  },
  pages: {
    signIn: "/login", 
  },
});

export { handler as GET, handler as POST };