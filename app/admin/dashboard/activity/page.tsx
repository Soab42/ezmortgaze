"use client"

import { useState, useEffect } from "react"
import { 
  FileText, MessageSquare, Inbox, Tags, 
  PenTool, User, ShieldAlert, Loader2,
  ChevronLeft, ChevronRight, Clock
} from "lucide-react"

type Activity = {
  id: string
  type: string
  action: string
  user: string
  target: string
  date: string
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

export default function ActivityLogsPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)

  const limit = 20

  useEffect(() => {
    fetchLogs(page)
  }, [page])

  const fetchLogs = async (currentPage: number) => {
    try {
        setLoading(true)
        const res = await fetch(`/api/admin/activity-logs?page=${currentPage}&limit=${limit}`)
        if (res.ok) {
           const data = await res.json()
           setActivities(data.logs)
           setTotalPages(data.pagination.totalPages)
           setTotalRecords(data.pagination.total)
        }
    } catch (e) {
        console.error("Failed to load generic logs")
    } finally {
        setLoading(false)
    }
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white px-2 tracking-tight">System Audit Log</h1>
          <p className="text-zinc-500 font-medium px-2 mt-1 italic lowercase tracking-wide font-mono">
            Comprehensive Digital Footprint Timeline ({totalRecords} records)
          </p>
        </div>
      </div>

      <div className="glass-panel border border-white/10 bg-white/2 p-3 rounded-[3rem] overflow-hidden min-h-[60vh] flex flex-col justify-between">
         {loading && activities.length === 0 ? (
           <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] gap-4">
             <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
           </div>
         ) : activities.length === 0 ? (
           <div className="flex-1 p-40 text-center text-zinc-800 font-black italic uppercase tracking-tighter text-3xl opacity-20 select-none">
             The silence is golden. No actions recorded.
           </div>
         ) : (
           <div className="space-y-2 mb-6 opacity-90 transition-opacity">
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
                              day: 'numeric',
                              year: 'numeric'
                           })}
                        </div>
                        <div className="text-zinc-800 group-hover:text-zinc-600 transition-colors font-black uppercase text-[9px] tracking-widest italic select-none">
                           {new Date(act.date).toLocaleTimeString(undefined, {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                           })}
                        </div>
                     </div>
                  </div>
                )
              })}
           </div>
         )}
         
         <div className="flex items-center justify-between p-4 px-8 border-t border-white/5 mt-auto">
             <div className="text-zinc-500 text-xs font-black tracking-widest uppercase">
                Page {page} of {totalPages || 1}
             </div>
             <div className="flex items-center gap-2">
                 <button 
                   onClick={() => setPage(p => Math.max(1, p - 1))}
                   disabled={page === 1}
                   className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-white/5"
                 >
                    <ChevronLeft className="w-5 h-5 text-white" />
                 </button>
                 <button 
                   onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                   disabled={page === totalPages || totalPages === 0}
                   className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-white/5"
                 >
                    <ChevronRight className="w-5 h-5 text-white" />
                 </button>
             </div>
         </div>
      </div>
    </div>
  )
}
