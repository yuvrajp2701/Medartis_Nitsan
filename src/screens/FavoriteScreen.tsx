import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// import VideoCard, { VideoItem } from '../components/VideoCard';
import VideoHeader from '../components/VideoHeader';
import BottomNavBar from '../components/BottomNavBar';
import styles from '../styles/videoGalleryStyles';
import VideoCardList from '../components/VideoCardList';

const FavoriteScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error('Error loading favorites ❌:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: { item: VideoItem }) => (
   <VideoCardList
  video={item}
  isFavorite={false}
  onToggleFavorite={() => {}}
  navigation={navigation} // Pass it down!
/>

  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
      {/* Header */}
      <VideoHeader title="Favorites" onBack={() => navigation.goBack()} />

      {/* No favorites */}
      {favorites.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#000', fontSize: 16 }}>No favorites yet!</Text>
          <Text style={{ color: '#888', fontSize: 12, marginTop: 5 }}>
            Add videos to favorites by tapping the heart icon ❤️
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.uid.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      {/* Bottom Nav */}
      <BottomNavBar activeTab="Videos" onTabPress={(tab) => console.log('Tab pressed', tab)} />
    </View>
  );
};

export default FavoriteScreen;
