"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Loader2, Tags, Pencil, Save } from "lucide-react"

type Category = {
  id: string
  name: string
  slug: string
  createdAt: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    slug: ""
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories")
      if (res.ok) {
        setCategories(await res.json())
      }
    } catch (error) {
      console.error("Failed to fetch categories", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? This will fail if it has active posts.")) return

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" })
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id))
      } else {
        const data = await res.json()
        alert(data.error || "Failed to delete category. Check if it has active posts.")
      }
    } catch (error) {
      console.error("Delete error", error)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
    setFormData({ name: "", slug: "" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const url = editingCategory ? `/api/admin/categories/${editingCategory.id}` : "/api/admin/categories"
    const method = editingCategory ? "PUT" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const savedCategory = await res.json()
        if (editingCategory) {
          setCategories(categories.map(c => c.id === editingCategory.id ? savedCategory : c))
        } else {
          setCategories([savedCategory, ...categories])
        }
        closeModal()
      } else {
        const errorData = await res.json()
        alert(`Failed to save category: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Failed to save category", error)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "name" && !editingCategory) {
      // Auto-generate slug from name only on creation
      const slg = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      setFormData({ name: value, slug: slg })
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Categories</h1>
          <p className="text-zinc-400 font-medium">Manage categories for your blog insights.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black px-6 py-3 rounded-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-amber-500 font-bold">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="p-10 text-center text-zinc-500 font-bold">No categories configured.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-zinc-400 uppercase text-xs font-black tracking-wider">
                  <th className="p-6">Name</th>
                  <th className="p-6">Slug</th>
                  <th className="p-6">Created</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                    <td className="p-6 font-bold text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-500 shrink-0">
                          <Tags className="w-4 h-4" />
                        </div>
                        <span>{category.name}</span>
                      </div>
                    </td>
                    <td className="p-6 text-zinc-400 text-sm font-mono">{category.slug}</td>
                    <td className="p-6 text-zinc-400 text-sm whitespace-nowrap">
                      {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-all"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
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

      {/* Create Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="glass-panel border border-white/10 rounded-2xl p-8 w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Category Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                  placeholder="e.g. Commercial Real Estate"
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
                  placeholder="e.g. commercial-real-estate"
                />
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
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingCategory ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
                  {editingCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
