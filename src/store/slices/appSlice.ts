import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dimensions} from 'react-native';

// Types
interface AppState {
  isInitialized: boolean;
  isOnline: boolean;
  isFirstLaunch: boolean;
  appVersion: string;
  buildNumber: string;
  deviceInfo: {
    width: number;
    height: number;
    isTablet: boolean;
    platform: 'ios' | 'android';
    osVersion: string;
  };
  orientation: 'portrait' | 'landscape';
  keyboardVisible: boolean;
  activeModal: string | null;
  loading: {
    global: boolean;
    message?: string;
  };
  error: {
    global: string | null;
    network: string | null;
  };
  toast: {
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration: number;
  } | null;
}

// Get initial dimensions
const {width, height} = Dimensions.get('window');
const isTablet = Math.min(width, height) >= 768;

// Initial state
const initialState: AppState = {
  isInitialized: false,
  isOnline: true,
  isFirstLaunch: true,
  appVersion: '1.0.0',
  buildNumber: '1',
  deviceInfo: {
    width,
    height,
    isTablet,
    platform: 'ios', // Will be updated on app init
    osVersion: '',
  },
  orientation: width > height ? 'landscape' : 'portrait',
  keyboardVisible: false,
  activeModal: null,
  loading: {
    global: false,
  },
  error: {
    global: null,
    network: null,
  },
  toast: null,
};

// Slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
      if (action.payload) {
        state.error.network = null;
      }
    },
    setFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    setAppVersion: (state, action: PayloadAction<{version: string; buildNumber: string}>) => {
      state.appVersion = action.payload.version;
      state.buildNumber = action.payload.buildNumber;
    },
    setDeviceInfo: (state, action: PayloadAction<Partial<AppState['deviceInfo']>>) => {
      state.deviceInfo = {...state.deviceInfo, ...action.payload};
    },
    setOrientation: (state, action: PayloadAction<'portrait' | 'landscape'>) => {
      state.orientation = action.payload;
    },
    setKeyboardVisible: (state, action: PayloadAction<boolean>) => {
      state.keyboardVisible = action.payload;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
    setGlobalLoading: (state, action: PayloadAction<{loading: boolean; message?: string}>) => {
      state.loading.global = action.payload.loading;
      state.loading.message = action.payload.message;
    },
    setGlobalError: (state, action: PayloadAction<string | null>) => {
      state.error.global = action.payload;
    },
    setNetworkError: (state, action: PayloadAction<string | null>) => {
      state.error.network = action.payload;
    },
    clearErrors: state => {
      state.error.global = null;
      state.error.network = null;
    },
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type?: 'success' | 'error' | 'warning' | 'info';
        duration?: number;
      }>
    ) => {
      state.toast = {
        visible: true,
        message: action.payload.message,
        type: action.payload.type || 'info',
        duration: action.payload.duration || 3000,
      };
    },
    hideToast: state => {
      state.toast = null;
    },
    updateDimensions: (state, action: PayloadAction<{width: number; height: number}>) => {
      state.deviceInfo.width = action.payload.width;
      state.deviceInfo.height = action.payload.height;
      state.deviceInfo.isTablet = Math.min(action.payload.width, action.payload.height) >= 768;
      state.orientation = action.payload.width > action.payload.height ? 'landscape' : 'portrait';
    },
    resetApp: state => {
      // Reset to initial state but keep device info
      const deviceInfo = state.deviceInfo;
      const appVersion = state.appVersion;
      const buildNumber = state.buildNumber;
      
      Object.assign(state, initialState);
      state.deviceInfo = deviceInfo;
      state.appVersion = appVersion;
      state.buildNumber = buildNumber;
      state.isFirstLaunch = false;
    },
  },
});

export const {
  setInitialized,
  setOnlineStatus,
  setFirstLaunch,
  setAppVersion,
  setDeviceInfo,
  setOrientation,
  setKeyboardVisible,
  setActiveModal,
  setGlobalLoading,
  setGlobalError,
  setNetworkError,
  clearErrors,
  showToast,
  hideToast,
  updateDimensions,
  resetApp,
} = appSlice.actions;

// Selectors
export const selectIsInitialized = (state: {app: AppState}) => state.app.isInitialized;
export const selectIsOnline = (state: {app: AppState}) => state.app.isOnline;
export const selectIsFirstLaunch = (state: {app: AppState}) => state.app.isFirstLaunch;
export const selectDeviceInfo = (state: {app: AppState}) => state.app.deviceInfo;
export const selectOrientation = (state: {app: AppState}) => state.app.orientation;
export const selectKeyboardVisible = (state: {app: AppState}) => state.app.keyboardVisible;
export const selectActiveModal = (state: {app: AppState}) => state.app.activeModal;
export const selectGlobalLoading = (state: {app: AppState}) => state.app.loading;
export const selectGlobalError = (state: {app: AppState}) => state.app.error.global;
export const selectNetworkError = (state: {app: AppState}) => state.app.error.network;
export const selectToast = (state: {app: AppState}) => state.app.toast;

export default appSlice.reducer;

