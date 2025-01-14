import * as React from 'react'
import { clearChats } from '@/app/actions'
import { ClearHistory } from './clear-history'
import { Sidebar } from './sidebar'
import { SidebarFooter } from './sidebar-footer'
import { SidebarList } from './sidebar-list'
import { Button } from '@/components/ui/button'
import { IconPlus, IconSidebar } from '@/components/ui/icons'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { cn } from '@/lib/utils'

export const SidebarChat = () => {
  const { data: session } = useSession()
  const userId = session?.user.id
  const [showSidebar, setShowSidebar] = React.useState(true)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return showSidebar ? (
    <div className="h-full w-[20rem] z-20">
      <div className="flex h-full min-h-0 flex-col transition-opacity opacity-100 z-40">
        <div
          className={`block mt-16 fixed top-0 left-0 w-[20rem] h-full bg-background border-r-[1px] border-gray-600 transform transition-transform duration-300 ease-in-out ${
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 flex flex-col h-full w-full scroll">
            <div className="mb-1 flex flex-row gap-2">
              <Link href="/chat" className=" flex-grow overflow-hidden">
                <span className="flex px-3 min-h-[44px] items-center gap-3 text-[15px] rounded-md border">
                  <IconPlus className="h-5 w-5" />
                  New Chat
                </span>
              </Link>
              <Button
                variant="ghost"
                className="h-9 w-9 p-0 flex px-2 min-h-[44px] items-center gap-3 cursor-pointer rounded-md border"
                onClick={toggleSidebar}
              >
                <IconSidebar className="h-6 w-6" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </div>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              <SidebarList userId={userId} />
            </React.Suspense>
            <SidebarFooter>
              <ClearHistory clearChats={clearChats} />
            </SidebarFooter>
            {/* Your sidebar content goes here */}
            {/* You can add any components, lists, or content you want to display in the sidebar */}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full justify-start self-start place-self-start justify-self-start z-30">
      <div className="mt-16 fixed top-0 left-0 w-[2rem]">
        <Button variant="ghost" className="block absolute mt-2" onClick={toggleSidebar}>
          <IconSidebar className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
    </div>
  )
}
