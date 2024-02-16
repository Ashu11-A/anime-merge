'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/navigation'
import { DashBar } from '../components/DashBar'
import { ReactNode, useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { clientAnilist } from '@/lib/anilist'

type Props = {
  children: ReactNode
}

export function Providers({ children }: Props) {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const collapsed = localStorage.getItem('collapsed')
    setIsCollapsed(JSON.parse(collapsed ?? 'false'))
  }, [])

  return (
    <NextUIProvider navigate={router.push}>
      <ThemeProvider attribute='class' defaultTheme='dark'>
        <ApolloProvider client={clientAnilist}>
          <main className='flex h-screen w-screen'>
            <DashBar />
            <div className={`flex-1 z-0 ${isCollapsed ? 'ml-96' : 'ml-10'} rounded-l-2xl overflow-y-auto text-foreground bg-transparent dark:bg-black light:bg-white`}>
              {children}
            </div>
          </main>
        </ApolloProvider>
      </ThemeProvider>
    </NextUIProvider>
  )
}