import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // CORRECCIÓN: Validamos primero que credentials no sea null o undefined
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const isValidUser = 
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD;

        if (isValidUser) {
          return { id: "1", name: "Ignacio Admin", email: credentials.email };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Tu página personalizada
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };