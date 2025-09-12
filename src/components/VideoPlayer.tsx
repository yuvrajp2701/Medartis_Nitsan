import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { isTablet } from '../utils/responsive';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => (
  <View style={styles.videoWrapper}>
    <Video source={{ uri: videoUrl }} style={styles.video} resizeMode="contain" controls />
  </View>
);

const styles = StyleSheet.create({
  videoWrapper: { backgroundColor: '#000', height: isTablet ? 400 : 220 },
  video: { width: '100%', height: '100%' },
});

export default VideoPlayer;
