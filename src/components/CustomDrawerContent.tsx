import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from '@theme/ThemeProvider';
import {useTranslation} from '@i18n/useTranslation';
import {logout} from '@store/slices/authSlice';
import {RootState, AppDispatch} from '@store/index';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const {theme} = useTheme();
  const {t} = useTranslation();
  const {user} = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    {
      label: t('navigation.home'),
      icon: 'home',
      onPress: () => props.navigation.navigate('MainTabs'),
    },
    {
      label: t('navigation.help'),
      icon: 'help-circle',
      onPress: () => props.navigation.navigate('Help'),
    },
    {
      label: t('navigation.support'),
      icon: 'headphones',
      onPress: () => props.navigation.navigate('Support'),
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    header: {
      padding: theme.spacing.lg,
      paddingTop: theme.spacing.lg+40,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.primary,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    },
    avatarText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      color: '#FFFFFF',
      opacity: 0.8,
    },
    content: {
      flex: 1,
      paddingTop: theme.spacing.md,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      marginHorizontal: theme.spacing.sm,
      borderRadius: theme.borderRadius.medium,
    },
    menuItemActive: {
      backgroundColor: theme.colors.primary + '20',
    },
    menuIcon: {
      marginRight: theme.spacing.md,
      width: 24,
    },
    menuLabel: {
      fontSize: 16,
      color: theme.colors.text,
      flex: 1,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      padding: theme.spacing.lg,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
    },
    logoutIcon: {
      marginRight: theme.spacing.md,
    },
    logoutText: {
      fontSize: 16,
      color: theme.colors.error,
      fontWeight: '500',
    },
    version: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.sm,
    },
  });

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            {user?.avatar ? (
              <Image source={{uri: user.avatar}} style={styles.avatar} />
            ) : (
              <Text style={styles.avatarText}>
                {user?.name ? getInitials(user.name) : 'U'}
              </Text>
            )}
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>
              {user?.name || 'User Name'}
            </Text>
            <Text style={styles.userEmail}>
              {user?.email || 'user@example.com'}
            </Text>
          </View>
        </View>
      </View>

      <DrawerContentScrollView {...props} style={styles.content}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}>
            <Icon
              name={item.icon}
              size={20}
              color={theme.colors.text}
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon
            name="log-out"
            size={20}
            color={theme.colors.error}
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>{t('navigation.logout')}</Text>
        </TouchableOpacity>
        <Text style={styles.version}>v1.0.0</Text>
      </View>
    </View>
  );
};

export default CustomDrawerContent;

