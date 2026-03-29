"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Loader2, Pencil, Save } from "lucide-react"

type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN"
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users")
      if (res.ok) {
        setUsers(await res.json())
      }
    } catch (error) {
      console.error("Failed to fetch users", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // Keep password blank for editing
      role: user.role
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin? This cannot be undone.")) return

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
      if (res.ok) {
        setUsers(users.filter(u => u.id !== id))
      } else {
        const data = await res.json()
        alert(data.error || "Failed to delete user")
      }
    } catch (error) {
      console.error("Delete error", error)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
    setFormData({ name: "", email: "", password: "", role: "ADMIN" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const url = editingUser ? `/api/admin/users/${editingUser.id}` : "/api/admin/users"
    const method = editingUser ? "PUT" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const savedUser = await res.json()
        if (editingUser) {
          setUsers(users.map(u => u.id === editingUser.id ? savedUser : u))
        } else {
          setUsers([savedUser, ...users])
        }
        closeModal()
      } else {
        const errorData = await res.json()
        alert(`Failed to save user: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Failed to save user", error)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Administrators</h1>
          <p className="text-zinc-400 font-medium">Manage admin access to the website dashboard.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black px-6 py-3 rounded-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Admin
        </button>
      </div>

      {/* Users List */}
      <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-amber-500 font-bold">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center text-zinc-500 font-bold">No users configured.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-zinc-400 uppercase text-xs font-black tracking-wider">
                  <th className="p-6">Name</th>
                  <th className="p-6">Email</th>
                  <th className="p-6">Joined Date</th>
                  <th className="p-6">Role</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                    <td className="p-6 font-bold text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-500 font-black text-xs shrink-0">
                          {user.name?.charAt(0).toUpperCase() || "A"}
                        </div>
                        <span className="truncate">{user.name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="p-6 text-zinc-400 text-sm whitespace-nowrap">{user.email}</td>
                    <td className="p-6 text-zinc-400 text-sm whitespace-nowrap">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-wider">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-all"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
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

      {/* Create User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="glass-panel border border-white/10 rounded-2xl p-8 w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingUser ? "Edit Administrator" : "Add New Admin"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">
                  Password {editingUser && "(Optional)"}
                </label>
                <input
                  type="password"
                  name="password"
                  required={!editingUser}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                  placeholder={editingUser ? "Leave blank to keep current" : "••••••••"}
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all"
                >
                  <option value="ADMIN">Administrator</option>
                  <option value="EDITOR">Editor</option>
                </select>
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
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingUser ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
                  {editingUser ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
