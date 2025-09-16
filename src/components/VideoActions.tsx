import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { isTablet } from '../utils/responsive';
import { downloadVideo } from '../utils/downloadVideo';
import AsyncStorage from '@react-native-async-storage/async-storage';

type VideoActionsProps = {
  videoUrl: string;
  videoTitle: string;
  videoData: any; // Full video object
  onShare?: () => void;
};

const actions = [
  { name: 'heart-outline', label: 'Bookmark', key: 'bookmark' },
  { name: 'download-outline', label: 'Download', key: 'download' },
  { name: 'share-social-outline', label: 'Share', key: 'share' },
];

const VideoActions: React.FC<VideoActionsProps> = ({ videoUrl, videoTitle, videoData, onShare }) => {
  const [downloading, setDownloading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // ✅ Check bookmark status when component mounts
  useEffect(() => {
    const loadBookmarkStatus = async () => {
      try {
        const favs = await AsyncStorage.getItem('favorites');
        const favoriteList = favs ? JSON.parse(favs) : [];
        const exists = favoriteList.some((item: any) => item.uid === videoData?.uid);
        setIsBookmarked(exists);
      } catch (err) {
        console.error('Error loading bookmark status:', err);
      }
    };
    if (videoData?.uid) loadBookmarkStatus();
  }, [videoData]);

  // ✅ Toggle bookmark
  const handleBookmark = async () => {
    try {
      const favs = await AsyncStorage.getItem('favorites');
      const favoriteList = favs ? JSON.parse(favs) : [];

      if (isBookmarked) {
        // Remove from favorites
        const updated = favoriteList.filter((item: any) => item.uid !== videoData.uid);
        await AsyncStorage.setItem('favorites', JSON.stringify(updated));
        setIsBookmarked(false);
        Alert.alert('Removed', 'Video removed from bookmarks');
      } else {
        // Add to favorites
        const updated = [...favoriteList, videoData];
        await AsyncStorage.setItem('favorites', JSON.stringify(updated));
        setIsBookmarked(true);
        Alert.alert('Added', 'Video added to bookmarks');
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      Alert.alert('Error', 'Could not update bookmarks');
    }
  };

  // ✅ Handle download
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

        const stored = await AsyncStorage.getItem('downloadedVideos');
        const downloadedVideos = stored ? JSON.parse(stored) : [];

        downloadedVideos.push({
          name: videoTitle,
          path: localPath,
          size: 0,
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

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.label}
          style={styles.button}
          onPress={() => {
            if (action.key === 'download') handleDownload();
            else if (action.key === 'bookmark') handleBookmark();
            else if (action.key === 'share' && onShare) onShare();
          }}
          disabled={downloading && action.key === 'download'}
        >
          <Icon
            name={
              action.key === 'bookmark'
                ? isBookmarked
                  ? 'heart'
                  : 'heart-outline'
                : action.key === 'download' && downloading
                ? 'cloud-download-outline'
                : action.name
            }
            size={18}
            color={action.key === 'bookmark' && isBookmarked ? '#FFD700' : '#666'}
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
