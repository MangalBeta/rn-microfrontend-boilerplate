import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';

interface LoadingIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'large',
  color,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color || theme.colors.primary} />
    </View>
  );
};

export default LoadingIndicator;

