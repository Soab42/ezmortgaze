"use client"

import { Editor } from '@tinymce/tinymce-react'

type RichTextEditorProps = {
  content: string
  onChange: (content: string) => void
}

export default function TinyMCEEditor({ content, onChange }: RichTextEditorProps) {
  return (
    <div className="w-full rounded-2xl border border-white/10 overflow-hidden focus-within:border-amber-500/50 transition-all shadow-xl">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key"}
        value={content}
        onEditorChange={(newContent) => {
          onChange(newContent)
        }}
        init={{
          height: 600,
          menubar: true,
          skin: 'oxide-dark',
          content_css: 'dark',
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | link image media table | help',
          content_style: `
            body { 
              font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
              font-size: 16px; 
              background-color: #020610; 
              color: #f8fafc; 
              padding: 1rem;
            }
            p { margin-bottom: 1.5rem; color: #a1a1aa; line-height: 1.8; }
            h1, h2, h3, h4, h5, h6 { color: #ffffff; font-weight: 900; margin-bottom: 1rem; }
            a { color: #f59e0b; text-decoration: underline; font-weight: bold; }
            blockquote { border-left: 3px solid #f59e0b; background: rgba(245,158,11,0.06); padding: 1rem; margin: 1.5rem 0; color: #d4d4d8; }
            code { background: rgba(255,255,255,0.08); padding: 0.2rem 0.4rem; border-radius: 4px; color: #fbbf24; }
          `,
          placeholder: 'Write your story here... Content will automatically sync to standard HTML format.',
          branding: false,
          promotion: false,
          toolbar_mode: 'sliding'
        }}
      />
    </div>
  )
}
