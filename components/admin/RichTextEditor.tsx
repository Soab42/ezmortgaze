"use client"

import { useState } from "react"
import TipTapEditor from "./TipTapEditor"
import TinyMCEEditor from "./TinyMCEEditor"

type RichTextEditorProps = {
  content: string
  onChange: (content: string) => void
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [editorType, setEditorType] = useState<"tiptap" | "tinymce">("tinymce")

  return (
    <div className="flex flex-col gap-4">
      {/* Editor Toggle */}
      <div className="flex items-center gap-2 p-1.5 bg-[#020610] rounded-xl border border-white/10 w-fit">
        <button
          type="button"
          onClick={() => setEditorType("tiptap")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            editorType === "tiptap" 
              ? "bg-amber-500 text-zinc-950 shadow-md" 
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Simple Editor (TipTap)
        </button>
        <button
          type="button"
          onClick={() => setEditorType("tinymce")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            editorType === "tinymce" 
              ? "bg-amber-500 text-zinc-950 shadow-md" 
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Advanced Editor (TinyMCE)
        </button>
      </div>

      {/* Active Editor */}
      {editorType === "tiptap" ? (
        <TipTapEditor key="tiptap" content={content} onChange={onChange} />
      ) : (
        <TinyMCEEditor key="tinymce" content={content} onChange={onChange} />
      )}
    </div>
  )
}
