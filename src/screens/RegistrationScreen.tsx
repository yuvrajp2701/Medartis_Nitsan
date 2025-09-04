import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/registrationStyles';
import { isTablet, responsiveHeight } from '../utils/responsive';
import Button from '../components/Button'; // ✅ Reusable button
import InputField from '../components/InputField';

const RegistrationScreen: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (isTablet) {
      console.log('Running on a Tablet!');
    }
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    Alert.alert('Success', `Welcome, ${fullName}!`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>medartis</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Title */}
        <Text style={styles.title}>Register</Text>

        {/* Full Name */}
        <InputField
          label="Name*"
          value={fullName}
          onChangeText={setFullName}
        />

        {/* Email */}
        <InputField
          label="E-mail*"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Mobile Number */}
        <InputField
          label="Mobile No.*"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Create Password*</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="************"
            placeholderTextColor="#99999960"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Re-Type Password*</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              placeholder="************"
              placeholderTextColor="#99999960"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Register Button (Reusable Component) */}
        <View style={{ marginTop: responsiveHeight(2) }}>
          <Button title="REGISTER" onPress={handleRegister} />
        </View>


        {/* Login Section */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already Registered?</Text>
          <TouchableOpacity>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
