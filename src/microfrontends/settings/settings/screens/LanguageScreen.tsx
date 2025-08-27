import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { useI18n } from '@i18n/I18nProvider';
import Icon from 'react-native-vector-icons/Feather';
import { SettingsStackScreenProps } from '@types/navigation';

type Props = SettingsStackScreenProps<'Language'>;

const LanguageScreen: React.FC<Props> = () => {
  const { theme } = useTheme();
  const { currentLanguage, availableLanguages, changeLanguage } = useI18n();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    flag: {
      fontSize: 24,
      marginRight: theme.spacing.md,
    },
    languageName: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
    },
    selectedIcon: {
      marginLeft: theme.spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(availableLanguages)}
        keyExtractor={(item) => item}
        renderItem={({ item: langCode }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => changeLanguage(langCode)}
          >
            <Text style={styles.flag}>{availableLanguages[langCode].flag}</Text>
            <Text style={styles.languageName}>{availableLanguages[langCode].nativeName}</Text>
            {currentLanguage === langCode && (
              <Icon name="check" size={20} color={theme.colors.primary} style={styles.selectedIcon} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LanguageScreen;

