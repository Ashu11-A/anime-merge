'use client'

import { useTheme } from 'next-themes'
import { Select, SelectItem, Skeleton } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [themeCache, setThemeCache] = useState<string | undefined>()

  const themes = [
    // { label: 'Roxo', value: 'purple-dark' },
    { label: 'Claro', value: 'light' },
    { label: 'Escuro', value: 'dark' }
  ]
  useEffect(() => {
    if (themeCache) setTheme(themeCache)
  }, [setTheme, themeCache])

  useEffect(() => {
    const theme = window.localStorage.getItem('theme')
    setThemeCache(theme ?? 'dark')
  }, [])

  return (
    <div className='w-full flex flex-row flex-wrap gap-4'>
      {themeCache === undefined
        ? <Skeleton className="rounded-2xl">
          <div className="w-48 h-14 rounded-2xl"></div>
        </Skeleton>
        : <Select
          items={themes}
          key='select-theme'
          label='Tema'
          radius='lg'
          isRequired
          defaultSelectedKeys={[theme ?? 'dark']}
          className='max-w-xs'
          onSelectionChange={(values) => (new Set(values).forEach((value) => {
            console.log(value)
            setTheme(typeof value === 'string' ? value : 'dark')
            window.localStorage.setItem('theme', String(value))
          }))}
        >
          {themes.map((theme) => (<SelectItem key={theme.value}>{theme.label}</SelectItem>))}
        </Select>
      }
    </div>
  )
}