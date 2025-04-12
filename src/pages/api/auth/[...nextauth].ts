import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with your own authentication logic
        if (credentials?.username === "admin" && credentials?.password === "password") {
          return { id: 1, name: "Admin" };
        }
        return null;
      },
    }),
  ],
});
