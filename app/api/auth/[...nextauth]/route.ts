import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,

  callbacks: {
    async session({ session, token }) {
      console.log(session);
      // Add additional session information if needed
      return session;
    },
    // async signOut() {
    //   // Additional logic on sign out if needed
    //   console.log("User signed out");
    // },
  },
});

export { handler as GET, handler as POST };
