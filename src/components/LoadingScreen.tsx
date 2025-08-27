import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useTheme} from '@theme/ThemeProvider';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    loader: {
      marginBottom: theme.spacing.lg,
    },
    message: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.md,
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: theme.spacing.xl,
      borderRadius: 20,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>RN</Text>
        </View>
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={styles.loader}
        />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

export default LoadingScreen;

