import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getLocales} from 'react-native-localize';

// Types
interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageState {
  currentLanguage: string;
  availableLanguages: Language[];
  isRTL: boolean;
  systemLanguage: string;
}

// Available languages
const availableLanguages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
  },
];

// RTL languages
const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

// Get system language
const getSystemLanguage = (): string => {
  const locales = getLocales();
  if (locales && locales.length > 0) {
    const systemLang = locales[0].languageCode;
    // Check if system language is supported
    const isSupported = availableLanguages.some(lang => lang.code === systemLang);
    return isSupported ? systemLang : 'en';
  }
  return 'en';
};

// Initial state
const systemLanguage = getSystemLanguage();
const initialState: LanguageState = {
  currentLanguage: systemLanguage,
  availableLanguages,
  isRTL: rtlLanguages.includes(systemLanguage),
  systemLanguage,
};

// Helper function to check if language is RTL
const isRTLLanguage = (languageCode: string): boolean => {
  return rtlLanguages.includes(languageCode);
};

// Slice
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      const languageCode = action.payload;
      const isSupported = state.availableLanguages.some(lang => lang.code === languageCode);
      
      if (isSupported) {
        state.currentLanguage = languageCode;
        state.isRTL = isRTLLanguage(languageCode);
      }
    },
    addLanguage: (state, action: PayloadAction<Language>) => {
      const exists = state.availableLanguages.some(lang => lang.code === action.payload.code);
      if (!exists) {
        state.availableLanguages.push(action.payload);
      }
    },
    removeLanguage: (state, action: PayloadAction<string>) => {
      const languageCode = action.payload;
      // Don't allow removing English or current language
      if (languageCode !== 'en' && languageCode !== state.currentLanguage) {
        state.availableLanguages = state.availableLanguages.filter(
          lang => lang.code !== languageCode
        );
      }
    },
    resetToSystemLanguage: state => {
      state.currentLanguage = state.systemLanguage;
      state.isRTL = isRTLLanguage(state.systemLanguage);
    },
    updateSystemLanguage: (state, action: PayloadAction<string>) => {
      state.systemLanguage = action.payload;
    },
  },
});

export const {
  setLanguage,
  addLanguage,
  removeLanguage,
  resetToSystemLanguage,
  updateSystemLanguage,
} = languageSlice.actions;

// Selectors
export const selectCurrentLanguage = (state: {language: LanguageState}) => 
  state.language.currentLanguage;

export const selectAvailableLanguages = (state: {language: LanguageState}) => 
  state.language.availableLanguages;

export const selectIsRTL = (state: {language: LanguageState}) => 
  state.language.isRTL;

export const selectCurrentLanguageInfo = (state: {language: LanguageState}) => 
  state.language.availableLanguages.find(lang => lang.code === state.language.currentLanguage);

export default languageSlice.reducer;

