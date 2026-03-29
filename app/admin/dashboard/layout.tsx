"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { LogOut, LayoutDashboard, FileText, Settings, Users, Tags, PenTool, MessageSquare, Inbox } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-amber-500 font-bold">Loading...</div>
  }

  if (!session) return null

  return (
    <div className="flex min-h-screen bg-[#020610]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 glass-panel p-6 flex flex-col hidden md:flex">
        <div className="text-xl font-black text-white mb-10 tracking-tighter">
          EZ<span className="text-amber-500">MORTGAZE</span>
        </div>
        
        <nav className="flex flex-col gap-2 p-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-bold group-hover:bg-amber-500/10">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </Link>
          <Link href="/admin/dashboard/articles" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-bold group-hover:bg-amber-500/10">
            <FileText className="w-5 h-5" />
            Articles
          </Link>
          <Link href="/admin/dashboard/authors" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-bold group-hover:bg-amber-500/10">
            <PenTool className="w-5 h-5" />
            Authors
          </Link>
          <Link href="/admin/dashboard/categories" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-bold group-hover:bg-amber-500/10">
            <Tags className="w-5 h-5" />
            Categories
          </Link>
          <Link href="/admin/dashboard/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-bold group-hover:bg-amber-500/10">
            <Users className="w-5 h-5" />
            Users
          </Link>
          <Link href="/admin/dashboard/comments" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-bold group-hover:bg-amber-500/10">
            <MessageSquare className="w-5 h-5" />
            Comments
          </Link>
          <Link href="/admin/dashboard/inquiries" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-bold group-hover:bg-amber-500/10">
            <Inbox className="w-5 h-5" />
            Inquiries
          </Link>
          <Link href="/admin/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-bold group-hover:bg-amber-500/10">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="border-t border-white/10 pt-6 mt-6">
          <div className="text-sm text-zinc-400 mb-4 px-4 font-medium">{session.user?.email}</div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="border-b border-white/10 p-6 flex items-center justify-between md:hidden">
          <div className="text-xl font-black text-white tracking-tighter">
            EZ<span className="text-amber-500">MORTGAZE</span>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="text-red-400 font-bold">
            <LogOut className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
