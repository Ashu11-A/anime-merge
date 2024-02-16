'use client'
import LanguageSelect from '@/components/LanguageSelect'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { mdiBrush, mdiTranslate } from '@mdi/js'
import Icon from '@mdi/react'
import { Card, CardHeader } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

export default function SettingsPage() {
  const t = useTranslations('Settings')
  const settings = [
    {
      name: 'theme',
      icon: mdiBrush,
      component: <ThemeSwitcher />
    },
    {
      name: 'language',
      icon: mdiTranslate,
      component: <LanguageSelect />
    }
  ]
  return (
    <>
      {settings.map((values) => (
        <Card className='max-w-full mt-5' key={values.name}>
          <CardHeader className='flex flex-row gap-3'>
            <Icon path={values.icon} size={1} className='m-2'/>
            <div className='flex flex-col ml-1 items-start justify-start text-start'>
              <p className='text-medium'>{t(`name.${values.name}`)}</p>
              <p className='text-small text-ellipsis overflow-hidden truncate sm:hidden md:block'>{t(`description.${values.name}`)}</p>
            </div>
            <div className='absolute right-0 w-60 sm:w-24 md:w-48 mr-1'>
              {values.component}
            </div>
          </CardHeader>
        </Card>
      ))}
    </>
  )
}