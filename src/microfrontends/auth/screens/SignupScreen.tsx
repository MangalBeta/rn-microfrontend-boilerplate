import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from '@theme/ThemeProvider';
import {useTranslation} from '@i18n/useTranslation';
import {signup} from '@store/slices/authSlice';
import {AppDispatch, RootState} from '@store/index';
import {AuthStackScreenProps} from '@types/navigation';

type Props = AuthStackScreenProps<'Signup'>;

const SignupScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {theme} = useTheme();
  const {t} = useTranslation();
  const {isLoading} = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = t('auth.errors.nameRequired');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('auth.errors.nameTooShort');
    }

    if (!formData.email) {
      newErrors.email = t('auth.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.errors.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('auth.errors.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('auth.errors.passwordTooShort');
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = t('auth.errors.passwordWeak');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.passwordMismatch');
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = t('auth.errors.termsRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(signup({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })).unwrap();
    } catch (error: any) {
      Alert.alert(t('auth.errors.signupFailed'), error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: theme.spacing.lg,
    },
    header: {
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 20,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    logoText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    form: {
      marginBottom: theme.spacing.xl,
    },
    inputContainer: {
      marginBottom: theme.spacing.lg,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.medium,
      backgroundColor: theme.colors.surface,
    },
    inputWrapperError: {
      borderColor: theme.colors.error,
    },
    input: {
      flex: 1,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      fontSize: 16,
      color: theme.colors.text,
    },
    inputIcon: {
      paddingHorizontal: theme.spacing.md,
    },
    errorText: {
      fontSize: 14,
      color: theme.colors.error,
      marginTop: theme.spacing.xs,
    },
    termsContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.lg,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderRadius: 4,
      marginRight: theme.spacing.sm,
      marginTop: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    termsText: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.text,
      lineHeight: 20,
    },
    termsLink: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
    signupButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    signupButtonDisabled: {
      backgroundColor: theme.colors.disabled,
    },
    signupButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    footer: {
      alignItems: 'center',
    },
    loginContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    loginText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    loginLink: {
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: '500',
      marginLeft: 4,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>RN</Text>
          </View>
          <Text style={styles.title}>{t('auth.signup.title')}</Text>
          <Text style={styles.subtitle}>{t('auth.signup.subtitle')}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('auth.fields.name')}</Text>
            <View
              style={[
                styles.inputWrapper,
                errors.name && styles.inputWrapperError,
              ]}>
              <TextInput
                style={styles.input}
                placeholder={t('auth.placeholders.name')}
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.name}
                onChangeText={text => {
                  setFormData({...formData, name: text});
                  if (errors.name) {
                    setErrors({...errors, name: ''});
                  }
                }}
                autoCapitalize="words"
                autoCorrect={false}
              />
              <Icon
                name="user"
                size={20}
                color={theme.colors.textSecondary}
                style={styles.inputIcon}
              />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('auth.fields.email')}</Text>
            <View
              style={[
                styles.inputWrapper,
                errors.email && styles.inputWrapperError,
              ]}>
              <TextInput
                style={styles.input}
                placeholder={t('auth.placeholders.email')}
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.email}
                onChangeText={text => {
                  setFormData({...formData, email: text});
                  if (errors.email) {
                    setErrors({...errors, email: ''});
                  }
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Icon
                name="mail"
                size={20}
                color={theme.colors.textSecondary}
                style={styles.inputIcon}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('auth.fields.password')}</Text>
            <View
              style={[
                styles.inputWrapper,
                errors.password && styles.inputWrapperError,
              ]}>
              <TextInput
                style={styles.input}
                placeholder={t('auth.placeholders.password')}
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.password}
                onChangeText={text => {
                  setFormData({...formData, password: text});
                  if (errors.password) {
                    setErrors({...errors, password: ''});
                  }
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.inputIcon}
                onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('auth.fields.confirmPassword')}</Text>
            <View
              style={[
                styles.inputWrapper,
                errors.confirmPassword && styles.inputWrapperError,
              ]}>
              <TextInput
                style={styles.input}
                placeholder={t('auth.placeholders.confirmPassword')}
                placeholderTextColor={theme.colors.textSecondary}
                value={formData.confirmPassword}
                onChangeText={text => {
                  setFormData({...formData, confirmPassword: text});
                  if (errors.confirmPassword) {
                    setErrors({...errors, confirmPassword: ''});
                  }
                }}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.inputIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() =>
              setFormData({...formData, agreeToTerms: !formData.agreeToTerms})
            }>
            <View
              style={[
                styles.checkbox,
                formData.agreeToTerms && styles.checkboxChecked,
              ]}>
              {formData.agreeToTerms && (
                <Icon name="check" size={12} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.termsText}>
              {t('auth.signup.agreeToTerms')}{' '}
              <Text style={styles.termsLink}>
                {t('auth.signup.termsOfService')}
              </Text>{' '}
              {t('common.and')}{' '}
              <Text style={styles.termsLink}>
                {t('auth.signup.privacyPolicy')}
              </Text>
            </Text>
          </TouchableOpacity>
          {errors.agreeToTerms && (
            <Text style={styles.errorText}>{errors.agreeToTerms}</Text>
          )}

          <TouchableOpacity
            style={[
              styles.signupButton,
              isLoading && styles.signupButtonDisabled,
            ]}
            onPress={handleSignup}
            disabled={isLoading}>
            <Text style={styles.signupButtonText}>
              {isLoading ? t('common.loading') : t('auth.signup.button')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              {t('auth.signup.hasAccount')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>
                {t('auth.login.title')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

