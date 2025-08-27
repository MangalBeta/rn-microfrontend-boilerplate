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
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from '@theme/ThemeProvider';
import {useTranslation} from '@i18n/useTranslation';
import {login} from '@store/slices/authSlice';
import {AppDispatch, RootState} from '@store/index';
import {AuthStackScreenProps} from '@types/navigation';

type Props = AuthStackScreenProps<'Login'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {theme} = useTheme();
  const {t} = useTranslation();
  const {isLoading, error} = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: 'mangalhcl449@gmail.com',
    password: 'Admin@123',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email) {
      newErrors.email = t('auth.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.errors.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('auth.errors.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('auth.errors.passwordTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const payload = {};
      
      payload['password'] = formData?.password;
      payload['key'] =formData?.email;
      payload['role'] = 'F';
      payload['deviceType'] ='IOS';
      // payload['deviceToken'] = await messaging().getToken();
      payload['type'] ='EMAIL';
      await dispatch(login(payload)).unwrap();
    } catch (error: any) {
      Alert.alert(t('auth.errors.loginFailed'), error);
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
      marginBottom: theme.spacing.xxl,
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
    inputWrapperFocused: {
      borderColor: theme.colors.primary,
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
    rememberMeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderRadius: 4,
      marginRight: theme.spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    rememberMeText: {
      fontSize: 14,
      color: theme.colors.text,
    },
    loginButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    loginButtonDisabled: {
      backgroundColor: theme.colors.disabled,
    },
    loginButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    forgotPassword: {
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
    },
    forgotPasswordText: {
      fontSize: 14,
      color: theme.colors.primary,
    },
    footer: {
      alignItems: 'center',
    },
    signupContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    signupText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    signupLink: {
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
          <Text style={styles.title}>{t('auth.login.title')}</Text>
          <Text style={styles.subtitle}>{t('auth.login.subtitle')}</Text>
        </View>

        <View style={styles.form}>
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

          <TouchableOpacity
            style={styles.rememberMeContainer}
            onPress={() =>
              setFormData({...formData, rememberMe: !formData.rememberMe})
            }>
            <View
              style={[
                styles.checkbox,
                formData.rememberMe && styles.checkboxChecked,
              ]}>
              {formData.rememberMe && (
                <Icon name="check" size={12} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.rememberMeText}>
              {t('auth.login.rememberMe')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            // disabled={isLoading}
            >
            <Text style={styles.loginButtonText}>
              {isLoading ? t('common.loading') : t('auth.login.button')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>
              {t('auth.login.forgotPassword')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              {t('auth.login.noAccount')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>
                {t('auth.signup.title')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

