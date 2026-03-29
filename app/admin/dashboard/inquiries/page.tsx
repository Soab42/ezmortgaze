"use client"

import { useState, useEffect } from "react"
import { 
  Inbox, 
  Trash2, 
  Loader2, 
  Mail, 
  MessageSquare,
  CheckCircle,
  Clock,
  CircleDot
} from "lucide-react"

type Inquiry = {
  id: string
  firstName: string
  lastName: string
  email: string
  message: string
  isRead: boolean
  createdAt: string
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiries")
      if (res.ok) {
        setInquiries(await res.json())
      }
    } catch (error) {
      console.error("Failed to fetch inquiries", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !currentRead }),
      })

      if (res.ok) {
        setInquiries(inquiries.map(i => i.id === id ? { ...i, isRead: !currentRead } : i))
      }
    } catch (error) {
      console.error("Failed to toggle read status", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" })
      if (res.ok) {
        setInquiries(inquiries.filter(i => i.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete inquiry", error)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-white px-2">Contact Inquiries</h1>
        <p className="text-zinc-400 font-medium px-2">Manage incoming messages from the contact form.</p>
      </div>

      <div className="glass-panel border border-white/10 rounded-[2.5rem] p-8 overflow-hidden bg-white/5 backdrop-blur-3xl min-h-[600px]">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            <p className="text-zinc-500 font-bold italic">Loading messages...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-20 text-center text-zinc-600 font-bold flex flex-col items-center gap-6">
            <Inbox className="w-16 h-16 opacity-10" />
            No inquiries yet. Your inbox is peaceful and clean!
          </div>
        ) : (
          <div className="space-y-6">
            {inquiries.map((inquiry) => (
              <div 
                key={inquiry.id} 
                className={`p-8 rounded-[1.5rem] border transition-all group relative overflow-hidden ${inquiry.isRead ? 'bg-zinc-950/50 border-white/5 opacity-60 grayscale-[0.4]' : 'bg-white/5 border-white/10 hover:border-amber-500/30'}`}
              >
                {!inquiry.isRead && <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />}
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-64 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-500 font-black text-sm border border-white/10">
                        {inquiry.firstName[0]}{inquiry.lastName[0]}
                      </div>
                      <div>
                        <h3 className="text-white font-bold leading-none mb-1">{inquiry.firstName} {inquiry.lastName}</h3>
                        <p className="text-zinc-500 text-xs truncate max-w-[150px]">{inquiry.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-zinc-500">
                      <Mail className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{inquiry.email}</span>
                    </div>

                    <div className="flex items-center gap-3 text-zinc-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {new Date(inquiry.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-start gap-4">
                       <MessageSquare className="w-5 h-5 text-amber-500/50 shrink-0 mt-1" />
                       <div className="space-y-4">
                          <p className="text-white font-medium leading-[1.8] italic text-lg">
                            "{inquiry.message}"
                          </p>
                          <div className="flex items-center gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleMarkAsRead(inquiry.id, inquiry.isRead)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${inquiry.isRead ? 'bg-zinc-800 text-zinc-400 hover:text-white' : 'bg-amber-500 text-zinc-950 hover:bg-amber-400'}`}
                            >
                              {inquiry.isRead ? <CircleDot className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                              {inquiry.isRead ? "Mark Unread" : "Mark as Read"}
                            </button>
                            <button
                              onClick={() => handleDelete(inquiry.id)}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-xs font-black uppercase tracking-widest transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
