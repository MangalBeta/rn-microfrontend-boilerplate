import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useTheme} from '@theme/ThemeProvider';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {theme} = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 30,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
    },
    logoText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#FFFFFF',
      opacity: 0.9,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
    },
    version: {
      position: 'absolute',
      bottom: 50,
      fontSize: 14,
      color: '#FFFFFF',
      opacity: 0.7,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <View style={styles.logo}>
        <Text style={styles.logoText}>RN</Text>
      </View>
      <Text style={styles.title}>React Native</Text>
      <Text style={styles.subtitle}>Starter Kit</Text>
      <Text style={styles.version}>v1.0.0</Text>
    </View>
  );
};

export default SplashScreen;
