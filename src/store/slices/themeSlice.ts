import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';

// Types
type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  systemTheme: 'light' | 'dark';
}

// Initial state
const systemColorScheme = Appearance.getColorScheme();
const initialState: ThemeState = {
  mode: 'auto',
  isDark: systemColorScheme === 'dark',
  systemTheme: systemColorScheme || 'light',
};

// Helper function to determine if theme should be dark
const shouldUseDarkTheme = (mode: ThemeMode, systemTheme: 'light' | 'dark'): boolean => {
  switch (mode) {
    case 'dark':
      return true;
    case 'light':
      return false;
    case 'auto':
      return systemTheme === 'dark';
    default:
      return false;
  }
};

// Slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      state.isDark = shouldUseDarkTheme(action.payload, state.systemTheme);
    },
    setSystemTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.systemTheme = action.payload;
      state.isDark = shouldUseDarkTheme(state.mode, action.payload);
    },
    toggleTheme: state => {
      if (state.mode === 'auto') {
        // If in auto mode, switch to opposite of current system theme
        state.mode = state.systemTheme === 'dark' ? 'light' : 'dark';
      } else {
        // If in manual mode, toggle between light and dark
        state.mode = state.mode === 'dark' ? 'light' : 'dark';
      }
      state.isDark = shouldUseDarkTheme(state.mode, state.systemTheme);
    },
    resetTheme: state => {
      state.mode = 'auto';
      state.isDark = shouldUseDarkTheme('auto', state.systemTheme);
    },
  },
});

export const {setThemeMode, setSystemTheme, toggleTheme, resetTheme} = themeSlice.actions;

export default themeSlice.reducer;

