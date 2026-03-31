"use client"

import { useState, useEffect, useCallback } from "react"
import { MessageSquare, User, Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

type Comment = {
  id: string
  name: string
  content: string
  createdAt: string
}

export default function CommentSection({ postId, slug }: { postId: string, slug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: ""
  })

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/blog/comments?slug=${slug}`)
      if (res.ok) {
        setComments(await res.json())
      }
    } catch (error) {
      console.error("Failed to fetch comments", error)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    try {
      const res = await fetch("/api/blog/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, postId }),
      })

      if (res.ok) {
        setStatus({ type: 'success', msg: 'Comment submitted! It will appear once approved by an admin.' })
        setFormData({ name: "", email: "", content: "" })
        // We don't fetch comments here because the new one isn't approved yet
      } else {
        const data = await res.json()
        setStatus({ type: 'error', msg: data.error || 'Failed to submit comment' })
      }
    } catch (error) {
      setStatus({ type: 'error', msg: 'An unexpected error occurred' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-20 pt-16 border-t border-white/5 space-y-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-white flex items-center gap-4">
          <MessageSquare className="w-8 h-8 text-amber-500" />
          Comments <span className="text-zinc-600 text-lg">({comments.length})</span>
        </h2>
      </div>

      <div className="space-y-12">
        {/* Comment Form */}
        <div className="glass-panel border border-white/10 rounded-3xl p-8 bg-white/5 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white mb-6">Leave a Comment</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-widest pl-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(d => ({ ...d, name: e.target.value }))}
                    className="w-full bg-[#020610] text-white pl-12 p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-700"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(d => ({ ...d, email: e.target.value }))}
                    className="w-full bg-[#020610] text-white pl-12 p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-700"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-500 uppercase tracking-widest pl-1">Your Message</label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData(d => ({ ...d, content: e.target.value }))}
                rows={5}
                className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-700 resize-none"
                placeholder="Share your thoughts..."
              />
            </div>

            {status && (
              <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <span className="text-sm font-bold">{status.msg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black px-6 py-4 rounded-xl transition-all disabled:opacity-50 group"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Submit Comment
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Comment List */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white pl-1">
            Thoughts <span className="text-zinc-600 text-sm font-medium">({comments.length})</span>
          </h3>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-600 gap-4">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="font-bold underline italic">Loading insights...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="p-10 text-center border-2 border-dashed border-white/5 rounded-3xl text-zinc-600 font-bold">
              Be the first to share your perspective!
            </div>
          ) : (
                <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 font-black text-xs border border-amber-500/20">
                        {comment.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className="text-white font-bold leading-none mb-1">{comment.name}</h4>
                        <time className="text-zinc-600 text-[10px] uppercase font-black tracking-widest">
                          {new Date(comment.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed italic">
                    "{comment.content}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
