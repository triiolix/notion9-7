"use client"

import { useState, useEffect } from "react"
import { BlockEditor } from "./block-editor"
import { cn } from "@/lib/utils"

interface PageEditorProps {
  pageId?: string
  initialTitle?: string
  initialContent?: string
  onSave?: (title: string, content: string) => void
  className?: string
}

export function PageEditor({
  pageId,
  initialTitle = "",
  initialContent = "",
  onSave,
  className,
}: PageEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [icon, setIcon] = useState("📄")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setTitle(initialTitle)
    setContent(initialContent)
  }, [initialTitle, initialContent])

  const handleSave = async () => {
    if (!onSave) return
    
    setIsSaving(true)
    try {
      await onSave(title, content)
    } catch (error) {
      console.error("Failed to save page:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // Auto-save after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        handleSave()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [title, content])

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      // Focus on the editor
      const editor = document.querySelector(".ProseMirror") as HTMLElement
      if (editor) {
        editor.focus()
      }
    }
  }

  const handleIconClick = () => {
    const emojis = ["📄", "📝", "📊", "📈", "📋", "💼", "🎯", "🚀", "💡", "⭐"]
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
    setIcon(randomEmoji)
  }

  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={handleIconClick}
            className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors"
            title="Change icon"
          >
            {icon}
          </button>
          {isSaving && (
            <div className="text-xs text-gray-500 animate-pulse">
              Saving...
            </div>
          )}
        </div>
        
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleTitleKeyDown}
          placeholder="Untitled"
          className="w-full text-4xl font-bold placeholder-gray-400 border-none outline-none bg-transparent resize-none"
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <BlockEditor
            content={content}
            onChange={setContent}
            placeholder="Start writing, or type '/' for commands..."
            className="min-h-[calc(100vh-300px)] border-none p-0"
          />
        </div>
      </div>
    </div>
  )
}