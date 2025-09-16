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
import styles from '../styles/videoGalleryStyles'; // Your provided styles
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

    // Fetch username from AsyncStorage
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                if (storedUsername) setUsername(storedUsername);
            } catch (error) {
                console.error('Error retrieving username:', error);
            }
        };
        fetchUsername();
    }, []);

    // Fetch videos from API
    const fetchVideoData = async () => {
        setLoading(true);
        try {
            const videoData = await getVideos();
            setVideos(videoData);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideoData();
    }, []);
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000); // Convert seconds → milliseconds
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const getThumbnailUrl = (item: VideoItem) => {
        if (item.youtubeId) {
            return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
        } else if (item.vimeoId) {
            return 'https://via.placeholder.com/320x180.png?text=Vimeo+Video';
        }
        return 'https://via.placeholder.com/320x180.png?text=Video';
    };

    const renderVideoItem = ({ item }: { item: VideoItem }) => {
        // Convert videoSize to MB
        const formatVideoSize = (sizeInBytes: number) => {
            if (!sizeInBytes) return "0 MB";
            return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
        };

        return (
            <TouchableOpacity
                style={styles.videoItem}
                onPress={() => {
                    console.log('Navigating with Video UID:', item.uid); // ✅ Check UID here
                    navigation.navigate('VideoDetail', { videoId: item.uid });
                    console.log('item is hereee', item)
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>

                    {/* LEFT SIDE: Thumbnail + Buttons */}
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ position: 'relative' }}>
                            {/* Thumbnail */}
                            <Image source={{ uri: getThumbnailUrl(item) }} style={styles.thumbnail} />

                            {/* Video Size Badge */}
                            <View style={styles.videoSizeBadge}>
                                <Text style={styles.videoSizeText}>
                                    {formatVideoSize(item.videoSize)}
                                </Text>
                            </View>
                        </View>

                        {/* Buttons BELOW Thumbnail */}
                        <View style={[styles.actionButtons, { marginTop: 8 }]}>
                            <TouchableOpacity style={[styles.iconButton, styles.heartButton]}>
                                <Icon name="heart" size={isTablet ? 22 : 19} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.iconButton, styles.downloadButton]}>
                                <Icon name="download-outline" size={isTablet ? 22 : 20} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* RIGHT SIDE: Title + Date */}
                    <View style={{ flex: 1, marginLeft: isTablet ? 22 : 12, justifyContent: 'center' }}>
                        <Text
                            style={styles.videoTitle}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
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



    if (loading) {
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
                    onPress={() => navigation.goBack()}
                    style={styles.titleWithArrow}
                >
                    <Icon name="arrow-back" size={24} color="#fff" style={styles.backArrow} />
                    <Text style={styles.title}>Videos</Text>
                </TouchableOpacity>

                <View style={styles.topRight}>
                    <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
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
            {/* Two-Column Filter Layout */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    marginTop: 16,
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        padding: 12,
                        marginRight: 8,
                        elevation: 2,
                        alignItems: 'center',
                        flexDirection: 'row', // To align the text and icon horizontally
                        justifyContent: 'space-between',
                    }}
                    onPress={() => console.log('Area of Interest selected')}
                >
                    <Text style={{ fontSize: 16, color: '#333', fontWeight: '500' }}>
                        {selectedArea}
                    </Text>
                    <Icon name="chevron-down" size={20} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        padding: 12,
                        marginLeft: 8,
                        elevation: 2,
                        alignItems: 'center',
                        flexDirection: 'row', // To align the text and icon horizontally
                        justifyContent: 'space-between',
                    }}
                    onPress={() => console.log('Products selected')}
                >
                    <Text style={{ fontSize: 16, color: '#333', fontWeight: '500' }}>
                        {selectedProduct}
                    </Text>
                    <Icon name="chevron-down" size={20} color="#333" />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    marginTop: 12,
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        padding: 12,
                        marginRight: 8,
                        elevation: 2,
                        alignItems: 'center',
                        flexDirection: 'row', // To align the text and icon horizontally
                        justifyContent: 'space-between',
                        marginBottom: 16,
                    }}
                    onPress={() => console.log('Type of Content selected')}
                >
                    <Text style={{ fontSize: 16, color: '#333', fontWeight: '500' }}>
                        {selectedContentType}
                    </Text>
                    <Icon name="chevron-down" size={20} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        padding: 12,
                        marginLeft: 8,
                        elevation: 2,
                        alignItems: 'center',
                        flexDirection: 'row', // To align the text and icon horizontally
                        justifyContent: 'space-between',
                        marginBottom: 16,
                    }}
                    onPress={() => console.log('Language selected')}
                >
                    <Text style={{ fontSize: 16, color: '#333', fontWeight: '500' }}>
                        {selectedLanguage}
                    </Text>
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
            <BottomNavBar activeTab="Videos" onTabPress={() => { }} />
        </View>
    );
};

export default VideoGalleryScreen;
