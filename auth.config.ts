import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [], // Providers (e.g., Credentials with DB) are injected in auth.ts (Node Runtime)
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      if (trigger === "update" && session) {
         token.role = session.user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith('/admin/dashboard') || nextUrl.pathname.startsWith('/api/admin')
      
      if (isAdminRoute) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }
      return true
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
} satisfies NextAuthConfig
