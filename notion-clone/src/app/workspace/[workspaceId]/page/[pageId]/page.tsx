"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { WorkspaceLayout } from "@/components/layout/workspace-layout"
import { PageEditor } from "@/components/editor/page-editor"
import { notFound } from "next/navigation"

interface PageViewProps {
  params: Promise<{
    workspaceId: string
    pageId: string
  }>
}

interface PageData {
  id: string
  title: string
  content: string
  workspaceId: string
  userId: string
  createdAt: string
  updatedAt: string
}

export default async function PageView({ params }: PageViewProps) {
  const { workspaceId, pageId } = await params
  const { data: session } = useSession()
  const [pageData, setPageData] = useState<PageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFoundPage, setNotFoundPage] = useState(false)

  useEffect(() => {
    // Load page data from localStorage for demo
    const loadPage = () => {
      try {
        const pages = JSON.parse(localStorage.getItem("notion-pages") || "[]")
        const page = pages.find((p: PageData) => p.id === pageId)
        
        if (page) {
          setPageData(page)
        } else {
          setNotFoundPage(true)
        }
      } catch (error) {
        console.error("Failed to load page:", error)
        setNotFoundPage(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadPage()
  }, [pageId])

  const handleSave = async (title: string, content: string) => {
    if (!session?.user || !pageData) return

    try {
      const updatedPage = {
        ...pageData,
        title: title.trim(),
        content,
        updatedAt: new Date().toISOString(),
      }

      // Update in localStorage for demo
      const pages = JSON.parse(localStorage.getItem("notion-pages") || "[]")
      const pageIndex = pages.findIndex((p: PageData) => p.id === pageId)
      
      if (pageIndex !== -1) {
        pages[pageIndex] = updatedPage
        localStorage.setItem("notion-pages", JSON.stringify(pages))
        setPageData(updatedPage)
      }
    } catch (error) {
      console.error("Failed to save page:", error)
    }
  }

  if (notFoundPage) {
    notFound()
  }

  if (isLoading) {
    return (
      <WorkspaceLayout workspaceId={workspaceId}>
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </WorkspaceLayout>
    )
  }

  if (!session) {
    return (
      <WorkspaceLayout workspaceId={workspaceId}>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600">Please sign in to view this page.</p>
          </div>
        </div>
      </WorkspaceLayout>
    )
  }

  if (!pageData) {
    return (
      <WorkspaceLayout workspaceId={workspaceId}>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600">The page you're looking for doesn't exist.</p>
          </div>
        </div>
      </WorkspaceLayout>
    )
  }

  return (
    <WorkspaceLayout workspaceId={workspaceId}>
      <PageEditor
        pageId={pageData.id}
        initialTitle={pageData.title}
        initialContent={pageData.content}
        onSave={handleSave}
        className="h-full"
      />
    </WorkspaceLayout>
  )
}