import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

const useSplashLoader = (onFinish: () => void) => {
  const [progress, setProgress] = useState(0);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;

        if (next >= 100) {
          clearInterval(interval);

          // Fade out after reaching 100%
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => onFinish());

          return 100;
        }

        return next;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Animate progress bar
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return { progress, progressAnim, fadeAnim };
};

export default useSplashLoader;
