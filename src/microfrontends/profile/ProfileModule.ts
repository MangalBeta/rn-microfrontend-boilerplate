import { MicrofrontendModule } from '@types/microfrontend';

const ProfileModule: MicrofrontendModule = {
  name: 'profile',
  screens: {
    Profile: require('./screens/ProfileScreen').default,
    EditProfile: require('./screens/EditProfileScreen').default,
    ChangePassword: require('./screens/ChangePasswordScreen').default,
  },
  // Add any module-specific components, hooks, services here
  components: {
    // Example: ProfileHeader: require('./components/ProfileHeader').default,
  },
  hooks: {
    // Example: useProfileData: require('./hooks/useProfileData').default,
  },
  services: {
    // Example: profileService: require('./services/ProfileService').default,
  },
};

export default ProfileModule;

