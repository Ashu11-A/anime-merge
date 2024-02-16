'use client'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const locate = useLocale()

  return (
    <div className='flex flex-col m-5 select-none pt-12 md:px-24 ld:px-36 lg:px-40 xl:px-48 px-48'>
      <Breadcrumbs maxItems={5}>
        {usePathname().split('/').map((path) => {
          path = path.replace(`/${locate}`, '')
          return <BreadcrumbItem href={locate === path ? '/' : `/${locate}/${path}`} key={path} size='lg'>{path}</BreadcrumbItem>
        })}
      </Breadcrumbs>
      {children}  
    </div>
  )
}