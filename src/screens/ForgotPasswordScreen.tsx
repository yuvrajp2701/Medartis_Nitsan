import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ImageBackground,
    Image,
    ScrollView,
} from 'react-native';
import styles from '../styles/ForgotPasswordStyles';
import Title from '../components/Title';
import Button from '../components/Button';
import ForgotPassword from '../assets/ForgotPassword.png';
import iconForgot from '../assets/iconForgot.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import {
    isTablet,
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from '../utils/responsive';
import LabelText from '../components/LabelText';

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ForgotPassword'
>;

const ForgotPasswordScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const [email, setEmail] = useState('');

    /** Handle Reset Password */
    const handleResetPassword = () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address.');
            return;
        }

        // Navigate to OTP Verification Screen
        navigation.navigate('ResetVerification', {
            email: email, // Pass email for display or API use
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Background image */}
            <ImageBackground
                source={ForgotPassword}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay} />

                {/* Back button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={28} color="#ffffffbc" />
                </TouchableOpacity>

                {/* Bottom white container */}
                <View style={styles.bottomContainer}>
                    {/* ✅ Scrollable Card for Tablets */}
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.card}>
                            {/* Lock Icon */}
                            <View style={styles.iconContainer}>
                                <Image
                                    source={iconForgot}
                                    style={styles.lockIcon}
                                    resizeMode="contain"
                                />
                            </View>

                            {/* Title */}
                            <View
                                style={{
                                    alignSelf: 'flex-start',
                                    marginLeft: responsiveWidth(4),
                                }}
                            >
                                <Title text="Reset Your Password" />
                            </View>

                            {/* Subtitle */}
                            <Text style={styles.subtitle}>
                                To reset your password, enter the email address
                                stored in the backend user account.
                            </Text>

                            {/* Email Label */}
                            <View
                                style={{
                                    width: '100%',
                                    alignItems: isTablet ? 'center' : 'flex-start',
                                    paddingLeft: responsiveWidth(4),
                                    marginBottom: responsiveHeight(0.2),
                                }}
                            >
                                <LabelText text="Enter your email address" />
                            </View>

                            {/* Email Input */}
                            <View style={styles.inputContainer}>
                                <Icon
                                    name="mail-outline"
                                    size={responsiveFontSize(18)}
                                    color="#999"
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Your Email"
                                    placeholderTextColor="#282727ff"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Reset Button */}
                            <View style={styles.curvedContainer}>
                                <Button
                                    title="GET RESET CODE"
                                    onPress={handleResetPassword}
                                />
                            </View>

                            {/* Note */}
                            <Text style={styles.note}>
                                Note: If you're using a centralized user management
                                system such as LDAP, OAuth or Active Directory, you
                                might not receive an email.
                            </Text>

                            {/* Back to login */}
                            <TouchableOpacity
                                style={styles.backToLogin}
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text style={styles.backToLoginText}>
                                    ← Go Back To Login Page
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default ForgotPasswordScreen;
