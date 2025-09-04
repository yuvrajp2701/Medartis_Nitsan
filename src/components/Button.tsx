import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  isTablet,
} from '../utils/responsive';

interface ButtonProps {
  title?: string;          // Button text, default is "REGISTER"
  onPress: () => void;     // Action when button is pressed
}

const Button: React.FC<ButtonProps> = ({ title = 'REGISTER', onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    paddingVertical: responsiveHeight(1.2),
    alignItems: 'center',
    borderRadius: 2,
    marginBottom: responsiveHeight(9),
    width: isTablet ? '30%' : '100%',  // Adjust width based on device
    alignSelf: isTablet ? 'center' : 'stretch', // Center on tablet
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(16),
    letterSpacing: 1,
  },
});
