import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { useTranslation } from '@i18n/useTranslation';
import { AuthStackScreenProps } from '@types/navigation';

type Props = AuthStackScreenProps<'ResetPassword'>;

const ResetPasswordScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { token } = route.params; // Get token from navigation params

  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleResetPassword = () => {
    // Implement reset password logic here using the token
    console.log('Resetting password with token:', token);
    console.log('New password:', newPassword);
    // navigation.navigate('Login');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.medium,
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.lg,
      color: theme.colors.text,
      backgroundColor: theme.colors.surface,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      width: '100%',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.resetPassword.title')}</Text>
      <Text style={styles.subtitle}>{t('auth.resetPassword.subtitle')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('auth.placeholders.newPassword')}
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry
        autoCapitalize="none"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder={t('auth.placeholders.confirmPassword')}
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>{t('auth.resetPassword.button')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;

