import React from 'react';
import { View, Text,ScrollView, StyleSheet, SafeAreaView,TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { useTranslation } from '@i18n/useTranslation';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import Icon from 'react-native-vector-icons/Feather';
import { ProfileStackScreenProps } from '@types/navigation';
import Header from '@components/navigation/Header';

type Props = ProfileStackScreenProps<'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      padding: theme.spacing.lg,
    },
    avatarContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    avatarText: {
      fontSize: 48,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    userName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    userEmail: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xl,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.medium,
      marginBottom: theme.spacing.md,
      width: '100%',
      maxWidth: 300,
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.md,
      alignSelf: 'flex-start',
      width: '100%',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
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
      Safecontainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
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
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
     <Header title={'Profile'} leftIcon={'align-justify'}/>

    <View style={styles.container}>
     
      <View style={styles.avatarContainer}>
        {user?.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatarContainer} />
        ) : (
          <Text style={styles.avatarText}>
            {user?.name ? getInitials(user.name) : 'U'}
          </Text>
        )}
      </View>
      <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
      <Text style={styles.userEmail}>{user?.email || 'guest@example.com'}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile')}>
        <Icon name="edit" size={20} color={theme.colors.text} />
        <Text style={styles.buttonText}>{t('profile.editProfile')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ChangePassword')}>
        <Icon name="lock" size={20} color={theme.colors.text} />
        <Text style={styles.buttonText}>{t('profile.changePassword')}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>{t('profile.personalInfo')}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{t('profile.fields.email')}</Text>
        <Text style={styles.infoValue}>{user?.email || 'N/A'}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{t('profile.fields.phone')}</Text>
        <Text style={styles.infoValue}>{user?.phone || 'N/A'}</Text>
      </View>
      {/* Add more user info fields as needed */}
    </View>
        </ScrollView>
        </SafeAreaView>
  );
};

export default ProfileScreen;

