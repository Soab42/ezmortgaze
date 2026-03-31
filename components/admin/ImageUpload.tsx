"use client"

import { CldUploadWidget } from "next-cloudinary"
import { ImagePlus, X, Upload } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  label?: string
  aspect?: "video" | "square"
}

export default function ImageUpload({ value, onChange, label, aspect = "video" }: ImageUploadProps) {
  const aspectClass = aspect === "video" ? "aspect-video" : "aspect-square w-48 mx-auto"

  return (
    <div>
      {label && (
        <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="flex flex-col gap-4">
        {value ? (
          <div className={`relative ${aspectClass} rounded-xl overflow-hidden border border-white/10 group`}>
            <Image
              src={value}
              alt="Uploaded Image"
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <CldUploadWidget
                onSuccess={(result: any) => {
                  if (result?.info?.secure_url) {
                    // Cloudinary auto-converts based on extension requested
                    const webpUrl = result.info.secure_url.replace(/\.[^/.]+$/, ".webp")
                    onChange(webpUrl)
                  }
                }}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              >
                {({ open }: any) => (
                  <button
                    onClick={() => open?.()}
                    type="button"
                    className="p-3 bg-white text-zinc-950 rounded-xl hover:scale-110 transition-transform shadow-xl"
                    title="Change image"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                )}
              </CldUploadWidget>
              <button
                onClick={() => onChange("")}
                type="button"
                className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform shadow-xl"
                title="Remove image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <CldUploadWidget
            onSuccess={(result: any) => {
              if (result?.info?.secure_url) {
                const webpUrl = result.info.secure_url.replace(/\.[^/.]+$/, ".webp")
                onChange(webpUrl)
              }
            }}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            options={{
              maxFiles: 1,
              resourceType: "image",
              clientAllowedFormats: ["png", "jpeg", "jpg", "webp", "avif"],
              styles: {
                palette: {
                  window: "#020610",
                  windowBorder: "#1e293b",
                  tabIcon: "#f59e0b",
                  menuIcons: "#f59e0b",
                  textDark: "#000000",
                  textLight: "#ffffff",
                  link: "#f59e0b",
                  action: "#f59e0b",
                  activeTabIcon: "#ffffff",
                  inactiveTabIcon: "#94a3b8",
                  error: "#ef4444",
                  inProgress: "#f59e0b",
                  complete: "#10b981",
                  sourceBg: "#0f172a"
                },
              }
            }}
          >
            {({ open }: any) => (
              <button
                type="button"
                onClick={() => open?.()}
                className={`w-full ${aspectClass} rounded-xl border-2 border-dashed border-white/10 hover:border-amber-500/50 hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-3 text-zinc-500 hover:text-amber-500 group`}
              >
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-amber-500/10 transition-all">
                  <ImagePlus className="w-8 h-8" />
                </div>
                <span className="font-bold">Upload Image</span>
                <span className="text-xs text-zinc-600 font-medium tracking-tight">PNG, JPG or WebP (Max 10MB)</span>
              </button>
            )}
          </CldUploadWidget>
        )}
      </div>
    </div>
  )
}
