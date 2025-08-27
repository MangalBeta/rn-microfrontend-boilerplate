import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title?: string;
  leftIcon?: string;
  onLeftPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation()

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.primary,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    leftSection: {
      width: 60,
      alignItems: 'flex-start',
      paddingLeft: theme.spacing.md,
    },
    centerSection: {
      flex: 1,
      alignItems: 'center',
    },
    rightSection: {
      width: 60,
      alignItems: 'flex-end',
      paddingRight: theme.spacing.md,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    iconButton: {
      padding: theme.spacing.xs,
      minWidth: 32,
      minHeight: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const onLeftPressIn= ()=>{
    if(onLeftPress){
      onLeftPress()
    }{
      navigation.openDrawer()
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPressIn} style={styles.iconButton}>
            <Icon name={leftIcon} size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.centerSection}>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.rightSection}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
            <Icon name={rightIcon} size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

