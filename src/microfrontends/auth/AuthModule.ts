import {MicrofrontendModule} from '@types/microfrontend';
import LoginScreen from './screens/LoginScreen';

const AuthModule: MicrofrontendModule = {
  name: 'auth',
  version: '1.0.0',
  component: LoginScreen,
  routes: [
    {
      name: 'Login',
      path: '/auth/login',
      component: LoginScreen,
    },
  ],
  permissions: ['auth:login', 'auth:signup'],
  lazy: false,
};

export default AuthModule;

