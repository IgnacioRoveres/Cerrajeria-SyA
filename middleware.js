import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Si no está logueado, lo mandamos acá
  },
});

export const config = { 
  matcher: ["/admin/:path*"] // Protegemos todo lo que empiece con /admin
};