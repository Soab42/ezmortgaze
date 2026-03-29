"use client"

import { SessionProvider } from "next-auth/react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#020610] text-zinc-100 font-sans selection:bg-amber-500/30">
        {children}
      </div>
    </SessionProvider>
  )
}
