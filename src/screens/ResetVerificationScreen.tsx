import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
    Image,
    TextInput,
    ScrollView,
    Alert
} from 'react-native';
import OtpInputBoxes from '../components/OtpInputBoxes';
import styles from '../styles/resetVerificationStyles';
import Title from '../components/Title';
import Button from '../components/Button';
import ForgotPassword from '../assets/ForgotPassword.png';
import RecoverPassword from '../assets/RecoverPassword.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import {
    responsiveHeight,
    responsiveWidth,
} from '../utils/responsive';

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ResetVerification'
>;

const ResetVerificationScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const [code, setCode] = useState(['', '', '', '']);
    // const [code, setCode] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(30); // 30 seconds timer


    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text.slice(-1);
        setCode(newCode);
    };// Timer countdown logic
useEffect(() => {
    let countdown: number | undefined;

    if (timer > 0) {
        countdown = setInterval(() => {
            setTimer(prev => prev - 1); // decrease timer by 1 each second
        }, 1000);
    }

    // Cleanup when component unmounts or timer changes
    return () => {
        if (countdown) clearInterval(countdown);
    };
}, [timer]);

// Resend OTP handler
const handleResend = () => {
    if (timer === 0) {
        setTimer(30); // restart the timer
       Alert.alert('OTP Resent!', 'A new OTP has been sent to your email or phone.');
        // TODO: Call your resend OTP API here
    }
};

// Format seconds into MM:SS format
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

                            {/* Title in two lines */}
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
                                <Text style={styles.emailText}>vivek.nitsan@gmail.com</Text> to reset your
                                password
                            </Text>

                            {/* 4-Digit Code Input Boxes */}
                            <OtpInputBoxes code={code} setCode={setCode} numberOfDigits={4} />


                            {/* Resend timer */}
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
                                <Button
                                    title="Verify"
                                    onPress={() => navigation.navigate('ResetPassword')}
                                />
                            </View>

                            {/* Help link */}
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

