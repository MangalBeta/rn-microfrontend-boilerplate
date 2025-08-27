import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';

interface FormContainerProps {
  children: React.ReactNode;
  style?: any;
  scrollView?: boolean;
}

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  style,
  scrollView = true,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    innerContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: theme.spacing.lg,
    },
  });

  const content = scrollView ? (
    <ScrollView contentContainerStyle={styles.innerContainer} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  ) : (
    <View style={styles.innerContainer}>{children}</View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {content}
    </KeyboardAvoidingView>
  );
};

export default FormContainer;

