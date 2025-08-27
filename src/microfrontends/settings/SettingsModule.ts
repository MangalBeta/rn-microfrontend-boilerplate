import { MicrofrontendModule } from '@types/microfrontend';

const SettingsModule: MicrofrontendModule = {
  name: 'settings',
  screens: {
    Settings: require('./screens/SettingsScreen').default,
    Language: require('./screens/LanguageScreen').default,
    Theme: require('./screens/ThemeScreen').default,
    About: require('./screens/AboutScreen').default,
  },
  // Add any module-specific components, hooks, services here
  components: {
    // Example: SettingsItem: require('./components/SettingsItem').default,
  },
  hooks: {
    // Example: useSettings: require('./hooks/useSettings').default,
  },
  services: {
    // Example: settingsService: require('./services/SettingsService').default,
  },
};

export default SettingsModule;

