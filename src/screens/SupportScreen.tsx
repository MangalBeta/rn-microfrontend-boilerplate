import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { useTranslation } from '@i18n/useTranslation';
import { MainTabScreenProps } from '@types/navigation';

type Props = MainTabScreenProps<'Support'>;

const SupportScreen: React.FC<Props> = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Support Screen</Text>
    </View>
  );
};

export default SupportScreen;

