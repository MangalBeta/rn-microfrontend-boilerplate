import { MicrofrontendModule } from '@types/microfrontend';

const ShopModule: MicrofrontendModule = {
  name: 'shop',
  screens: {
    ShopList: require('./screens/shopList').default,
   
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

export default ShopModule;

