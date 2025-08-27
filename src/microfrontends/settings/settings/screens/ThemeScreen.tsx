import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { useTranslation } from '@i18n/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { setThemeMode } from '@store/slices/themeSlice';
import Icon from 'react-native-vector-icons/Feather';
import { SettingsStackScreenProps } from '@types/navigation';

type Props = SettingsStackScreenProps<'Theme'>;

const ThemeScreen: React.FC<Props> = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.theme);

  const themes = [
    { id: 'light', label: t('settings.theme.light'), icon: 'sun' },
    { id: 'dark', label: t('settings.theme.dark'), icon: 'moon' },
    { id: 'auto', label: t('settings.theme.auto'), icon: 'smartphone' },
  ];

  const handleThemeChange = (newMode: 'light' | 'dark' | 'auto') => {
    dispatch(setThemeMode(newMode));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    },
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.medium,
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    themeOptionSelected: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
    },
    themeIcon: {
      marginRight: theme.spacing.md,
    },
    themeLabel: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
    },
    checkIcon: {
      marginLeft: theme.spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      {themes.map((themeOption) => (
        <TouchableOpacity
          key={themeOption.id}
          style={[
            styles.themeOption,
            mode === themeOption.id && styles.themeOptionSelected,
          ]}
          onPress={() => handleThemeChange(themeOption.id as 'light' | 'dark' | 'auto')}
        >
          <Icon
            name={themeOption.icon}
            size={20}
            color={mode === themeOption.id ? theme.colors.primary : theme.colors.textSecondary}
            style={styles.themeIcon}
          />
          <Text style={styles.themeLabel}>{themeOption.label}</Text>
          {mode === themeOption.id && (
            <Icon name="check-circle" size={20} color={theme.colors.primary} style={styles.checkIcon} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ThemeScreen;

