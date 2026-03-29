"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Plus, 
  FileText, 
  MessageSquare, 
  Inbox, 
  TrendingUp, 
  Loader2, 
  ArrowRight,
  Clock,
  User,
  Tags,
  PenTool,
  ShieldAlert
} from "lucide-react"

type Activity = {
  id: string
  type: 'post' | 'comment' | 'inquiry' | 'category' | 'author' | 'user'
  action: string
  user: string
  target: string
  date: string
}

type Stat = {
  label: string
  value: number | undefined
  icon: any
  color: string
  href: string
}

export default function OverviewDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats")
      if (res.ok) {
        const data = await res.json()
        setStats(data.counts)
        setActivities(data.activity)
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSyncLogs = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/migrate-logs", { method: "POST" })
      if (res.ok) {
        await fetchStats()
      }
    } catch (error) {
      console.error("Sync failed", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards: Stat[] = [
    { 
      label: "Total Articles", 
      value: stats?.totalArticles, 
      icon: FileText, 
      color: "text-blue-500", 
      href: "/admin/dashboard/articles" 
    },
    { 
      label: "Pending Dialogue", 
      value: stats?.pendingComments, 
      icon: MessageSquare, 
      color: "text-amber-500", 
      href: "/admin/dashboard/comments" 
    },
    { 
      label: "Open Inquiries", 
      value: stats?.unreadInquiries, 
      icon: Inbox, 
      color: "text-purple-500", 
      href: "/admin/dashboard/inquiries" 
    },
    { 
      label: "Core Authors", 
      value: stats?.totalAuthors, 
      icon: PenTool, 
      color: "text-pink-500", 
      href: "/admin/dashboard/authors" 
    },
  ]

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
        <p className="text-zinc-500 font-bold italic lowercase tracking-widest">Digital heartbeat loading...</p>
      </div>
    )
  }

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'post': return FileText
      case 'comment': return MessageSquare
      case 'inquiry': return Inbox
      case 'category': return Tags
      case 'author': return PenTool
      case 'user': return User
      default: return ShieldAlert
    }
  }

  const getLogColor = (type: string) => {
    switch (type) {
      case 'post': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'comment': return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      case 'inquiry': return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      case 'category': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
      case 'author': return 'bg-pink-500/10 text-pink-500 border-pink-500/20'
      case 'user': return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      default: return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
    }
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white px-2 tracking-tight">System Pulse</h1>
          <p className="text-zinc-500 font-medium px-2 mt-1 italic lowercase tracking-wide font-mono">Real-time activity audit and platform metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard/editor"
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black px-6 py-4 rounded-2xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)] group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            New Publication
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
             <div className="glass-panel p-8 border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/20 transition-all group relative overflow-hidden h-full rounded-[2.5rem]">
                <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}>
                   <stat.icon size={120} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                   <div className="flex items-center justify-between mb-8">
                      <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} border border-white/10 shadow-inner`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-zinc-800" />
                   </div>
                   <div>
                      <h2 className="text-5xl font-black text-white mb-2 tabular-nums tracking-tighter">{stat.value || 0}</h2>
                      <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.25em] h-4 leading-none">{stat.label}</p>
                   </div>
                </div>
             </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-1 pb-20">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between px-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-4 italic tracking-tight">
                 <Clock className="w-5 h-5 text-amber-500" />
                 Recent Digital Footprints
              </h3>
              {activities.length === 0 && (
                <button 
                  onClick={handleSyncLogs}
                  className="text-[10px] font-black uppercase tracking-widest text-amber-500 hover:text-amber-400 transition-colors border-b border-amber-500/30 pb-1"
                >
                  Sync Historical Data
                </button>
              )}
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-700 italic border-b border-zinc-800 pb-1">Verified System Audit</div>
           </div>
           
           <div className="glass-panel border border-white/10 bg-white/2 p-3 rounded-[3rem] overflow-hidden min-h-[600px]">
              {activities.length === 0 ? (
                <div className="p-40 text-center text-zinc-800 font-black italic uppercase tracking-tighter text-3xl opacity-20 select-none">
                   The silence is golden. No actions recorded.
                </div>
              ) : (
                <div className="space-y-2">
                   {activities.map((act) => {
                     const Icon = getLogIcon(act.type)
                     const colorClass = getLogColor(act.type)
                     return (
                       <div key={act.id} className="p-6 rounded-[2rem] hover:bg-white/5 transition-all group flex items-center justify-between gap-6 border border-transparent hover:border-white/5">
                          <div className="flex items-center gap-6 overflow-hidden">
                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${colorClass} shadow-lg transition-transform group-hover:scale-110`}>
                                <Icon className="w-6 h-6" />
                             </div>
                             <div className="overflow-hidden">
                                <p className="text-white/90 font-bold leading-tight mb-1 group-hover:text-amber-400 transition-colors tracking-tight">
                                   {act.target}
                                </p>
                                <div className="flex items-center gap-2 text-zinc-600 text-xs font-medium">
                                   <span className="font-black uppercase tracking-wider text-[9px] bg-white/5 px-2 py-0.5 rounded border border-white/5 text-zinc-500">
                                      {act.action}
                                   </span>
                                   <span className="text-zinc-700 font-mono">•</span>
                                   <span className="truncate max-w-[200px]">{act.user || 'System'}</span>
                                </div>
                             </div>
                          </div>
                          <div className="text-right shrink-0">
                             <div className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.2em] mb-2 font-mono tabular-nums">
                                {new Date(act.date).toLocaleDateString(undefined, {
                                   month: 'short',
                                   day: 'numeric'
                                })}
                             </div>
                             <div className="text-zinc-800 group-hover:text-zinc-600 transition-colors font-black uppercase text-[9px] tracking-widest italic select-none">
                                {new Date(act.date).toLocaleTimeString(undefined, {
                                   hour: '2-digit',
                                   minute: '2-digit'
                                })}
                             </div>
                          </div>
                       </div>
                     )
                   })}
                </div>
              )}
           </div>
        </div>

        {/* Rapid Deployment */}
        <div className="space-y-8">
           <h3 className="text-xl font-bold text-white px-4 italic tracking-tight">Tactical Operations</h3>
           <div className="glass-panel border border-white/10 bg-white/2 p-6 rounded-[3rem] space-y-4 shadow-2xl">
              {[
                { label: "New Publication", icon: FileText, href: "/admin/dashboard/editor", desc: "Launch blog content" },
                { label: "Dialogue Moderation", icon: MessageSquare, href: "/admin/dashboard/comments", desc: "Audit visitor feedback" },
                { label: "Inquiry Management", icon: Inbox, href: "/admin/dashboard/inquiries", desc: "Review client pulse" },
                { label: "Taxonomy Engine", icon: Tags, href: "/admin/dashboard/categories", desc: "Configure site nodes" },
                { label: "User Access", icon: User, href: "/admin/dashboard/users", desc: "Command security levels" },
              ].map((action) => (
                <Link key={action.label} href={action.href}>
                   <div className="p-6 rounded-[2rem] bg-zinc-950/50 border border-white/5 hover:border-amber-500/40 hover:bg-zinc-900 transition-all group flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-white/5 text-amber-500 transition-transform group-hover:rotate-12">
                               <action.icon className="w-5 h-5" />
                            </div>
                            <span className="text-white font-black text-sm tracking-tight">{action.label}</span>
                         </div>
                         <ArrowRight className="w-4 h-4 text-zinc-800 group-hover:translate-x-1 group-hover:text-amber-500 transition-all" />
                      </div>
                      <p className="text-zinc-700 text-[9px] font-black uppercase tracking-[0.3em] pl-1">{action.desc}</p>
                   </div>
                </Link>
              ))}
           </div>
           
           <div className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 space-y-4">
              <h4 className="text-amber-500 font-black uppercase text-[10px] tracking-widest">Platform Security Note</h4>
              <p className="text-zinc-600 text-xs leading-relaxed italic font-medium">
                 All digital footprints are logged with 100% fidelity. Administrators are responsible for maintaining audit integrity across all publication channels.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
