"use client"

import { useState, useEffect } from "react"
import { Plus, PenTool, Loader2, Pencil, Trash2, Save } from "lucide-react"
import ImageUpload from "@/components/admin/ImageUpload"

type Author = {
  id: string
  name: string
  slug: string
  role: string
  createdAt: string
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    role: "Senior Mortgage Advisor",
    bio: "",
    avatar: "",
    twitter: "",
    linkedin: ""
  })

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    try {
      const res = await fetch("/api/admin/authors")
      if (res.ok) {
        setAuthors(await res.json())
      }
    } catch (error) {
      console.error("Failed to fetch authors", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (authorStub: Author) => {
    try {
      // We need full details, so we might need a dedicated GET if not already in list
      // But for now, we'll assume the list has what we need OR fetch it.
      // Based on the POST logic, we have all fields.
      const res = await fetch(`/api/authors/${authorStub.slug}`)
      if (res.ok) {
        const fullAuthor = await res.json()
        setEditingAuthor(fullAuthor)
        setFormData({
          name: fullAuthor.name,
          slug: fullAuthor.slug,
          role: fullAuthor.role,
          bio: fullAuthor.bio,
          avatar: fullAuthor.avatar || "",
          twitter: fullAuthor.twitter || "",
          linkedin: fullAuthor.linkedin || ""
        })
        setIsModalOpen(true)
      }
    } catch (error) {
      console.error("Failed to fetch author details", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this author? This will fail if they have active posts.")) return

    try {
      const res = await fetch(`/api/admin/authors/${id}`, { method: "DELETE" })
      if (res.ok) {
        setAuthors(authors.filter(a => a.id !== id))
      } else {
        const data = await res.json()
        alert(data.error || "Failed to delete author. Check if they have active posts.")
      }
    } catch (error) {
      console.error("Delete error", error)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingAuthor(null)
    setFormData({ 
      name: "", slug: "", role: "Senior Mortgage Advisor", 
      bio: "", avatar: "", twitter: "", linkedin: "" 
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const url = editingAuthor ? `/api/admin/authors/${editingAuthor.id}` : "/api/admin/authors"
    const method = editingAuthor ? "PUT" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const savedAuthor = await res.json()
        if (editingAuthor) {
          setAuthors(authors.map(a => a.id === editingAuthor.id ? savedAuthor : a))
        } else {
          setAuthors([savedAuthor, ...authors])
        }
        closeModal()
      } else {
        const errorData = await res.json()
        alert(`Failed to save author: ${JSON.stringify(errorData.error)}`)
      }
    } catch (error) {
      console.error("Failed to save author", error)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "name" && !editingAuthor) {
      const slg = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      setFormData((prev) => ({ ...prev, name: value, slug: slg }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Authors</h1>
          <p className="text-zinc-400 font-medium">Manage contributors and authors for your blog entries.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black px-6 py-3 rounded-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Author
        </button>
      </div>

      {/* Authors List */}
      <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-amber-500 font-bold">Loading authors...</div>
        ) : authors.length === 0 ? (
          <div className="p-10 text-center text-zinc-500 font-bold">No authors configured.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-zinc-400 uppercase text-xs font-black tracking-wider">
                  <th className="p-6">Name</th>
                  <th className="p-6">Job Role</th>
                  <th className="p-6">Slug</th>
                  <th className="p-6">Created</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {authors.map((author) => (
                  <tr key={author.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                    <td className="p-6 font-bold text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-500 shrink-0">
                          <PenTool className="w-4 h-4" />
                        </div>
                        <span>{author.name}</span>
                      </div>
                    </td>
                    <td className="p-6 text-zinc-400 text-sm">{author.role}</td>
                    <td className="p-6 text-zinc-400 text-sm font-mono">{author.slug}</td>
                    <td className="p-6 text-zinc-400 text-sm whitespace-nowrap">
                      {author.createdAt ? new Date(author.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(author)}
                          className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-all"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(author.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-500 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Create Author Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-panel border border-white/10 rounded-2xl p-8 w-full max-w-2xl my-8 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingAuthor ? "Edit Author Profile" : "Add New Author"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Author Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                    placeholder="e.g. john-doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Job Role</label>
                <input
                  type="text"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                  placeholder="e.g. Senior Mortgage Advisor"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Biography</label>
                <textarea
                  name="bio"
                  required
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium resize-none"
                  placeholder="Short bio describing the author's expertise..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ImageUpload
                  label="Avatar Image"
                  aspect="square"
                  value={formData.avatar}
                  onChange={(url) => setFormData(prev => ({ ...prev, avatar: url }))}
                />
                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Twitter URL</label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">LinkedIn URL</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-4 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black px-6 py-4 rounded-xl transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingAuthor ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
                  {editingAuthor ? "Update Author" : "Create Author"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
