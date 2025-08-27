import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';

interface InputProps extends TextInputProps {
  label?: string;
  iconName?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  iconName,
  error,
  style,
  ...rest
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
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
    icon: {
      paddingHorizontal: theme.spacing.md,
    },
    errorText: {
      fontSize: 14,
      color: theme.colors.error,
      marginTop: theme.spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          error && styles.inputWrapperError,
        ]}>
        {iconName && (
          <Icon
            name={iconName}
            size={20}
            color={theme.colors.textSecondary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={theme.colors.textSecondary}
          {...rest}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;

