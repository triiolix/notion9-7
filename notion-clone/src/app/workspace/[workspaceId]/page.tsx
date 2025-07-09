"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { WorkspaceLayout } from "@/components/layout/workspace-layout"
import { Plus, Calendar, Clock, FileText } from "lucide-react"
import Link from "next/link"

interface WorkspacePageProps {
  params: Promise<{
    workspaceId: string
  }>
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceId } = await params
  const { data: session } = useSession()
  const [recentPages, setRecentPages] = useState([])

  // Mock data for demo
  const quickActions = [
    {
      title: "Create a new page",
      description: "Start writing and organizing your thoughts",
      icon: FileText,
      href: `/workspace/${workspaceId}/new`,
    },
    {
      title: "Import content",
      description: "Bring your existing documents into your workspace",
      icon: Plus,
      href: `/workspace/${workspaceId}/import`,
    },
  ]

      return (
      <WorkspaceLayout workspaceId={workspaceId}>
      <div className="h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}! 👋
            </h1>
            <p className="text-gray-600">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <action.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Pages */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Pages</h2>
            {recentPages.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No pages yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Create your first page to get started
                </p>
                <Link
                  href={`/workspace/${workspaceId}/new`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Page
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Recent pages will be rendered here */}
              </div>
            )}
          </div>

          {/* Getting Started */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-2">
                Welcome to your Notion Clone workspace!
              </h3>
              <p className="text-gray-600 mb-4">
                This workspace is where you'll create, organize, and collaborate on all your content. 
                Start by creating your first page or exploring the features.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/workspace/${workspaceId}/new`}
                  className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                >
                  Create a page
                </Link>
                <Link
                  href={`/workspace/${workspaceId}/templates`}
                  className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                >
                  Browse templates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  )
}