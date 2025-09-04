import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from '../utils/responsive';

interface CustomInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ value, onChangeText, ...props }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.7),
    fontSize: responsiveFontSize(16),
    marginBottom: responsiveHeight(1),
    color: '#000',
  },
});

export default CustomInput;
