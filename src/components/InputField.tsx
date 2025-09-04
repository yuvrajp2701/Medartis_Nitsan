import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/registrationStyles';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string; // ✅ Added placeholder prop
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean; // ✅ Added for password fields
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '', // Default empty
  keyboardType = 'default',
  secureTextEntry = false,
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder} // ✅ Placeholder added
      placeholderTextColor="#999" // Subtle grey placeholder
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

export default InputField;
