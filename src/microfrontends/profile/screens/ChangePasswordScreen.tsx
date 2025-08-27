import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { useTranslation } from '@i18n/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@store/index';
import { changePassword } from '@store/slices/authSlice';
import Icon from 'react-native-vector-icons/Feather';
import { ProfileStackScreenProps } from '@types/navigation';

type Props = ProfileStackScreenProps<'ChangePassword'>;

const ChangePasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = t('auth.errors.currentPasswordRequired');
    }

    if (!formData.newPassword) {
      newErrors.newPassword = t('auth.errors.newPasswordRequired');
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = t('auth.errors.passwordTooShort');
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = t('auth.errors.passwordWeak');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.confirmPasswordRequired');
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.passwordMismatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(changePassword(formData)).unwrap();
      Alert.alert(t('common.success'), t('auth.success.passwordChangeSuccess'));
      navigation.goBack();
    } catch (error: any) {
      Alert.alert(t('common.error'), error.message || t('auth.errors.changePasswordFailed'));
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
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
    saveButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      alignItems: 'center',
      marginTop: theme.spacing.xl,
    },
    saveButtonDisabled: {
      backgroundColor: theme.colors.disabled,
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('auth.fields.currentPassword')}</Text>
        <View style={[styles.inputWrapper, errors.currentPassword && styles.inputWrapperError]}>
          <TextInput
            style={styles.input}
            placeholder={t('auth.placeholders.currentPassword')}
            placeholderTextColor={theme.colors.textSecondary}
            value={formData.currentPassword}
            onChangeText={text => {
              setFormData({ ...formData, currentPassword: text });
              if (errors.currentPassword) setErrors({ ...errors, currentPassword: '' });
            }}
            secureTextEntry={!showCurrentPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.inputIcon}
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
            <Icon
              name={showCurrentPassword ? 'eye-off' : 'eye'}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('auth.fields.newPassword')}</Text>
        <View style={[styles.inputWrapper, errors.newPassword && styles.inputWrapperError]}>
          <TextInput
            style={styles.input}
            placeholder={t('auth.placeholders.newPassword')}
            placeholderTextColor={theme.colors.textSecondary}
            value={formData.newPassword}
            onChangeText={text => {
              setFormData({ ...formData, newPassword: text });
              if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
            }}
            secureTextEntry={!showNewPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.inputIcon}
            onPress={() => setShowNewPassword(!showNewPassword)}>
            <Icon
              name={showNewPassword ? 'eye-off' : 'eye'}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('auth.fields.confirmPassword')}</Text>
        <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputWrapperError]}>
          <TextInput
            style={styles.input}
            placeholder={t('auth.placeholders.confirmPassword')}
            placeholderTextColor={theme.colors.textSecondary}
            value={formData.confirmPassword}
            onChangeText={text => {
              setFormData({ ...formData, confirmPassword: text });
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
            }}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
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
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      </View>

      <TouchableOpacity
        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
        onPress={handleChangePassword}
        disabled={isLoading}>
        <Text style={styles.saveButtonText}>
          {isLoading ? t('common.loading') : t('auth.changePassword.button')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;

