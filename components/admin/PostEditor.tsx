"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, Loader2, ArrowLeft, Eye, Type } from "lucide-react"
import RichTextEditor from "./RichTextEditor"

type Author = { id: string; name: string }
type Category = { id: string; name: string }

type PostEditorProps = {
  postId?: string
}

export default function PostEditor({ postId }: PostEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [authors, setAuthors] = useState < Author[] > ([])
  const [categories, setCategories] = useState < Category[] > ([])

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    readTime: "",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    isPublished: false,
    authorId: "",
    categoryId: "",
    slug: "",
  })

  useEffect(() => {
    fetchMetadata()
    if (postId) {
      fetchPost()
    } else {
      setLoading(false)
    }
  }, [postId])

  const fetchMetadata = async () => {
    try {
      const [authRes, catRes] = await Promise.all([
        fetch("/api/admin/authors"),
        fetch("/api/admin/categories")
      ])
      if (authRes.ok) setAuthors(await authRes.json())
      if (catRes.ok) setCategories(await catRes.json())
    } catch (error) {
      console.error("Failed to fetch metadata", error)
    }
  }

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/admin/blogs/${postId}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          title: data.title || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          coverImage: data.coverImage || "",
          readTime: data.readTime || "",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          canonicalUrl: data.canonicalUrl || "",
          isPublished: data.isPublished || false,
          authorId: data.authorId || "",
          categoryId: data.categoryId || "",
          slug: data.slug || "",
        })
      }
    } catch (error) {
      console.error("Failed to fetch post", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = postId ? `/api/admin/blogs/${postId}` : "/api/admin/blogs"
      const method = postId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const savedPost = await res.json()
        if (formData.isPublished && savedPost.slug) {
          router.push(`/blog/${savedPost.slug}`)
        } else {
          router.push("/admin/dashboard")
        }
      } else {
        const errorData = await res.json()
        alert(`Failed to save post: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error("Failed to save post", error)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  if (loading) {
    return <div className="text-amber-500 font-bold p-10">Loading editor...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-xl transition-all text-zinc-400">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-black text-white">{postId ? "Edit Article" : "New Article"}</h1>
          {postId && formData.slug && (
            <a
              href={`/blog/${formData.slug}`}
              target="_blank"
              className="ml-2 p-2 hover:bg-white/10 rounded-xl transition-all text-amber-500 hover:text-amber-400"
              title="Preview Article"
            >
              <Eye className="w-5 h-5" />
            </a>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-bold text-zinc-400 cursor-pointer">
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="w-5 h-5 rounded border-white/20 bg-[#020610] text-amber-500 focus:ring-amber-500/50"
            />
            {formData.isPublished ? "Published" : "Draft"}
          </label>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black px-6 py-3 rounded-xl transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Core Content</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                  placeholder="Enter article title..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Excerpt (Summary)</label>
                <textarea
                  name="excerpt"
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 resize-none font-medium"
                  placeholder="Appears on blog listing cards..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide flex justify-between">
                  <span>Rich Text Content</span>
                  <span className="text-xs text-amber-500">Auto-detects formatting on paste (Word/Docs)</span>
                </label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              Metadata & Organization
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Author</label>
                <select
                  name="authorId"
                  required
                  value={formData.authorId}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Author</option>
                  {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Category</label>
                <select
                  name="categoryId"
                  required
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Read Time</label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600"
                  placeholder="e.g. 5 min read"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Cover Image URL</label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 shadow-[0_0_30px_rgba(245,158,11,0.05)]">
            <h2 className="text-xl font-bold text-white mb-6">SEO Configuration</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600"
                  placeholder="Max 60 chars"
                  maxLength={60}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Meta Description</label>
                <textarea
                  name="metaDescription"
                  rows={4}
                  value={formData.metaDescription}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 resize-none font-medium"
                  placeholder="Max 160 chars"
                  maxLength={160}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Canonical URL Override</label>
                <input
                  type="url"
                  name="canonicalUrl"
                  value={formData.canonicalUrl}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600"
                  placeholder="Optional absolute URL"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
