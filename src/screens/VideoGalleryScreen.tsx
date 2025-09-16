import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../components/BottomNavBar';
import { getVideos } from '../APIs/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/videoGalleryStyles';
import { isTablet } from '../utils/responsive';
import { useNavigation } from '@react-navigation/native';

interface VideoItem {
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
    const [username, setUsername] = useState<string | null>(null);
    const navigation = useNavigation();

    // Filter States
    const [selectedArea, setSelectedArea] = useState('Area of Interest');
    const [selectedProduct, setSelectedProduct] = useState('Products');
    const [selectedContentType, setSelectedContentType] = useState('Type of Content');
    const [selectedLanguage, setSelectedLanguage] = useState('Language');

    // Favorite tracking
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    /**
     * Toggle favorite video in AsyncStorage
     */
    const toggleFavorite = async (video: VideoItem) => {
        console.log('Toggling favorite for video UID:', video.uid);
        try {
            const existingFavorites = await AsyncStorage.getItem('favorites');
            const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

            // Check if video already exists in favorites
            const isAlreadyFavorite = favorites.some((fav: VideoItem) => fav.uid === video.uid);
            console.log('Already Favorite?', isAlreadyFavorite);

            let updatedFavorites;
            if (isAlreadyFavorite) {
                console.log('Removing from favorites:', video.title);
                updatedFavorites = favorites.filter((fav: VideoItem) => fav.uid !== video.uid);
            } else {
                console.log('Adding to favorites:', video.title);
                updatedFavorites = [...favorites, video];
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            console.log('Favorites updated successfully in AsyncStorage.');
        } catch (error) {
            console.error('Error updating favorites ❌:', error);
        }
    };

    /**
     * Load favorites when component mounts
     */
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favorites');
                console.log('Loaded favorites from AsyncStorage:', storedFavorites);
                if (storedFavorites) {
                    const parsedFavorites = JSON.parse(storedFavorites);
                    setFavoriteIds(parsedFavorites.map((fav: VideoItem) => fav.uid));
                }
            } catch (error) {
                console.error('Error loading favorites ❌:', error);
            }
        };

        loadFavorites();
    }, []);

    /**
     * Handle heart icon click
     */
    const handleFavoritePress = async (video: VideoItem) => {
        console.log('Heart icon pressed for UID:', video.uid);
        await toggleFavorite(video);

        setFavoriteIds((prev) => {
            if (prev.includes(video.uid)) {
                console.log('Removed UID from local favoriteIds:', video.uid);
                return prev.filter((id) => id !== video.uid);
            } else {
                console.log('Added UID to local favoriteIds:', video.uid);
                return [...prev, video.uid];
            }
        });
    };

    /**
     * Fetch username from AsyncStorage
     */
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                if (storedUsername) {
                    console.log('Fetched username from storage:', storedUsername);
                    setUsername(storedUsername);
                }
            } catch (error) {
                console.error('Error retrieving username ❌:', error);
            }
        };
        fetchUsername();
    }, []);

    /**
     * Fetch videos from API
     */
    const fetchVideoData = async () => {
        console.log('Fetching video data from API...');
        setLoading(true);
        try {
            const videoData = await getVideos();
            console.log('Videos fetched successfully:', videoData);
            setVideos(videoData);
        } catch (error) {
            console.error('Error fetching videos ❌:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideoData();
    }, []);

    /**
     * Format timestamp into readable date
     */
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000); // Convert seconds → milliseconds
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    /**
     * Get Thumbnail URL
     */
    const getThumbnailUrl = (item: VideoItem) => {
        if (item.youtubeId) {
            return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
        } else if (item.vimeoId) {
            return 'https://via.placeholder.com/320x180.png?text=Vimeo+Video';
        }
        return 'https://via.placeholder.com/320x180.png?text=Video';
    };

    /**
     * Render each video card
     */
    const renderVideoItem = ({ item }: { item: VideoItem }) => {
        const formatVideoSize = (sizeInBytes: number) => {
            if (!sizeInBytes) return '0 MB';
            return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
        };

        return (
            <TouchableOpacity
                style={styles.videoItem}
                onPress={() => {
                    console.log('Navigating to VideoDetail with UID:', item.uid);
                    navigation.navigate('VideoDetail', { videoId: item.uid });
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    {/* LEFT SIDE: Thumbnail + Buttons */}
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ position: 'relative' }}>
                            <Image source={{ uri: getThumbnailUrl(item) }} style={styles.thumbnail} />

                            {/* Video Size Badge */}
                            <View style={styles.videoSizeBadge}>
                                <Text style={styles.videoSizeText}>
                                    {formatVideoSize(item.videoSize || 0)}
                                </Text>
                            </View>
                        </View>

                        {/* Buttons BELOW Thumbnail */}
                        <View style={[styles.actionButtons, { marginTop: 8 }]}>
                            <TouchableOpacity
                                style={[styles.iconButton, styles.heartButton]}
                                onPress={() => handleFavoritePress(item)}
                            >
                                <Icon
                                    name="heart"
                                    size={isTablet ? 22 : 19}
                                    color={favoriteIds.includes(item.uid) ? '#FFD700' : '#fff'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.iconButton, styles.downloadButton]}>
                                <Icon name="download-outline" size={isTablet ? 22 : 20} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* RIGHT SIDE: Title + Date */}
                    <View style={{ flex: 1, marginLeft: isTablet ? 22 : 12, justifyContent: 'center' }}>
                        <Text style={styles.videoTitle} numberOfLines={2} ellipsizeMode="tail">
                            {item.title}
                        </Text>
                        <Text style={styles.videoDetails}>
                            Published: {formatDate(item.creation_date)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    /**
     * Loader when fetching videos
     */
    if (loading) {
        console.log('Loading videos, showing loader...');
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity
                    onPress={() => {
                        console.log('Back button pressed');
                        navigation.goBack();
                    }}
                    style={styles.titleWithArrow}
                >
                    <Icon name="arrow-back" size={24} color="#fff" style={styles.backArrow} />
                    <Text style={styles.title}>Videos</Text>
                </TouchableOpacity>

                <View style={styles.topRight}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('Navigating to Favorite screen');
                            navigation.navigate('Favorite');
                        }}
                    >
                        <Icon
                            name="heart-outline"
                            size={24}
                            color="#fff"
                            style={styles.iconSpacing}
                        />
                    </TouchableOpacity>
                    <Icon name="notifications-outline" size={isTablet ? 30 : 22} color="#fff" style={styles.iconSpacing} />
                    <Icon name="filter-outline" size={isTablet ? 30 : 22} color="#fff" style={styles.iconSpacing} />
                </View>
            </View>

            {/* Filters */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 16 }}>
                <TouchableOpacity
                    style={styles.filterBox}
                    onPress={() => console.log('Area of Interest selected')}
                >
                    <Text style={styles.filterText}>{selectedArea}</Text>
                    <Icon name="chevron-down" size={20} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.filterBox}
                    onPress={() => console.log('Products selected')}
                >
                    <Text style={styles.filterText}>{selectedProduct}</Text>
                    <Icon name="chevron-down" size={20} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 12 }}>
                <TouchableOpacity
                    style={styles.filterBox}
                    onPress={() => console.log('Type of Content selected')}
                >
                    <Text style={styles.filterText}>{selectedContentType}</Text>
                    <Icon name="chevron-down" size={20} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.filterBox}
                    onPress={() => console.log('Language selected')}
                >
                    <Text style={styles.filterText}>{selectedLanguage}</Text>
                    <Icon name="chevron-down" size={20} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Video List */}
            <FlatList
                data={videos}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.uid.toString()}
                contentContainerStyle={styles.listContainer}
            />

            {/* Bottom Navigation Bar */}
            <BottomNavBar activeTab="Videos" onTabPress={() => { console.log('BottomNavBar tab pressed'); }} />
        </View>
    );
};

export default VideoGalleryScreen;
