import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '../providers/providers'
import { ReactNode } from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import { locales } from '../config'
import { NextIntlClientProvider, useMessages } from 'next-intl'
const inter = Inter({ subsets: ['latin'] })
type Props = {
  children: ReactNode;
  params: {locale: string};
}

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export async function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

export default function RootLayout({
  children,
  params: {locale}
}: Props) {
  unstable_setRequestLocale(locale)
  const messages = useMessages()
  
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <div className='rounded-l-2xl'>
              {children}
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
