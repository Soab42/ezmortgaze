import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

// This explicitly invokes the NextAuth edge-compatible middleware
// configured with our strictly-enforced `authorized` callback
export default NextAuth(authConfig).auth

export const config = {
  matcher: [
    /*
     * Match all request paths for the admin domain.
     * We exclude `/admin/login` specifically or it would redirect loop, 
     * but wait, NextAuth inherently ignores paths listed in `pages.signIn`!
     */
    "/api/admin/:path*",
    "/admin/dashboard/:path*",
  ],
}
