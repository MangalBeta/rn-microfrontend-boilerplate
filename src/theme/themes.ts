import {Theme} from '@types/microfrontend';

// Light Theme
export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    error: '#FF3B30',
    warning: '#FF9500',
    success: '#34C759',
    info: '#007AFF',
    text: '#000000',
    textSecondary: '#6C757D',
    border: '#E5E5EA',
    disabled: '#C7C7CC',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    h2: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 36,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    h5: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 24,
    },
    h6: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 22,
    },
    body1: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 20,
    },
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    round: 50,
  },
};

// Dark Theme
export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    error: '#FF453A',
    warning: '#FF9F0A',
    success: '#30D158',
    info: '#64D2FF',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    disabled: '#48484A',
  },
  spacing: lightTheme.spacing, // Same spacing for both themes
  typography: lightTheme.typography, // Same typography for both themes
  borderRadius: lightTheme.borderRadius, // Same border radius for both themes
};

// Theme variants
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type ThemeName = keyof typeof themes;

