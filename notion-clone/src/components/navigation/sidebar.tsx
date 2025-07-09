"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { 
  FileText, 
  Settings, 
  Plus, 
  ChevronDown, 
  ChevronRight, 
  Users,
  Search,
  Home,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Page {
  id: string
  title: string
  icon?: string
  children?: Page[]
}

interface SidebarProps {
  currentWorkspaceId?: string
  pages?: Page[]
}

export function Sidebar({ currentWorkspaceId, pages = [] }: SidebarProps) {
  const { data: session } = useSession()
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set())

  const togglePageExpansion = (pageId: string) => {
    const newExpanded = new Set(expandedPages)
    if (newExpanded.has(pageId)) {
      newExpanded.delete(pageId)
    } else {
      newExpanded.add(pageId)
    }
    setExpandedPages(newExpanded)
  }

  const renderPage = (page: Page, level = 0) => {
    const hasChildren = page.children && page.children.length > 0
    const isExpanded = expandedPages.has(page.id)

    return (
      <div key={page.id}>
        <div
          className={cn(
            "flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer text-sm",
            level > 0 && "ml-4"
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => togglePageExpansion(page.id)}
              className="hover:bg-gray-200 rounded p-0.5"
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-4" />}
          
          <Link
            href={`/workspace/${currentWorkspaceId}/page/${page.id}`}
            className="flex items-center gap-2 flex-1 truncate"
          >
            <span className="text-lg">{page.icon || "📄"}</span>
            <span className="truncate">{page.title}</span>
          </Link>
        </div>
        
        {isExpanded && hasChildren && (
          <div>
            {page.children!.map((childPage) => renderPage(childPage, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      {/* User Section */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white font-medium">
            {session?.user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 truncate">
            <div className="font-medium text-sm truncate">
              {session?.user?.name || "User"}
            </div>
            <div className="text-xs text-gray-500 truncate">
              Personal
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-2 space-y-1">
        <Link
          href={`/workspace/${currentWorkspaceId}`}
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 text-sm"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
        
        <Link
          href={`/workspace/${currentWorkspaceId}/search`}
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 text-sm"
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </Link>
        
        <Link
          href={`/workspace/${currentWorkspaceId}/settings`}
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 text-sm"
        >
          <Settings className="h-4 w-4" />
          <span>Settings & Members</span>
        </Link>
      </div>

      {/* Pages Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Pages
            </span>
            <Link
              href={`/workspace/${currentWorkspaceId}/new`}
              className="hover:bg-gray-200 rounded p-1"
            >
              <Plus className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-0.5">
            {pages.map((page) => renderPage(page))}
          </div>
          
          {pages.length === 0 && (
            <div className="text-sm text-gray-500 px-2 py-4">
              No pages yet. Create your first page!
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 text-sm w-full"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}