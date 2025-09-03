/**
 * Splash Screen Component
 * Dynamically loads resources and shows progress before navigating to the main app.
 */
import React from 'react';
import { Animated, StatusBar, Text } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import useSplashLoader from '../hooks/useSplashLoader';
import { splashStyles } from '../styles/splashStyles';

interface SplashProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashProps> = ({ onFinish }) => {
  const { progress, progressAnim, fadeAnim } = useSplashLoader(onFinish);

  return (
    <Animated.View style={[splashStyles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* App Title */}
      <Text style={splashStyles.title}>medartis</Text>

      {/* Progress Bar */}
      <ProgressBar progressAnim={progressAnim} />

      {/* Loading Text */}
      <Text style={splashStyles.loadingText}>
        Getting things ready... {progress}%
      </Text>
    </Animated.View>
  );
};

export default SplashScreen;
