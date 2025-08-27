import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reducers
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';
import languageReducer from './slices/languageSlice';
import notificationReducer from './slices/notificationSlice';
import appReducer from './slices/appSlice';

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'user', 'theme', 'language'], // Only persist these reducers
  blacklist: ['notification', 'app'], // Don't persist these reducers
};

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  theme: themeReducer,
  language: languageReducer,
  notification: notificationReducer,
  app: appReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
  devTools: __DEV__,
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

