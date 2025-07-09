"use client"

import { SessionProvider } from "next-auth/react"
import { Sidebar } from "@/components/navigation/sidebar"

interface WorkspaceLayoutProps {
  children: React.ReactNode
  workspaceId: string
  pages?: any[]
}

export function WorkspaceLayout({ 
  children, 
  workspaceId, 
  pages = [] 
}: WorkspaceLayoutProps) {
  return (
    <SessionProvider>
      <div className="flex h-screen bg-white">
        <Sidebar currentWorkspaceId={workspaceId} pages={pages} />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}