import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/otpStyles';
import Button from '../components/Button';
import OtpInputBoxes from '../components/OtpInputBoxes';

const OtpVerificationScreen: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // 4 digits OTP
  const inputs = useRef<(TextInput | null)[]>([]);

  // Handle OTP input changes and move focus to the next input
  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input if the current one is filled
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  // Handle OTP verification
  const handleVerify = () => {
    const code = otp.join('');
    if (code.length !== 4) {
      Alert.alert('Error', 'Please enter the 4-digit OTP');
      return;
    }

    Alert.alert('OTP Verified', `Entered OTP: ${code}`);
    // API call to verify OTP can go here
  };

  // Handle OTP resend
  const handleResend = () => {
    Alert.alert('OTP Resent', 'A new OTP has been sent to your number/email');
    // Trigger resend OTP API here
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 4-digit code sent to your number
        </Text>

        {/* OTP Inputs */}
        <OtpInputBoxes code={otp} setCode={setOtp} numberOfDigits={4} />


        {/* Resend OTP */}
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>

        {/* Verify Button */}
        <View style={styles.buttonWrapper}>
          <Button title="VERIFY" onPress={handleVerify} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpVerificationScreen;
