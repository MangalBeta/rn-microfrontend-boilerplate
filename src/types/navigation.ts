import {NavigatorScreenParams} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {DrawerScreenProps} from '@react-navigation/drawer';

// Root Stack Navigator
export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Modal: {
    screen: string;
    params?: any;
  };
};

// Auth Stack Navigator
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  ResetPassword: {token: string};
};

// Main Tab Navigator
export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
  Notifications: NavigatorScreenParams<NotificationStackParamList>;
    Shop: NavigatorScreenParams<ShopStackParamList>;
};

// Home Stack Navigator
export type HomeStackParamList = {
  HomeScreen: undefined;
  Details: {id: string};
};

// Profile Stack Navigator
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
};

// Settings Stack Navigator
export type SettingsStackParamList = {
  SettingsScreen: undefined;
  Language: undefined;
  Theme: undefined;
  About: undefined;
};

// Notification Stack Navigator
export type NotificationStackParamList = {
  NotificationList: undefined;
  NotificationDetail: {id: string};
};

// Drawer Navigator
export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Help: undefined;
  Support: undefined;
  Logout: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  StackScreenProps<HomeStackParamList, T>;

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  StackScreenProps<ProfileStackParamList, T>;

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> =
  StackScreenProps<SettingsStackParamList, T>;

export type NotificationStackScreenProps<
  T extends keyof NotificationStackParamList,
> = StackScreenProps<NotificationStackParamList, T>;

export type DrawerScreenProps<T extends keyof DrawerParamList> =
  DrawerScreenProps<DrawerParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}



// Profile Stack Navigator
export type ShopStackParamList = {
  ShopScreen: undefined;

};