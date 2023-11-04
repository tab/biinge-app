import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "config/locales/en/translation.json"

import { DEFAULT_LOCALE, NODE_ENV } from "config"

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: { en },
  lng: "en",
  fallbackLng: DEFAULT_LOCALE,
  debug: NODE_ENV === "development",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  returnNull: false,
})

export default i18n
