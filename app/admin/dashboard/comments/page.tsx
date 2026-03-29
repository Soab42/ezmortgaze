"use client"

import { useState, useEffect } from "react"
import { 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Loader2, 
  ExternalLink,
  Clock
} from "lucide-react"

type Comment = {
  id: string
  name: string
  email: string
  content: string
  approved: boolean
  createdAt: string
  post: {
    title: string
    slug: string
  }
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/admin/comments")
      if (res.ok) {
        setComments(await res.json())
      }
    } catch (error) {
      console.error("Failed to fetch comments", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleApproval = async (id: string, currentApproved: boolean) => {
    try {
      const res = await fetch(`/api/admin/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: !currentApproved }),
      })

      if (res.ok) {
        setComments(comments.map(c => c.id === id ? { ...c, approved: !currentApproved } : c))
      }
    } catch (error) {
      console.error("Failed to toggle approval", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return

    try {
      const res = await fetch(`/api/admin/comments/${id}`, { method: "DELETE" })
      if (res.ok) {
        setComments(comments.filter(c => c.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete comment", error)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-white">Comment Moderation</h1>
        <p className="text-zinc-400 font-medium">Review and approve visitor feedback before it goes live.</p>
      </div>

      <div className="glass-panel border border-white/10 rounded-3xl overflow-hidden bg-white/5">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            <p className="text-zinc-500 font-bold italic">Loading conversations...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="p-20 text-center text-zinc-600 font-bold">
            No comments yet. Your blog is waiting for its first spark!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-zinc-400 uppercase text-[10px] font-black tracking-[0.2em]">
                  <th className="p-6">Visitor</th>
                  <th className="p-6">Comment Content</th>
                  <th className="p-6">Origin Post</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.id} className="border-b border-white/5 hover:bg-white/5 transition-all group">
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-white font-bold">{comment.name}</span>
                        <span className="text-zinc-500 text-xs">{comment.email}</span>
                        <div className="flex items-center gap-1 mt-2 text-zinc-600 text-[9px] uppercase font-black">
                           <Clock className="w-2.5 h-2.5" />
                           {new Date(comment.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-zinc-400 text-sm max-w-md line-clamp-3 italic">
                        "{comment.content}"
                      </p>
                    </td>
                    <td className="p-6">
                      <a 
                        href={`/blog/${comment.post.slug}`} 
                        target="_blank" 
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-colors text-xs font-bold"
                      >
                        {comment.post.title}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="p-6">
                      {comment.approved ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-wider">
                          <CheckCircle className="w-3 h-3" />
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-wider">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleToggleApproval(comment.id, comment.approved)}
                          className={`p-2 rounded-lg transition-all ${comment.approved ? 'hover:bg-amber-500/10 text-zinc-400 hover:text-amber-500' : 'hover:bg-green-500/10 text-zinc-400 hover:text-green-500'}`}
                          title={comment.approved ? "Reject" : "Approve"}
                        >
                          {comment.approved ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-500 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
