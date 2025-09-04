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

type RegistrationScreenProp = NativeStackNavigationProp<RootStackParamList, 'Registration'>;

const RegistrationScreen: React.FC = () => {
  const navigation = useNavigation<RegistrationScreenProp>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (isTablet) {
      console.log('Running on a Tablet!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.LoginscrollContainer}>
        {/* Logo */}
        <Logo />

        {/* Title */}
        <Text style={styles.Logintitle}>Login</Text>

        {/* Full Name */}
        <InputField label="EnterUserID" value={fullName} onChangeText={setFullName} />
        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter Password</Text>
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
        <TouchableOpacity onPress={() => console.log('Forgot Password tapped')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <View style={{ marginTop: responsiveHeight(2) }}>
          <Button title="LOGIN" onPress={handleLogin} />
        </View>

        {/* Register Section */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Create</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.loginLink}> New Account</Text>
          </TouchableOpacity>
        </View>

        {/* Login with Microsoft Azure */}
        <View style={styles.azureContainer}>
          <TouchableOpacity onPress={() => console.log('Login with Microsoft Azure')}>
            <Text style={styles.loginText}>Login with Microsoft Azure</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
