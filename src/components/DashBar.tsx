'use client'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { Icon } from '@mdi/react'
import { mdiEarth, mdiCog, mdiViewHeadline } from '@mdi/js'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function DashBar() {
  const t = useTranslations('DashBar')
  const [isAnimated, setIsAnimated] = useState<Record<string, boolean>>({})
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleClick = (name: string) => {
    setIsAnimated({
      ...isAnimated,
      [name]: !isAnimated[name]
    })
    console.log(isAnimated)
  }

  const sideOpen = () => {
    const sideBarInfo = (JSON.parse(localStorage.getItem('collapsed') ?? 'true') === true) ?? false
    localStorage.setItem('collapsed', String(!sideBarInfo))
    setIsCollapsed(!sideBarInfo)
  }

  const menuItens = [
    {
      name: 'sidebar',
      icon: mdiViewHeadline,
      function: sideOpen
    },
    {
      path: '/',
      name: 'discovery',
      icon: mdiEarth
    }
  ]

  const sideItens = [
    {
      path: '/settings',
      name: 'settings',
      icon: mdiCog
    }
  ]

  return (
    <div className={`z-50 fixed rounded-r-2xl ${isCollapsed ? 'min-w-80' : 'max-w-14'} h-[100vh] flex flex-col justify-between bg-transparent dark:bg-neutral-950 light:bg-cyan-200`}>
      <Listbox className='flex p-2 mt-10 items-center justify-center'>
        {menuItens.map((item) => (
          <ListboxItem
            key={item.name}
            href={isCollapsed ? item.path : undefined}
            onClick={() => {
              {item?.function
                ? item?.function()
                : handleClick(item.name)
              }
             
            }}
            startContent={
              <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: isAnimated[item.name] ? 180 : 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20
                }}
              >
                <Icon path={item.icon} size={1} />
              </motion.div>
            }>
            {isCollapsed && item?.function === undefined && t(item.name)}
          </ListboxItem>
        ))}
      </Listbox>
      <Listbox className='flex p-2 mt-10 items-center justify-center'>
        {sideItens.map((item) => (
          <ListboxItem
            key={item.name}
            href={item.path}
            onClick={() => handleClick(item.name)}
            startContent={
              <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: isAnimated[item.name] ? 180 : 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20
                }}
              >
                <Icon path={item.icon} size={1} />
              </motion.div>
            }>
            {isCollapsed && t(item.name)}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  )
}
