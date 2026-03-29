"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, Eye, FileText, Search, Filter } from "lucide-react"

type Post = {
  id: string
  title: string
  slug: string
  isPublished: boolean
  createdAt: string
  author: { name: string }
  category: { name: string }
}

export default function ArticlesManagementPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blogs")
      if (res.ok) {
        const data = await res.json()
        setPosts(data.posts)
      }
    } catch (error) {
      console.error("Failed to fetch posts", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete post", error)
    }
  }

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white px-2">Manage Articles</h1>
          <p className="text-zinc-400 font-medium px-2">Create, edit, and organize your blog content.</p>
        </div>
        <Link
          href="/admin/dashboard/editor"
          className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black px-8 py-4 rounded-xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
        >
          <Plus className="w-5 h-5" />
          New Article
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 px-2">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search by title or author..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-all"
            />
         </div>
         <button className="bg-white/5 border border-white/10 text-zinc-400 px-6 py-3 rounded-xl hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 font-bold">
            <Filter className="w-4 h-4" />
            Filters
         </button>
      </div>

      <div className="glass-panel border border-white/10 rounded-[2.5rem] overflow-hidden bg-white/5 backdrop-blur-3xl min-h-[500px]">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            <p className="text-zinc-500 font-bold italic">Gathering insights...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-20 text-center text-zinc-600 font-bold flex flex-col items-center gap-4">
            <FileText className="w-12 h-12 opacity-10" />
            {searchTerm ? "No articles match your search." : "No articles found. Time to write something amazing!"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-zinc-400 uppercase text-[10px] font-black tracking-[0.2em]">
                  <th className="p-8">Post Details</th>
                  <th className="p-8">Author & Category</th>
                  <th className="p-8">Status</th>
                  <th className="p-8">Last Updated</th>
                  <th className="p-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-all group">
                    <td className="p-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-white font-bold text-lg leading-tight group-hover:text-amber-400 transition-colors">{post.title}</span>
                        <span className="text-zinc-600 font-mono text-xs">{post.slug}</span>
                      </div>
                    </td>
                    <td className="p-8">
                       <div className="flex flex-col gap-2">
                          <span className="text-zinc-400 font-bold text-sm flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                             {post.author?.name || "Unknown"}
                          </span>
                          <span className="text-zinc-600 text-[10px] font-black uppercase tracking-wider bg-white/5 px-2 py-1 rounded w-fit">
                             {post.category?.name || "Uncategorized"}
                          </span>
                       </div>
                    </td>
                    <td className="p-8">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          post.isPublished ? "bg-green-500/10 text-green-400" : "bg-zinc-500/10 text-zinc-400"
                        }`}
                      >
                        <div className={`w-1 h-1 rounded-full ${post.isPublished ? "bg-green-400" : "bg-zinc-400"}`} />
                        {post.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-8">
                      <div className="text-zinc-500 text-xs font-medium">
                        {new Date(post.createdAt).toLocaleDateString(undefined, {
                           month: 'short',
                           day: 'numeric',
                           year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                         <a 
                           href={`/blog/${post.slug}`} 
                           target="_blank" 
                           className="p-3 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all"
                           title="View Publicly"
                         >
                           <Eye className="w-5 h-5" />
                         </a>
                        <Link 
                          href={`/admin/dashboard/editor/${post.id}`} 
                          className="p-3 hover:bg-amber-500/10 rounded-xl text-zinc-400 hover:text-amber-500 transition-all"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(post.id)} 
                          className="p-3 hover:bg-red-500/10 rounded-xl text-zinc-400 hover:text-red-500 transition-all"
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
