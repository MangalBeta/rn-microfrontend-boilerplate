console.log('🟡 App starting...');

import React, {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

// Store
import {store, persistor} from '@store/index';

// Providers
import {ThemeProvider} from '@theme/ThemeProvider';
import {I18nProvider} from '@i18n/I18nProvider';

// Navigation
import RootNavigator from '@navigation/RootNavigator';

// Components
import LoadingScreen from '@components/LoadingScreen';

// Utils
import {setupNotifications} from '@services/NotificationService';
import {initializeApp} from '@utils/AppInitializer';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'VirtualizedLists should never be nested',
]);

const App: React.FC = () => {
  useEffect(() => {
    const initApp = async () => {
      try {
              console.log('🟡 Initializing app...');

        // Initialize app services
        await initializeApp();
        
        // Setup notifications
        await setupNotifications();
        
        // Hide splash screen
        SplashScreen.hide();
      } catch (error) {
        console.error('App initialization error:', error);
        SplashScreen.hide();
      }
    };

    initApp();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate  persistor={persistor}>
        <ThemeProvider>
          <I18nProvider>
            <NavigationContainer>
              <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
              />
              <RootNavigator />
            </NavigationContainer>
          </I18nProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

