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
import Button from '../components/Button';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // import type directly from App.tsx
import Title from '../components/Title';
import { registerUser } from '../APIs/ApiService';

type RegistrationScreenProp = NativeStackNavigationProp<RootStackParamList, 'Registration'>;

const RegistrationScreen: React.FC = () => {
  const navigation = useNavigation<RegistrationScreenProp>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    console.log('Register button pressed');
    console.log('Input values:', { fullName, email, phone, password, confirmPassword });

    // Basic empty fields check
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      console.log('Validation failed: Some fields are empty');
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Full name validation
    if (fullName.trim().length < 3) {
      console.log('Validation failed: Full name too short');
      Alert.alert('Error', 'Full name must be at least 3 characters');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: Invalid email format');
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Phone validation (digits only, 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      console.log('Validation failed: Invalid phone number');
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    // Password length validation
    if (password.length < 6) {
      console.log('Validation failed: Password too short');
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      console.log('Validation failed: Passwords do not match');
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      console.log('Calling registerUser API...');
      setLoading(true);

      const result = await registerUser({
        fullName,
        email,
        phone,
        password,
      });

      setLoading(false);
      console.log('API response:', result);

      if (result.success) {
        console.log('Registration successful');
        Alert.alert('Success', result.message || `Welcome, ${fullName}!`);
        navigation.navigate('Login'); // Redirect to login
      } else {
        console.log('Registration failed:', result.message);
        Alert.alert('Error', result.message || 'Registration failed');
      }
    } catch (error) {
      setLoading(false);
      console.error('Registration API error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo */}
        <Logo />

        {/* Title */}
        <Title text="Register" />

        {/* Name */}
        <InputField label="Name*" value={fullName} onChangeText={setFullName} />

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
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              placeholder="************"
              placeholderTextColor="#99999960"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
            </TouchableOpacity>
          </View>
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
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Register Button */}
        <View style={{ marginTop: responsiveHeight(2) }}>
          <Button title="REGISTER" onPress={handleRegister} />
        </View>

        {/* Login Section */}
        <View style={styles.loginContainer1}>
          <Text style={styles.loginText}>Already Registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
