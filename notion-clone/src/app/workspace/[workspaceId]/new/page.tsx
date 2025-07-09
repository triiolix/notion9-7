"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { WorkspaceLayout } from "@/components/layout/workspace-layout"
import { PageEditor } from "@/components/editor/page-editor"
import { generateId } from "@/lib/utils"

interface NewPageProps {
  params: Promise<{
    workspaceId: string
  }>
}

export default async function NewPage({ params }: NewPageProps) {
  const { workspaceId } = await params
  const { data: session } = useSession()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (title: string, content: string) => {
    if (!session?.user || !title.trim()) return

    setIsSaving(true)
    try {
      // For demo purposes, we'll simulate saving to localStorage
      const pageId = generateId()
      const pageData = {
        id: pageId,
        title: title.trim(),
        content,
        workspaceId: workspaceId,
        userId: (session.user as any).id || "demo-user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Save to localStorage for demo
      const existingPages = JSON.parse(localStorage.getItem("notion-pages") || "[]")
      existingPages.push(pageData)
      localStorage.setItem("notion-pages", JSON.stringify(existingPages))

      // Redirect to the new page
      router.push(`/workspace/${workspaceId}/page/${pageId}`)
    } catch (error) {
      console.error("Failed to save page:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (!session) {
    return (
      <WorkspaceLayout workspaceId={workspaceId}>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600">Please sign in to create a page.</p>
          </div>
        </div>
      </WorkspaceLayout>
    )
  }

  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <PageEditor
        initialTitle=""
        initialContent=""
        onSave={handleSave}
        className="h-full"
      />
    </WorkspaceLayout>
  )
}