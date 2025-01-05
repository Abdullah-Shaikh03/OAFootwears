"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

interface Session {
  id: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  role: string
  expires: string
}

interface Props {
  children: React.ReactNode
  session: Session
}

export default function SessionProvider({ children, session }: Props) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  )
}

