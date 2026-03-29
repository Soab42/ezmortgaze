"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { 
  ShieldCheck, 
  Mail, 
  User, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  Fingerprint
} from "lucide-react"

export default function SettingsPage() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile")
  
  // States for password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [isPasswordSaving, setIsPasswordSaving] = useState(false)
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null)

  // States for email change
  const [newEmail, setNewEmail] = useState("")
  const [isEmailSaving, setIsEmailSaving] = useState(false)
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null)

  useEffect(() => {
    if (searchParams.get('verified')) {
      setEmailStatus({ type: 'success', msg: 'Email address successfully verified!' })
    }
  }, [searchParams])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordStatus({ type: 'error', msg: 'Passwords do not match' })
      return
    }

    setIsPasswordSaving(true)
    setPasswordStatus(null)

    try {
      const res = await fetch("/api/admin/settings/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setPasswordStatus({ type: 'success', msg: 'Password changed successfully' })
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        setPasswordStatus({ type: 'error', msg: data.error || 'Failed to change password' })
      }
    } catch (error) {
      setPasswordStatus({ type: 'error', msg: 'An unexpected error occurred' })
    } finally {
      setIsPasswordSaving(false)
    }
  }

  const handleEmailRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsEmailSaving(true)
    setEmailStatus(null)

    try {
      const res = await fetch("/api/admin/settings/email/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail }),
      })

      const data = await res.json()
      if (res.ok) {
        setEmailStatus({ type: 'success', msg: 'A verification link has been sent to your new email' })
        setNewEmail("")
      } else {
        setEmailStatus({ type: 'error', msg: data.error || 'Failed to request email change' })
      }
    } catch (error) {
      setEmailStatus({ type: 'error', msg: 'An unexpected error occurred' })
    } finally {
      setIsEmailSaving(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-white">Account Settings</h1>
        <p className="text-zinc-400 font-medium">Manage your administrator account security and professional profile.</p>
      </div>

      <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "profile" ? "bg-amber-500 text-zinc-950" : "text-zinc-400 hover:text-white"}`}
        >
          <User className="w-4 h-4" />
          General Profile
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "security" ? "bg-amber-500 text-zinc-950" : "text-zinc-400 hover:text-white"}`}
        >
          <ShieldCheck className="w-4 h-4" />
          Login & Security
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {activeTab === "profile" && (
          <div className="glass-panel border border-white/10 rounded-[2rem] p-8 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Email Address</h2>
                <p className="text-zinc-400 text-sm">Currently associated with {session?.user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleEmailRequest} className="space-y-6 max-w-md">
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">New Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                  placeholder="name@example.com"
                />
              </div>

              {emailStatus && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${emailStatus.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                  {emailStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span className="text-sm font-bold">{emailStatus.msg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isEmailSaving}
                className="w-full flex items-center justify-center gap-2 bg-white text-zinc-950 hover:bg-zinc-200 font-black px-6 py-4 rounded-xl transition-all disabled:opacity-50"
              >
                {isEmailSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify and Update Email"}
              </button>
              
              <p className="text-[10px] text-zinc-500 text-center uppercase font-black tracking-widest leading-relaxed">
                Verification required. A secure link will be sent to the new address to confirm the transition.
              </p>
            </form>
          </div>
        )}

        {activeTab === "security" && (
          <div className="glass-panel border border-white/10 rounded-[2rem] p-8 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500">
                <Fingerprint className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Password Management</h2>
                <p className="text-zinc-400 text-sm">Update your password to keep your administrative account secure.</p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(d => ({...d, currentPassword: e.target.value}))}
                    className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="pt-2 border-t border-white/5">
                  <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">New Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(d => ({...d, newPassword: e.target.value}))}
                    className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                    placeholder="Min. 6 characters"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(d => ({...d, confirmPassword: e.target.value}))}
                    className="w-full bg-[#020610] text-white p-4 rounded-xl border border-white/10 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600 font-medium"
                    placeholder="Verify new password"
                  />
                </div>
              </div>

              {passwordStatus && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${passwordStatus.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                  {passwordStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span className="text-sm font-bold">{passwordStatus.msg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isPasswordSaving}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 text-zinc-950 hover:bg-amber-400 font-black px-6 py-4 rounded-xl transition-all disabled:opacity-50"
              >
                {isPasswordSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <KeyRound className="w-5 h-5" />
                    Change Account Password
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
