import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

const useSplashLoader = (onFinish: () => void) => {
  const [progress, setProgress] = useState(0);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const internalProgress = useRef(0); // Track actual progress independently

  const hasFinished = useRef(false); // Prevent multiple finish calls

  useEffect(() => {
    console.log('[SplashLoader] Starting progress interval...');
    
    const interval = setInterval(() => {
      internalProgress.current += 1;
      setProgress(internalProgress.current);

      console.log(`[SplashLoader] Progress: ${internalProgress.current}`);

      if (internalProgress.current >= 100 && !hasFinished.current) {
        console.log('[SplashLoader] Reached 100. Clearing interval and starting fade out...');
        
        hasFinished.current = true;
        clearInterval(interval);

        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          console.log('[SplashLoader] Fade out completed. Calling onFinish...');
          onFinish();
        });
      }
    }, 20);

    return () => {
      console.log('[SplashLoader] Cleanup: Clearing interval');
      clearInterval(interval);
    };
  }, []);

  // Animate progress bar
  useEffect(() => {
    console.log(`[SplashLoader] Animating progress to ${progress}`);
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return { progress, progressAnim, fadeAnim };
};

export default useSplashLoader;
