import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getChat } from '@/app/actions'
import { Chat } from '../components/chat'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

//export const runtime = 'edge'
//export const preferredRegion = 'home'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect(`/login`)
  }

  const chat = await getChat(params.id, session.user.id)

  if (!chat) {
    notFound()
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}
