"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3, 
  Quote, 
  Undo, 
  Redo, 
  Link as LinkIcon,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Underline as UnderlineIcon
} from 'lucide-react'

type RichTextEditorProps = {
  content: string
  onChange: (content: string) => void
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  const addLink = () => {
    const url = window.prompt('URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-white/5 sticky top-0 z-10 backdrop-blur-md">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('heading', { level: 3 }) ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Heading 3"
      >
        <Heading3 size={18} />
      </button>

      <div className="w-px h-6 bg-white/10 mx-1 self-center" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Italic"
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('underline') ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Underline"
      >
        <UnderlineIcon size={18} />
      </button>

      <div className="w-px h-6 bg-white/10 mx-1 self-center" />

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'left' }) ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'center' }) ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive({ textAlign: 'right' }) ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>

      <div className="w-px h-6 bg-white/10 mx-1 self-center" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('orderedList') ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Ordered List"
      >
        <ListOrdered size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('blockquote') ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Blockquote"
      >
        <Quote size={18} />
      </button>

      <div className="w-px h-6 bg-white/10 mx-1 self-center" />

      <button
        type="button"
        onClick={addLink}
        className={`p-2 rounded-lg transition-all ${editor.isActive('link') ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
        title="Add Link"
      >
        <LinkIcon size={18} />
      </button>

      <div className="flex-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-all disabled:opacity-20"
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-all disabled:opacity-20"
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo size={18} />
      </button>
    </div>
  )
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Underline,
      Typography,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-amber-500 underline'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Write your story here... headings will automatically generate the Table of it content.',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-amber max-w-none min-h-[500px] p-6 outline-none'
      }
    }
  })

  return (
    <div className="w-full bg-[#020610] rounded-xl border border-white/10 overflow-hidden focus-within:border-amber-500/50 transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
