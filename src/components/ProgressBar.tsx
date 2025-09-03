import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight } from '../utils/responsive';

interface ProgressBarProps {
  progressAnim: Animated.Value;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressAnim }) => {
  return (
    <View style={styles.progressBarBackground}>
      <Animated.View
        style={[
          styles.progressBarFill,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarBackground: {
    width: responsiveWidth(70),
    height: responsiveHeight(1.2),
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: responsiveHeight(3),
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default ProgressBar;
