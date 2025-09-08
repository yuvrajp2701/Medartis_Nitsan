import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import OtpInputBoxes from '../components/OtpInputBoxes';
import styles from '../styles/resetVerificationStyles';
import Button from '../components/Button';
import ForgotPassword from '../assets/ForgotPassword.png';
import RecoverPassword from '../assets/RecoverPassword.png';
import { forgotPassword, verifyOtp } from '../APIs/ApiService';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import {
    responsiveHeight,
    responsiveWidth,
} from '../utils/responsive';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ResetVerification'>;
type RouteParams = RouteProp<RootStackParamList, 'ResetVerification'>;

const ResetVerificationScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteParams>();
    const { email } = route.params; // ✅ Dynamic email from route

    const [code, setCode] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(30); // 30 seconds timer

    // ✅ Handle OTP submission
    const handleSubmit = () => {
        const authCode = code.join('');

        if (authCode.length === 4) {
            console.log('Verifying OTP for:', email, 'Code:', authCode);
            verifyOtp(email, authCode)
                .then(response => {
                    console.log('OTP verification response:', response);
                    if (response.status === true) {
                        navigation.navigate('ResetPassword', { email }); // ✅ pass email to next screen
                    } else {
                        Alert.alert('Verification Failed', response.message || 'Please check your OTP and try again.');
                    }
                })
                .catch(error => {
                    console.error('OTP verification error:', error);
                    Alert.alert('Verification Failed', 'An error occurred while verifying OTP.');
                });
        } else {
            Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP.');
        }
    };

    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text.slice(-1);
        setCode(newCode);
    };

    // ⏱ Timer countdown logic
    useEffect(() => {
        let countdown: number | undefined;

        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        }

        return () => {
            if (countdown) clearInterval(countdown);
        };
    }, [timer]);

const handleResend = async () => {
  if (timer === 0) {
    setTimer(30); // reset your timer

    try {
      console.log('🔄 Resending OTP for:', email);
      const result = await forgotPassword(email);

      if (result.status === true) {
        Alert.alert('OTP Resent!', `A new OTP has been sent to ${email}.`);
      } else {
        Alert.alert('Resend Failed', result.message || 'Failed to resend OTP.');
      }
    } catch (error) {
      console.error('❌ Resend OTP Error:', error);
      Alert.alert('Error', 'Could not resend OTP. Please try again.');
    }
  }
};

    // 🕒 Format timer
    const formattedTime = `00:${timer < 10 ? `0${timer}` : timer}`;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ImageBackground
                source={ForgotPassword}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay} />

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={28} color="#ffffffbc" />
                </TouchableOpacity>

                <View style={styles.bottomContainer}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.card}>
                            <View style={styles.iconContainer}>
                                <Image
                                    source={RecoverPassword}
                                    style={styles.lockIcon}
                                    resizeMode="contain"
                                />
                            </View>

                            <View
                                style={{
                                    alignSelf: 'flex-start',
                                    marginLeft: responsiveWidth(4),
                                }}
                            >
                                <Text style={styles.title}>
                                    Password Reset{'\n'}Verification
                                </Text>
                            </View>

                            <Text style={styles.subtitle}>
                                Please enter the 4-digit code sent to{'\n'}
                                <Text style={styles.emailText}>{email}</Text> to reset your password
                            </Text>

                            <OtpInputBoxes
                                code={code}
                                setCode={setCode}
                                numberOfDigits={4}
                            />

                            <View style={styles.resendContainer}>
                                <Text style={styles.resendText}>
                                    Didn't receive the code?
                                </Text>

                                {timer > 0 ? (
                                    <Text style={styles.resendLink}> Resend ({formattedTime})</Text>
                                ) : (
                                    <TouchableOpacity onPress={handleResend}>
                                        <Text style={[styles.resendLink, { color: '#007BFF' }]}>
                                            Resend Now
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <View style={styles.curvedContainer}>
                                <Button title="Verify" onPress={handleSubmit} />
                            </View>

                            <View style={styles.helpContainer}>
                                <Text style={styles.helpText}>
                                    Having trouble logging in?
                                </Text>
                                <TouchableOpacity>
                                    <Text style={styles.getHelpText}> Get Help</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default ResetVerificationScreen;
