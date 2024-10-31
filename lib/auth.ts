import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Adjust the import path as needed
import bcrypt from "bcrypt";

// Define the NextAuth options with types
const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if credentials are provided
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Check if user exists and password matches
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id + "",
            role: "user",
            email: user.email,
            name: user.username,
            image: "",
            username: user.username,
          }; // Return the user object if authentication is successful
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  pages: {
    signIn: "/sign-in", // Customize the sign-in page path
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store user ID in the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Attach user ID to the session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure you set this in your .env file
};

export default authOptions;
