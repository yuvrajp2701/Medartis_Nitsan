import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CarouselCard from '../components/VideoCard';
import Title from '../components/Title';
import styles from '../styles/HomeScreenStyles';
import BottomNavBar from '../components/BottomNavBar';
import DocumentsSection from '../components/DocumentsSection';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface VideoItem {
    uid: number;
    title: string;
    filetype_video: string;
    videoPath: string;
    visible: number;
    youtubeId: string;
    vimeoId: string;
}

const HomeScreen: React.FC = () => {
    const carouselRef = useRef<FlatList>(null);
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Home');
    const [username, setUsername] = useState<string | null>(null);

    const handleTabPress = (tab: string) => {
        console.log(`Switched to tab: ${tab}`);
        setActiveTab(tab);
    };
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                if (storedUsername) {
                    console.log('Retrieved username from AsyncStorage:', storedUsername);
                    setUsername(storedUsername);
                } else {
                    console.log('No username found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error retrieving username:', error);
            }
        };

        fetchUsername();
    }, []);
    const fetchVideos = async () => {
        try {
            const response = await fetch('https://medartis-app.thebetaspace.com/api/v1/list-videos', {
                method: 'GET',
                headers: {
                    'app-key': 'yrWN6aKdDdTeTTSwdyXw2L8UOmfc5rxP',
                },
            });

            const data = await response.json();
            const visibleVideos = data.files.filter((v: VideoItem) => v.visible === 1);
            setVideos(visibleVideos);
        } catch (error) {
            console.error('Failed to fetch videos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(index);
    };

    const getThumbnailUrl = (item: VideoItem) => {
        if (item.youtubeId) {
            return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
        } else if (item.vimeoId) {
            return 'https://via.placeholder.com/320x180.png?text=Vimeo+Video'; // fallback
        }
        return 'https://via.placeholder.com/320x180.png?text=Video';
    };

    const renderCarouselItem = ({ item }: { item: VideoItem }) => (
        <CarouselCard
            title={item.title}
            type="video"
            thumbnailUrl={getThumbnailUrl(item)}
            onPress={() => {
                console.log('Clicked:', item.title);
                // TODO: Navigate or open video
            }}
        />
    );
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icon name="menu" size={24} color="#fff" />
                </TouchableOpacity>

                <View style={styles.topRight}>
                    <Icon name="notifications-outline" size={22} color="#fff" style={styles.iconSpacing} />
                    <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
                        <Icon
                            name="heart-outline"
                            size={24}
                            color="#fff"
                            style={styles.iconSpacing}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.brand}>medartis</Text>
            </View>

            {/* Title with Left Icon */}
            <View style={styles.titleContainer}>
                <Ionicons name="heart-outline" size={24} color="#000" style={styles.icon} />
                <Title text="Latest Updates" />
            </View>

            {/* Carousel for Latest Updates */}
            {loading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
            ) : (
                <>
                    <FlatList
                        ref={carouselRef}
                        data={videos}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.uid.toString()}
                        onScroll={handleScroll}
                        renderItem={renderCarouselItem}
                        snapToInterval={width}
                        decelerationRate="fast"
                    />
                    <View style={styles.dotsContainer}>
                        {videos.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    index === activeIndex ? styles.activeDot : null,
                                ]}
                            />
                        ))}
                    </View>
                </>
            )}

            {/* Videos Section Header */}
            <View style={styles.sectionHeader}>
                <View style={styles.titleRow}>
                    <Ionicons name="play-circle-outline" size={24} color="#000" style={styles.icon} />
                    <Title text="Videos" />
                </View>

                {/* View All Button */}
                <TouchableOpacity style={styles.viewAllBtn}>
                    <Icon name="eye-outline" size={14} color="#FFF" style={{ marginRight: 4 }} />
                    <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
            </View>

            {/* Carousel for Videos */}
            {loading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 80 }} />
            ) : (
                <>
                    <FlatList
                        ref={carouselRef}
                        data={videos}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.uid.toString()}
                        onScroll={handleScroll}
                        renderItem={renderCarouselItem}
                        snapToInterval={width}
                        decelerationRate="fast"
                    />
                    <View style={styles.dotsContainer}>
                        {videos.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    index === activeIndex ? styles.activeDot : null,
                                ]}
                            />
                        ))}
                    </View>
                </>
            )}

            {/* Documents Section */}
            <View style={{ paddingBottom: 80 }}>
                <DocumentsSection />
            </View>

            {/* Bottom NavBar */}
            <BottomNavBar activeTab={activeTab} onTabPress={handleTabPress} />
        </ScrollView>
    );
};

export default HomeScreen;
