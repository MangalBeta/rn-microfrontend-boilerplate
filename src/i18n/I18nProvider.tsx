import React, {createContext, useContext, useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@store/index';
import {setLanguage} from '@store/slices/languageSlice';
import i18n, {availableLanguages} from './i18n';

interface I18nContextType {
  currentLanguage: string;
  availableLanguages: typeof availableLanguages;
  changeLanguage: (languageCode: string) => Promise<void>;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({children}) => {
  const dispatch = useDispatch();
  const {currentLanguage, isRTL} = useSelector((state: RootState) => state.language);

  // Update i18n language when Redux state changes
  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  // Listen to i18n language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      if (lng !== currentLanguage) {
        dispatch(setLanguage(lng));
      }
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [currentLanguage, dispatch]);

  const changeLanguage = async (languageCode: string): Promise<void> => {
    try {
      await i18n.changeLanguage(languageCode);
      dispatch(setLanguage(languageCode));
    } catch (error) {
      console.error('Failed to change language:', error);
      throw error;
    }
  };

  const contextValue: I18nContextType = {
    currentLanguage,
    availableLanguages,
    changeLanguage,
    isRTL,
  };

  return (
    <I18nextProvider i18n={i18n}>
      <I18nContext.Provider value={contextValue}>
        {children}
      </I18nContext.Provider>
    </I18nextProvider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export default I18nProvider;

