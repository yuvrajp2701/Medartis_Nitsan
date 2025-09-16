import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { isTablet } from '../utils/responsive';
import { downloadVideo } from '../utils/downloadVideo';
import AsyncStorage from '@react-native-async-storage/async-storage';

type VideoActionsProps = {
  videoUrl: string;
  videoTitle: string;
  onBookmark?: () => void;
  onShare?: () => void;
};

const actions = [
  { name: 'heart-outline', label: 'Bookmark', key: 'bookmark' },
  { name: 'download-outline', label: 'Download', key: 'download' },
  { name: 'share-social-outline', label: 'Share', key: 'share' },
];

const VideoActions: React.FC<VideoActionsProps> = ({
  videoUrl,
  videoTitle,
  onBookmark,
  onShare,
}) => {
  const [downloading, setDownloading] = useState(false);

const handleDownload = async () => {
  if (!videoUrl) {
    Alert.alert('Error', 'No video URL provided.');
    return;
  }

  try {
    setDownloading(true);
    const filename = `${videoTitle.replace(/\s+/g, '_').toLowerCase()}.mp4`;
    const localPath = await downloadVideo(videoUrl, filename);

    if (localPath) {
      Alert.alert('Success', 'Video downloaded successfully!');
      console.log('File saved at:', localPath);

      // ✅ Save metadata to AsyncStorage
      const stored = await AsyncStorage.getItem('downloadedVideos');
      const downloadedVideos = stored ? JSON.parse(stored) : [];

      // Add the new video
      downloadedVideos.push({
        name: videoTitle,
        path: localPath,
        size: 0, // Optional: You can use RNFS.stat to get size
      });

      await AsyncStorage.setItem('downloadedVideos', JSON.stringify(downloadedVideos));
    } else {
      Alert.alert('Failed', 'Video download failed.');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Something went wrong while downloading the video.');
  } finally {
    setDownloading(false);
  }
};


  // ✅ JSX must be returned
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.label}
          style={styles.button}
          onPress={() => {
            if (action.key === 'download') handleDownload();
            else if (action.key === 'bookmark' && onBookmark) onBookmark();
            else if (action.key === 'share' && onShare) onShare();
          }}
          disabled={downloading && action.key === 'download'}
        >
          <Icon
            name={
              action.key === 'download' && downloading
                ? 'cloud-download-outline'
                : action.name
            }
            size={18}
            color="#666"
          />
          <Text style={styles.label}>
            {action.key === 'download' && downloading ? 'Downloading...' : action.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: isTablet ? 24 : 16,
    marginVertical: isTablet ? 16 : 12,
    gap: isTablet ? 12 : 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingVertical: isTablet ? 8 : 6,
    paddingHorizontal: isTablet ? 16 : 12,
    borderRadius: 24,
  },
  label: {
    marginLeft: 6,
    fontSize: isTablet ? 16 : 12,
    color: '#666',
  },
});

export default VideoActions;
