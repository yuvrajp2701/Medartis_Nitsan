import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  isTablet,
} from '../utils/responsive';

import InputField from '../components/InputField'; // ✅ Reusable Input
import Button from '../components/Button'; // ✅ Reusable Button

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password pressed');
  };

  const handleRegisterRedirect = () => {
    console.log('Redirect to Register screen');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* TITLE */}
        <Text style={styles.title}>LOGIN</Text>

        {/* EMAIL */}
        <InputField
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* PASSWORD */}
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* FORGOT PASSWORD */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* LOGIN BUTTON */}
        <Button title="LOGIN" onPress={handleLogin} />

        {/* REGISTER LINK */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegisterRedirect}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: responsiveHeight(2.5),
    paddingTop: responsiveHeight(8),
  },
  title: {
    fontSize: responsiveFontSize(22),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: responsiveHeight(5),
    letterSpacing: 1,
  },
  forgotText: {
    textAlign: 'right',
    color: '#000',
    marginTop: responsiveHeight(1.5),
    marginBottom: responsiveHeight(3),
    fontSize: responsiveFontSize(14),
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(4),
  },
  registerText: {
    fontSize: responsiveFontSize(14),
    color: '#000',
  },
  registerLink: {
    fontSize: responsiveFontSize(14),
    color: '#000',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
