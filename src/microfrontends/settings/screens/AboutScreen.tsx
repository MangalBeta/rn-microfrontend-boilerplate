import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { useTranslation } from '@i18n/useTranslation';
import Icon from 'react-native-vector-icons/Feather';
import { getAppInfo } from '@utils/AppInitializer';
import { SettingsStackScreenProps } from '@types/navigation';

type Props = SettingsStackScreenProps<'About'>;

const AboutScreen: React.FC<Props> = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [appInfo, setAppInfo] = useState({
    version: 'N/A',
    buildNumber: 'N/A',
    firstLaunchDate: null as Date | null,
    lastUpdateDate: null as Date | null,
  });

  useEffect(() => {
    const fetchAppInfo = async () => {
      const info = await getAppInfo();
      setAppInfo(info);
    };
    fetchAppInfo();
  }, []);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollViewContent: {
      padding: theme.spacing.lg,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    infoLabel: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    infoValue: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '500',
    },
    linkItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    linkIcon: {
      marginRight: theme.spacing.md,
    },
    linkText: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.primary,
    },
    arrowIcon: {
      marginLeft: theme.spacing.md,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.about.title')}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('settings.about.version')}</Text>
          <Text style={styles.infoValue}>{appInfo.version}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('settings.about.buildNumber')}</Text>
          <Text style={styles.infoValue}>{appInfo.buildNumber}</Text>
        </View>
        {appInfo.firstLaunchDate && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>First Launch</Text>
            <Text style={styles.infoValue}>{appInfo.firstLaunchDate.toLocaleDateString()}</Text>
          </View>
        )}
        {appInfo.lastUpdateDate && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Update</Text>
            <Text style={styles.infoValue}>{appInfo.lastUpdateDate.toLocaleDateString()}</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <TouchableOpacity style={styles.linkItem} onPress={() => handleLinkPress('https://example.com/terms')}>
          <Icon name="file-text" size={20} color={theme.colors.primary} style={styles.linkIcon} />
          <Text style={styles.linkText}>{t('settings.about.termsOfService')}</Text>
          <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkItem} onPress={() => handleLinkPress('https://example.com/privacy')}>
          <Icon name="shield" size={20} color={theme.colors.primary} style={styles.linkIcon} />
          <Text style={styles.linkText}>{t('settings.about.privacyPolicy')}</Text>
          <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkItem} onPress={() => handleLinkPress('https://example.com/licenses')}>
          <Icon name="book-open" size={20} color={theme.colors.primary} style={styles.linkIcon} />
          <Text style={styles.linkText}>{t('settings.about.licenses')}</Text>
          <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact & Support</Text>
        <TouchableOpacity style={styles.linkItem} onPress={() => handleLinkPress('mailto:support@example.com')}>
          <Icon name="mail" size={20} color={theme.colors.primary} style={styles.linkIcon} />
          <Text style={styles.linkText}>{t('settings.about.contact')}</Text>
          <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkItem} onPress={() => handleLinkPress('https://example.com/support')}>
          <Icon name="life-buoy" size={20} color={theme.colors.primary} style={styles.linkIcon} />
          <Text style={styles.linkText}>{t('settings.about.support')}</Text>
          <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkItem} onPress={() => handleLinkPress('https://example.com')}>
          <Icon name="globe" size={20} color={theme.colors.primary} style={styles.linkIcon} />
          <Text style={styles.linkText}>{t('settings.about.website')}</Text>
          <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;

