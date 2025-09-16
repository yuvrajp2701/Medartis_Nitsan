import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/videoGalleryStyles';

interface VideoItem {
  uid: number;
  title: string;
  filetype_video: string;
  videoPath: string;
  visible: number;
  youtubeId: string;
  vimeoId: string;
  creation_date: number;
}

const FavoriteScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('FavoriteScreen mounted ✅');

    const fetchFavorites = async () => {
      console.log('Fetching favorites from AsyncStorage...');
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        console.log('Raw favorites from storage:', storedFavorites);

        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          console.log('Parsed favorites:', parsedFavorites);
          setFavorites(parsedFavorites);
        } else {
          console.log('No favorites found in AsyncStorage.');
          setFavorites([]);
        }
      } catch (error) {
        console.error('Error loading favorites ❌:', error);
      } finally {
        setLoading(false);
        console.log('Favorites fetching complete.');
      }
    };

    // Fetch whenever screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('FavoriteScreen is focused, refreshing favorites...');
      fetchFavorites();
    });

    return unsubscribe;
  }, [navigation]);

  const getThumbnailUrl = (item: VideoItem) => {
    if (item.youtubeId) {
      return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
    } else if (item.vimeoId) {
      return 'https://via.placeholder.com/320x180.png?text=Vimeo+Video';
    }
    return 'https://via.placeholder.com/320x180.png?text=Video';
  };

  const renderFavoriteItem = ({ item }: { item: VideoItem }) => {
    console.log('Rendering favorite video:', item.title, 'UID:', item.uid);

    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#fff',
          borderRadius: 8,
          marginBottom: 10,
          elevation: 2,
        }}
        onPress={() => {
          console.log('Navigating to VideoDetail for video UID:', item.uid);
          navigation.navigate('VideoDetail', { videoId: item.uid });
        }}
      >
        {/* Thumbnail */}
        <Image
          source={{ uri: getThumbnailUrl(item) }}
          style={{ width: 100, height: 60, borderRadius: 8 }}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>
            {item.title}
          </Text>
          <Text style={{ color: '#666', fontSize: 12, marginTop: 4 }}>
            UID: {item.uid} | {item.filetype_video}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    console.log('Loading favorites, showing ActivityIndicator...');
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            console.log('Back button pressed, navigating back...');
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 10,
          }}
        >
          Favorites
        </Text>
      </View>

      {/* No Favorites Case */}
      {favorites.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#000', fontSize: 16 }}>No favorites yet!</Text>
          <Text
            style={{
              color: '#888',
              fontSize: 12,
              marginTop: 5,
            }}
          >
            Add videos to favorites by tapping the heart icon ❤️
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.uid.toString()}
          renderItem={renderFavoriteItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default FavoriteScreen;
