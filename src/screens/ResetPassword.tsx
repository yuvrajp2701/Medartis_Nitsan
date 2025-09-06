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
import { loginUser } from '../APIs/ApiService';

type ResetPasswordScreenProp = NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>;

const ResetPasswordScreen: React.FC = () => {
    const navigation = useNavigation<ResetPasswordScreenProp>();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        console.log('Reset button pressed');
        console.log('Input values:', { password, newPassword });

        // Basic empty fields check
        if (!password || !newPassword) {
            Alert.alert('Error', 'Please enter both password and new password');
            return;
        }

        try {
            console.log('Calling resetPassword API...');
            setLoading(true);

            const result = await resetPassword({ password, newPassword });

            setLoading(false);
            console.log('API response:', result);

            if (result.success) {
                Alert.alert('Success', result.message || 'Welcome back!');
                console.log('Login successful, navigating to next screen...');
                navigation.navigate('Login'); 
            } else {
                Alert.alert('Login Failed', result.message || 'Invalid credentials');
            }
        } catch (error) {
            setLoading(false);
            console.error('Login API error:', error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
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
                <Text style={styles.Logintitle}>Reset Your Password</Text>

                {/* User ID */}
                <View style={styles.inputGroup}>

                <Text style={styles.label}>Enter New Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        secureTextEntry={!showPassword}
                        placeholder="************"
                        placeholderTextColor="#99999960"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                </View>
                {/* Password */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Re-Type New Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            secureTextEntry={!showPassword}
                            placeholder="************"
                            placeholderTextColor="#99999960"
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <View style={{ marginTop: responsiveHeight(2) }}>
                    <Button title="Reset" onPress={handleReset} />
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

export default ResetPasswordScreen;

