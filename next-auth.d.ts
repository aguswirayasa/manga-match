import NextAuth from "next-auth";

// Extend the default user type
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the user ID here
      email: string;
      username: string; // Include any other properties you have
      avatar: string;
      bio: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // Add the user ID here
    username: string; // Include any other properties you have
  }
}
