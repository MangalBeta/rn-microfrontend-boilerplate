import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { useTranslation } from '@i18n/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@store/index';
import { updateUserProfile } from '@store/slices/userSlice';
import Icon from 'react-native-vector-icons/Feather';
import { ProfileStackScreenProps } from '@types/navigation';

type Props = ProfileStackScreenProps<'EditProfile'>;

const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = t('errors.validation.required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('errors.validation.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('errors.validation.email');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      Alert.alert(t('common.success'), t('profile.success.profileUpdated'));
      navigation.goBack();
    } catch (error: any) {
      Alert.alert(t('common.error'), error.message || t('profile.errors.updateFailed'));
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
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
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('profile.fields.firstName')}</Text>
        <View style={[styles.inputWrapper, errors.name && styles.inputWrapperError]}>
          <TextInput
            style={styles.input}
            placeholder={t('profile.placeholders.firstName')}
            placeholderTextColor={theme.colors.textSecondary}
            value={formData.name}
            onChangeText={text => {
              setFormData({ ...formData, name: text });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            autoCapitalize="words"
          />
        </View>
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('profile.fields.email')}</Text>
        <View style={[styles.inputWrapper, errors.email && styles.inputWrapperError]}>
          <TextInput
            style={styles.input}
            placeholder={t('profile.placeholders.email')}
            placeholderTextColor={theme.colors.textSecondary}
            value={formData.email}
            onChangeText={text => {
              setFormData({ ...formData, email: text });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('profile.fields.phone')}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder={t('profile.placeholders.phone')}
            placeholderTextColor={theme.colors.textSecondary}
            value={formData.phone}
            onChangeText={text => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('profile.fields.bio')}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            placeholder={t('profile.placeholders.bio')}
            placeholderTextColor={theme.colors.textSecondary}
            value={formData.bio}
            onChangeText={text => setFormData({ ...formData, bio: text })}
            multiline
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
        onPress={handleSaveProfile}
        disabled={isLoading}>
        <Text style={styles.saveButtonText}>
          {isLoading ? t('common.loading') : t('common.save')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;

