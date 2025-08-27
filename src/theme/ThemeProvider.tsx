import React, {createContext, useContext, useEffect} from 'react';
import {Appearance, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Theme} from '@types/microfrontend';
import {themes} from './themes';
import {RootState} from '@store/index';
import {setSystemTheme} from '@store/slices/themeSlice';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark' | 'auto') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const dispatch = useDispatch();
  const {mode, isDark, systemTheme} = useSelector((state: RootState) => state.theme);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      dispatch(setSystemTheme(colorScheme || 'light'));
    });

    return () => subscription?.remove();
  }, [dispatch]);

  // Update status bar style based on theme
  useEffect(() => {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content', true);
  }, [isDark]);

  // Get current theme based on mode and system preference
  const getCurrentTheme = (): Theme => {
    return isDark ? themes.dark : themes.light;
  };

  const toggleTheme = () => {
    // This will be handled by the themeSlice toggleTheme action
    // For now, we'll just switch between light and dark
    const newMode = isDark ? 'light' : 'dark';
    // dispatch(setThemeMode(newMode));
  };

  const setTheme = (newMode: 'light' | 'dark' | 'auto') => {
    // dispatch(setThemeMode(newMode));
  };

  const contextValue: ThemeContextType = {
    theme: getCurrentTheme(),
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;

