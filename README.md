# React Native 0.80 Starter Kit with Microfrontend Architecture

A comprehensive React Native starter kit featuring microfrontend architecture, authentication, navigation, theming, multi-language support, and much more.

## 🚀 Features

### Core Architecture
- **React Native 0.80** - Latest stable version
- **Microfrontend Architecture** - Modular, scalable app structure
- **TypeScript** - Full type safety and better development experience
- **Metro Configuration** - Optimized for microfrontend support

### Navigation & UI
- **React Navigation 6** - Complete navigation solution
  - Stack Navigator
  - Bottom Tab Navigator
  - Drawer Navigator
- **Splash Screen** - Professional app launch experience
- **Responsive Design** - Works on phones and tablets
- **Vector Icons** - Feather icons included

### State Management
- **Redux Toolkit** - Modern Redux with less boilerplate
- **Redux Persist** - Automatic state persistence
- **Async Storage** - Local data storage
- **Secure Storage** - Keychain/Keystore integration

### Authentication & Security
- **Complete Auth Flow** - Login, signup, password reset
- **JWT Token Management** - Automatic token refresh
- **Biometric Authentication** - Fingerprint/Face ID support
- **Secure Storage** - Sensitive data protection
- **Form Validation** - Comprehensive input validation

### Theming & Localization
- **Dark/Light Theme** - System-aware theme switching
- **Multi-language Support** - i18next integration
- **RTL Support** - Right-to-left language support
- **Theme Provider** - Centralized theme management

### Notifications
- **Push Notifications** - Firebase Cloud Messaging
- **Local Notifications** - In-app notification system
- **Notification Management** - Read/unread states, actions
- **Permission Handling** - Proper permission requests

### API & Services
- **Axios HTTP Client** - Robust API communication
- **Request/Response Interceptors** - Automatic token handling
- **Error Handling** - Comprehensive error management
- **File Upload/Download** - Progress tracking included

### Development Tools
- **ESLint & Prettier** - Code formatting and linting
- **Flipper Integration** - Advanced debugging
- **Environment Configuration** - Multiple environment support
- **Custom Hooks** - Reusable logic components

## 📱 Screenshots

*Screenshots would be added here showing the app in action*

## 🛠 Installation

### Prerequisites

- Node.js (>= 16.0.0)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ReactNativeStarterKit
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run the application**
   ```bash
   # iOS
   npm run ios
   # or
   yarn ios

   # Android
   npm run android
   # or
   yarn android
   ```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components
│   ├── forms/           # Form components
│   └── navigation/      # Navigation components
├── hooks/               # Custom React hooks
├── i18n/               # Internationalization
│   ├── locales/        # Translation files
│   └── hooks/          # i18n hooks
├── microfrontends/     # Microfrontend modules
│   ├── auth/           # Authentication module
│   ├── profile/        # Profile module
│   ├── settings/       # Settings module
│   └── notifications/  # Notifications module
├── navigation/         # Navigation configuration
│   └── stacks/         # Stack navigators
├── screens/            # Screen components
├── services/           # API and external services
├── store/              # Redux store and slices
│   └── slices/         # Redux slices
├── theme/              # Theme configuration
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🏗 Microfrontend Architecture

This starter kit implements a microfrontend architecture that allows for:

- **Modular Development** - Each feature is a separate module
- **Independent Deployment** - Modules can be updated independently
- **Team Scalability** - Different teams can work on different modules
- **Code Reusability** - Modules can be shared across projects

### Module Structure

Each microfrontend module contains:
- **Screens** - UI components for the module
- **Components** - Reusable components specific to the module
- **Hooks** - Custom hooks for the module
- **Services** - API services for the module
- **Types** - TypeScript definitions for the module

### Adding a New Module

1. Create module directory in `src/microfrontends/`
2. Implement the module interface
3. Register the module in the registry
4. Add navigation routes
5. Update permissions if needed

## 🔐 Authentication

The authentication system includes:

- **Login/Signup** - Email and password authentication
- **Password Reset** - Forgot password functionality
- **Token Management** - Automatic JWT token refresh
- **Biometric Auth** - Fingerprint/Face ID support
- **Session Management** - Automatic logout on token expiry

### Usage Example

```typescript
import {useDispatch} from 'react-redux';
import {login} from '@store/slices/authSlice';

const handleLogin = async () => {
  try {
    await dispatch(login({
      email: 'user@example.com',
      password: 'password123'
    })).unwrap();
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## 🎨 Theming

The theming system supports:

- **Light/Dark Modes** - Automatic system theme detection
- **Custom Themes** - Easy theme customization
- **Theme Provider** - React context for theme access
- **Responsive Design** - Adaptive layouts for different screen sizes

### Theme Usage

```typescript
import {useTheme} from '@theme/ThemeProvider';

const MyComponent = () => {
  const {theme, isDark, toggleTheme} = useTheme();
  
  return (
    <View style={{backgroundColor: theme.colors.background}}>
      <Text style={{color: theme.colors.text}}>
        Current theme: {isDark ? 'Dark' : 'Light'}
      </Text>
    </View>
  );
};
```

## 🌍 Internationalization

Multi-language support includes:

- **Multiple Languages** - Easy addition of new languages
- **RTL Support** - Right-to-left language support
- **Dynamic Language Switching** - Change language without restart
- **Pluralization** - Proper plural form handling

### Translation Usage

```typescript
import {useTranslation} from '@i18n/useTranslation';

const MyComponent = () => {
  const {t} = useTranslation();
  
  return (
    <Text>{t('auth.login.title')}</Text>
  );
};
```

## 📱 Navigation

The navigation system includes:

- **Stack Navigation** - Screen-to-screen navigation
- **Tab Navigation** - Bottom tab bar
- **Drawer Navigation** - Side menu
- **Deep Linking** - URL-based navigation
- **Type Safety** - Full TypeScript support

### Navigation Usage

```typescript
import {useNavigation} from '@react-navigation/native';
import {AuthStackScreenProps} from '@types/navigation';

const LoginScreen = ({navigation}: AuthStackScreenProps<'Login'>) => {
  const handleSignup = () => {
    navigation.navigate('Signup');
  };
  
  return (
    // Screen content
  );
};
```

## 🔔 Notifications

The notification system includes:

- **Push Notifications** - Firebase Cloud Messaging
- **Local Notifications** - In-app notifications
- **Notification Management** - Read/unread states
- **Permission Handling** - Proper permission requests
- **Custom Actions** - Notification action buttons

### Notification Usage

```typescript
import {useDispatch} from 'react-redux';
import {fetchNotifications} from '@store/slices/notificationSlice';

const NotificationScreen = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);
  
  return (
    // Notification list
  );
};
```

## 🛠 API Integration

The API system includes:

- **Axios Client** - HTTP request handling
- **Interceptors** - Request/response processing
- **Error Handling** - Comprehensive error management
- **Token Refresh** - Automatic token renewal
- **File Upload** - Progress tracking

### API Usage

```typescript
import {useApi} from '@hooks/useApi';
import {authService} from '@services/AuthService';

const LoginForm = () => {
  const {data, loading, error, execute} = useApi(authService.login);
  
  const handleSubmit = async (credentials) => {
    await execute(credentials);
  };
  
  return (
    // Form content
  );
};
```

## 🧪 Testing

Testing setup includes:

- **Jest** - JavaScript testing framework
- **React Native Testing Library** - Component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 Building

### Development Build

```bash
# iOS
npm run ios

# Android
npm run android
```

### Production Build

```bash
# iOS
npm run build:ios

# Android
npm run build:android
```

## 🚀 Deployment

### iOS Deployment

1. Configure signing in Xcode
2. Archive the project
3. Upload to App Store Connect
4. Submit for review

### Android Deployment

1. Generate signed APK/AAB
2. Upload to Google Play Console
3. Submit for review

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Check the documentation
- Join our community discussions

## 🙏 Acknowledgments

- React Native team for the amazing framework
- All the open-source contributors
- The React Native community

---

**Happy coding! 🎉**

