import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  textStyle?: any;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      borderRadius: theme.borderRadius.medium,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    text: {
      backgroundColor: 'transparent',
    },
    small: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    medium: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
    },
    large: {
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xl,
    },
    disabled: {
      backgroundColor: theme.colors.disabled,
      borderColor: theme.colors.disabled,
    },
    buttonText: {
      fontWeight: '600',
    },
    primaryText: {
      color: '#FFFFFF',
    },
    secondaryText: {
      color: '#FFFFFF',
    },
    outlineText: {
      color: theme.colors.primary,
    },
    textText: {
      color: theme.colors.primary,
    },
    smallText: {
      fontSize: 14,
    },
    mediumText: {
      fontSize: 16,
    },
    largeText: {
      fontSize: 18,
    },
    loadingIndicator: {
      marginLeft: theme.spacing.sm,
    },
  });

  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled || loading ? styles.disabled : {},
    style,
  ];

  const textStyles = [
    styles.buttonText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      <Text style={textStyles}>{title}</Text>
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'secondary' ? '#FFFFFF' : theme.colors.primary}
          style={styles.loadingIndicator}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

