import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';

// Import translation files
import en from './locales/en.json';

// Get device language
const getDeviceLanguage = (): string => {
  const locales = getLocales();
  if (locales && locales.length > 0) {
    return locales[0].languageCode;
  }
  return 'en';
};

// Available languages
export const availableLanguages = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    translation: en,
  },
  // Add more languages here as needed
  // es: {
  //   name: 'Spanish',
  //   nativeName: 'Español',
  //   flag: '🇪🇸',
  //   translation: es,
  // },
};

// Resources for i18next
const resources = Object.entries(availableLanguages).reduce(
  (acc, [key, value]) => {
    acc[key] = {
      translation: value.translation,
    };
    return acc;
  },
  {} as any,
);

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    debug: __DEV__,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    react: {
      useSuspense: false,
    },
    
    // Namespace configuration
    defaultNS: 'translation',
    ns: ['translation'],
    
    // Key separator
    keySeparator: '.',
    
    // Nested separator
    nsSeparator: ':',
    
    // Pluralization
    pluralSeparator: '_',
    
    // Context separator
    contextSeparator: '_',
    
    // Detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

