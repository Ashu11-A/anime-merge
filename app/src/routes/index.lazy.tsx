import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t, i18n: {changeLanguage, language} } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'pt' : 'en'
    setCurrentLanguage(newLanguage)
    changeLanguage(newLanguage)
  }
  return <div>
    <div className="App">
      <h1>
       Our Translated Header: 
        {t('headerTitle', { appName: 'App for Translations' })}
      </h1>
      <h3>
       Current Language: {currentLanguage}
      </h3>
      <button 
        type="button" 
        onClick={handleChangeLanguage}
      >
      Change Language
      </button>
    </div>
  </div>
}
