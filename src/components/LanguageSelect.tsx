import { usePathname, useRouter } from '@/navigation'
import { Avatar, Select, SelectItem, Skeleton } from '@nextui-org/react'
import { ChangeEvent, startTransition, useEffect, useState } from 'react'

export default function LanguageSelect() {
  const [language, setLanguage] = useState<string | undefined>()
  const router = useRouter()
  const pathName = usePathname()
  const languages = [
    {
      label: 'Portuguese (Brazil)',
      emoji: 'br',
      value: 'pt'
    },
    {
      label: 'English',
      emoji: 'us',
      value: 'en'
    }
  ]

  useEffect(() => {
    const lang = window.localStorage.getItem('lang')
    setLanguage(lang ?? 'en')
  }, [])

  function changeLocate(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocate = event.target.value
    startTransition(() => {
      router.replace(pathName, { locale: nextLocate })
      router.refresh()
    })
  }

  return (
    <div className='w-full flex flex-row flex-wrap gap-4'>
      {language === undefined
        ? <Skeleton className="rounded-2xl">
          <div className="w-48 h-14 rounded-2xl"></div>
        </Skeleton>
        : <Select
          items={languages}
          key='select-language'
          label='Language'
          radius='lg'
          isRequired
          defaultSelectedKeys={[language ?? 'en']}
          className='max-w-xl'
          onSelectionChange={(values) => new Set(values).forEach((value) => {
            window.localStorage.setItem('lang', typeof value === 'string' ? value : 'pt')
          })}
          onChange={changeLocate}
        >
          {languages.map((language) => (
            <SelectItem
              key={language.value}
              startContent={<Avatar alt={language.label} className='w-6 h-6' src={`https://flagcdn.com/${language.emoji}.svg`} />}>
              {language.label}
            </SelectItem>
          ))}
        </Select>
      }
    </div>
  )
}