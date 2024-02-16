'use client'
import { mdiBrush, mdiInformationOutline, mdiChevronRight, mdiEarth } from '@mdi/js'
import Icon from '@mdi/react'
import { Card, CardHeader } from '@nextui-org/react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SettingsPage() {
  const t = useTranslations()
  const locate = useLocale()
  const [isHovered, setHovered] = useState<Record<string, boolean>>()

  const settings = [
    {
      path: 'preferences',
      icon: mdiBrush
    },
    {
      path: 'discovery',
      icon: mdiEarth,
      locate: 'DashBar'
    },
    {
      path: 'about',
      icon: mdiInformationOutline
    }
  ]
  const router = useRouter()
  return (
    <>
      {settings.map((values) => (
        <Card className='max-w-full mt-5' key={values.path} isPressable onPress={() =>  router.push(`/${locate}/settings/${values.path}`) }>
          <CardHeader className='flex gap-3' onMouseOver={() => setHovered({ [values.path]: true })} onMouseOut={() => setHovered({ [values.path]: false })}>
            <Icon path={values.icon} size={1} className='m-2'/>
            <div className='flex flex-col ml-1 items-start justify-start text-start'>
              <p className='text-medium'>{values.locate ? t(`${values.locate}.${values.path}`)  :t(`Settings.name.${values.path}`)}</p>
              <p className='text-small text-default-500'>{t(`Settings.description.${values.path}`)}</p>
            </div>
            <motion.div
              className='absolute right-0 mr-8'
              initial={false}
              animate={{ x: isHovered?.[values.path] ? 10 : 0 }}
            >
              <Icon path={mdiChevronRight} size={1} />
            </motion.div>
          </CardHeader>
        </Card>
      ))}
    </>
  )
}