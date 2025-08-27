import React from 'react';

// Microfrontend Module Interface
export interface MicrofrontendModule {
  name: string;
  version: string;
  component: React.ComponentType<any>;
  routes?: MicrofrontendRoute[];
  dependencies?: string[];
  permissions?: string[];
  lazy?: boolean;
}

// Microfrontend Route Interface
export interface MicrofrontendRoute {
  name: string;
  path: string;
  component: React.ComponentType<any>;
  options?: any;
  permissions?: string[];
}

// Microfrontend Registry
export interface MicrofrontendRegistry {
  [key: string]: MicrofrontendModule;
}

// Microfrontend Context
export interface MicrofrontendContext {
  user?: User;
  theme: Theme;
  language: string;
  permissions: string[];
  navigation: any;
}

// User Interface
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  permissions: string[];
  preferences: UserPreferences;
}

// User Preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: NotificationPreferences;
}

// Notification Preferences
export interface NotificationPreferences {
  push: boolean;
  email: boolean;
  sms: boolean;
  marketing: boolean;
}

// Theme Interface
export interface Theme {
  mode: 'light' | 'dark';
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: ThemeBorderRadius;
}

// Theme Colors
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  text: string;
  textSecondary: string;
  border: string;
  disabled: string;
}

// Theme Spacing
export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

// Theme Typography
export interface ThemeTypography {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  h5: TextStyle;
  h6: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
  caption: TextStyle;
  button: TextStyle;
}

// Text Style
export interface TextStyle {
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing?: number;
}

// Theme Border Radius
export interface ThemeBorderRadius {
  small: number;
  medium: number;
  large: number;
  round: number;
}

// API Response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Loading State
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

// Form Field
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: {label: string; value: any}[];
  validation?: any;
}

