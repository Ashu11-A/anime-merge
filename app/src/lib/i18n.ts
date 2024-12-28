import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enJSON from '../../locales/en/messages.json'
import ptJSON from '../../locales/pt/messages.json'

i18n.use(initReactI18next).init({
  resources: {
    en: enJSON,
    pt: ptJSON,
  },
  lng: 'en',
})