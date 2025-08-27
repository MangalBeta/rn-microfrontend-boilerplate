import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { useTranslation } from '@i18n/useTranslation';
import Icon from 'react-native-vector-icons/Feather';
import { SettingsStackScreenProps } from '@types/navigation';

type Props = SettingsStackScreenProps<'Settings'>;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const settingsOptions = [
    {
      id: 'language',
      icon: 'globe',
      title: t('settings.language.title'),
      onPress: () => navigation.navigate('Language'),
    },
    {
      id: 'theme',
      icon: 'moon',
      title: t('settings.theme.title'),
      onPress: () => navigation.navigate('Theme'),
    },
    {
      id: 'notifications',
      icon: 'bell',
      title: t('settings.notifications.title'),
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      id: 'privacy',
      icon: 'shield',
      title: t('settings.privacy.title'),
      onPress: () => navigation.navigate('Privacy'),
    },
    {
      id: 'security',
      icon: 'lock',
      title: t('settings.security.title'),
      onPress: () => navigation.navigate('Security'),
    },
    {
      id: 'about',
      icon: 'info',
      title: t('settings.about.title'),
      onPress: () => navigation.navigate('About'),
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollViewContent: {
      paddingVertical: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      paddingHorizontal: theme.spacing.lg,
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.sm,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    settingIcon: {
      marginRight: theme.spacing.md,
    },
    settingText: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
    },
    arrowIcon: {
      marginLeft: theme.spacing.md,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.sectionTitle}>{t('settings.general')}</Text>
      {settingsOptions.map((option) => (
        <TouchableOpacity key={option.id} style={styles.settingItem} onPress={option.onPress}>
          <Icon name={option.icon} size={20} color={theme.colors.textSecondary} style={styles.settingIcon} />
          <Text style={styles.settingText}>{option.title}</Text>
          <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} style={styles.arrowIcon} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SettingsScreen;

