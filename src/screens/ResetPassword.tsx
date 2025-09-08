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
import { responsiveHeight } from '../utils/responsive';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { resetPassword } from '../APIs/ApiService';

type ResetPasswordScreenProp = NativeStackNavigationProp<
    RootStackParamList,
    'ResetPassword'
>;

const ResetPasswordScreen: React.FC = () => {
    const navigation = useNavigation<ResetPasswordScreenProp>();
    const route = useRoute();
    const { email } = route.params as { email: string };

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        console.log('🔧 Reset Password Triggered');

        if (!password || !confirmPassword) {
            console.warn('⚠️ One or both password fields are empty');
            Alert.alert('Error', 'Please fill in all password fields.');
            return;
        }

        if (password !== confirmPassword) {
            console.warn('⚠️ Passwords do not match');
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            console.warn('⚠️ Password too short');
            Alert.alert('Error', 'Password must be at least 6 characters long.');
            return;
        }

        try {
            console.log('📡 Calling API with:', {
                email,
                newPassword: password,
            });

            setLoading(true);

            const result = await resetPassword({
                email,
                newPassword: password,
            });

            setLoading(false);
            console.log('✅ API Response:', result);

            if (result.status === true) {
                console.log('🎉 Password reset successful');
                Alert.alert('Success', result.message || 'Password reset successful!');
                navigation.navigate('Login');
            } else {
                console.warn('❌ Reset failed with message:', result.message);
                Alert.alert('Reset Failed', result.message || 'Could not reset password.');
            }
        } catch (error) {
            setLoading(false);
            console.error('🔥 API Error:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.LoginscrollContainer}>
                <Logo />
                <Text style={styles.Logintitle}>Reset Your Password</Text>

                {/* New Password Field */}
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

                {/* Confirm Password Field */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Re-Type New Password</Text>
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

                {/* Reset Button */}
                <View style={{ marginTop: responsiveHeight(2) }}>
                    <Button title={loading ? 'Resetting...' : 'Reset'} onPress={handleReset} />
                </View>

                {/* Navigation Links */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Create</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                        <Text style={styles.loginLink}> New Account</Text>
                    </TouchableOpacity>
                </View>

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
