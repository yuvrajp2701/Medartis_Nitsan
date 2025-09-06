import React, { useState, useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import OtpVerificationScreen from './src/screens/OtpVerificationScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetVerificationScreen from './src/screens/ResetVerificationScreen';
import ResetPasswordScreen from './src/screens/ResetPassword';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Registration: undefined;
  OtpVerification: undefined;
  ForgotPassword: undefined;
  ResetVerification: { email: string };
  ResetPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000); // auto-hide splash
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000' : '#fff'}
      />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
        >
          {showSplash ? (
            <Stack.Screen name="Splash">
              {() => <SplashScreen onFinish={() => setShowSplash(false)} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Registration" component={RegistrationScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="ResetVerification" component={ResetVerificationScreen} />
              <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} /> 

            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
