'use client'
import { mdiGithub, mdiInformationVariantCircleOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { Card, CardHeader, Link, Image, Divider } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { open } from '@tauri-apps/api/shell'
import NextImage from 'next/image'

export default function AboutPage() {
  const t = useTranslations('Settings')
  const aboutCart = [
    { name: 'version', icon: mdiInformationVariantCircleOutline }
  ]
  const aboutLinks = [
    { name: 'gitHub', link: 'https://github.com/Ashu11-A/anime-merge', icon: mdiGithub }
  ]

  return (
    <>
      <div className='w-auto h-auto'>
        <div className='flex items-center justify-center text-center'>
          <Image as={NextImage} width={250} height={250} src='/logo.png' alt='Logo Application' className='m-5'/>
        </div>
        <Divider />
        {aboutCart.map((about) => (
          <Card key={about.name} className='max-w-full mt-5'>
            <CardHeader className='flex flex-row gap-3'>
              <Icon path={about.icon} size={1} className='m-2' />
              <div>
                <p className='text-base'>{t(`name.${about.name}`)}</p>
                <p className='text-tiny'>{t(`description.${about.name}`, { version: '0.1.0', date: new Date().toDateString() })}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
        <footer className='mt-5'>
          {aboutLinks.map((about) => (
            <Link onClick={() => { console.log('clicou'); open(about.link) } } key={about.name} className='flex flex-row gap-2 items-center justify-center'>
              <Icon path={about.icon} size={2} className='text-white p-2' />
            </Link>
          ))}
        </footer>
      </div>
    </>
  )
}