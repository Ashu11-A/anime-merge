import {Pathnames} from 'next-intl/navigation'

export const locales = ['pt', 'en'] as const

export const pathnames = {
  '/': '/',
  // '/pathnames': {
  //   en: '/pathnames',
  //   pt: '/pfadnamen'
  // }
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames