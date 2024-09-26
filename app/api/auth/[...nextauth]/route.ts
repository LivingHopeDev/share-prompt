import NextAuth, { NextAuthOptions, Session, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

// Extend the default session object to include a user ID
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface Profile {
    picture?: string; // Add 'picture' property
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // Custom session callback to include user ID in the session object
    async session({ session }: { session: Session }) {
      if (session.user?.email) {
        // Find the user in the database based on their email
        const sessionUser = await User.findOne({ email: session.user.email });

        if (sessionUser) {
          // Attach the user ID to the session object
          session.user.id = sessionUser._id.toString();
        }
      }
      return session; // Return the modified session
    },

    // Custom signIn callback to handle user creation or validation
    async signIn({ profile }: { profile?: Profile }) {
      try {
        // Connect to the database
        await connectToDB();

        if (profile) {
          // Check if the user already exists
          const userExist = await User.findOne({ email: profile.email });

          // If user does not exist, create a new user
          if (!userExist) {
            await User.create({
              email: profile.email!,
              username: profile.name?.replace(" ", "").toLowerCase(),
              image: profile?.picture,
            });
          }
        }

        return true; // Allow the sign-in
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Deny the sign-in in case of error
      }
    },
  },
};

// Export NextAuth with the configured options
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
