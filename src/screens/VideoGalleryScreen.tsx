import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../components/BottomNavBar';
import { getVideos } from '../APIs/ApiService';
import styles from '../styles/videoGalleryStyles';
import { isTablet } from '../utils/responsive';

// Components
import TopBar from '../components/TopBar';
import Filters from '../components/Filters';
import VideoCardList from '../components/VideoCardList';

export interface VideoItem {
  uid: number;
  title: string;
  filetype_video: string;
  videoPath: string;
  visible: number;
  youtubeId: string;
  vimeoId: string;
  creation_date: number;
  videoSize?: number;
}

const VideoGalleryScreen: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const navigation = useNavigation();

  /** Fetch all videos */
  const fetchVideoData = async () => {
    console.log('Fetching video data...');
    setLoading(true);
    try {
      const videoData = await getVideos();
      console.log('Video data fetched:', videoData);
      setVideos(videoData);
    } catch (error) {
      console.error('Error fetching videos ❌:', error);
    } finally {
      setLoading(false);
    }
  };

  /** Load favorites from storage */
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavoriteIds(parsedFavorites.map((fav: VideoItem) => fav.uid));
    } catch (error) {
      console.error('Error loading favorites ❌:', error);
    }
  };

  /** Toggle a video in favorites */
  const toggleFavorite = async (video: VideoItem) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      const exists = favorites.some((fav: VideoItem) => fav.uid === video.uid);
      const updatedFavorites = exists
        ? favorites.filter((fav: VideoItem) => fav.uid !== video.uid)
        : [...favorites, video];

      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      loadFavorites();
    } catch (error) {
      console.error('Error toggling favorite ❌:', error);
    }
  };

  useEffect(() => {
    fetchVideoData();
    loadFavorites();
  }, []);

  /** Loader State */
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <TopBar navigation={navigation} />

      {/* Filters */}
      <Filters />

      {/* Video List */}
      {videos.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No videos found</Text>
        </View>
      ) : (
        <FlatList
          data={videos}
          renderItem={({ item }) => (
            <VideoCardList
              video={item}
              isFavorite={favoriteIds.includes(item.uid)}
              onToggleFavorite={() => toggleFavorite(item)}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.uid.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Bottom Navigation Bar */}
      <BottomNavBar
        activeTab="VideoGallery"
        onTabPress={(tab) => console.log('BottomNavBar tab pressed:', tab)}
      />
    </View>
  );
};

export default VideoGalleryScreen;
