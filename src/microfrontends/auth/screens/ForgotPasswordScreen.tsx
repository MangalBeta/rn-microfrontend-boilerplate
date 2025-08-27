import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { useTranslation } from '@i18n/useTranslation';
import { AuthStackScreenProps } from '@types/navigation';

type Props = AuthStackScreenProps<'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = React.useState('');

  const handleResetPassword = () => {
    // Implement forgot password logic here
    console.log('Reset password for:', email);
    // navigation.navigate('ResetPassword', { token: 'dummy_token' });
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
    backButton: {
      marginTop: theme.spacing.md,
    },
    backButtonText: {
      color: theme.colors.primary,
      fontSize: 14,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.forgotPassword.title')}</Text>
      <Text style={styles.subtitle}>{t('auth.forgotPassword.subtitle')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('auth.placeholders.email')}
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>{t('auth.forgotPassword.button')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backButtonText}>{t('auth.forgotPassword.backToLogin')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

