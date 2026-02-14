import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Usuario", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1. ESPÍAS PARA DEBUG (Mirar Logs de Vercel si falla)
        console.log("--- INTENTO DE LOGIN ---");
        console.log("Ingresado:", credentials?.email); 
        console.log("Esperado (Vercel):", process.env.ADMIN_USERNAME);

        // Validamos que lleguen datos
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Faltan usuario o contraseña");
          return null;
        }

        // 2. COMPARACIÓN (Usamos las variables de entorno)
        // Nota: credentials.email es lo que viene del input name="email"
        const isValidUser = 
          credentials.email === process.env.ADMIN_USERNAME &&
          credentials.password === process.env.ADMIN_PASSWORD;

        if (isValidUser) {
          console.log("✅ Acceso Concedido");
          return { id: "1", name: "Admin SyF", email: credentials.email };
        } else {
          console.log("⛔ Credenciales Incorrectas");
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Asegurate que tu página de login esté en esta ruta
  },
  secret: process.env.NEXTAUTH_SECRET, // Variable obligatoria en Vercel
});

export { handler as GET, handler as POST };