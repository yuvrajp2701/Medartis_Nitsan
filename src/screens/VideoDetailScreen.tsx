  import React, { useEffect, useState } from 'react';
  import {
    View,
    ScrollView,
    ActivityIndicator,
    Text,
    StyleSheet,
    Alert,
  } from 'react-native';
  import RNFS from 'react-native-fs'; // <-- ADD THIS
  import { getVideos } from '../APIs/ApiService';
  import VideoHeader from '../components/VideoHeader';
  import VideoPlayer from '../components/VideoPlayer';
  import VideoActions from '../components/VideoActions';
  import VideoDetails from '../components/VideoDetails';
  import RelevantVideos from '../components/RelevantVideos';
  import BottomNavBar from '../components/BottomNavBar';

  const BASE_URL = 'https://medartis-app.thebetaspace.com';

  const VideoDetailScreen = ({ route, navigation }: any) => {
    const { videoId, video } = route.params || {}; // ✅ Added `video`
    const [videoData, setVideoData] = useState<any>(video || null); // Use passed video if exists
    const [loading, setLoading] = useState(!video); // Only load if no video passed
    const [relevantVideos, setRelevantVideos] = useState<any[]>([]);

    /**
     * Fetch video details + related videos
     */
  const fetchVideoDetails = async () => {
    if (!videoId) return;

    try {
      setLoading(true);
      const videos = await getVideos();

      const selectedVideo = videos.find((vid: any) => vid.uid === videoId);
      setVideoData(selectedVideo || null);

      const related = videos.filter(
        (vid: any) =>
          vid.uid !== videoId && vid.areaOfInterest === selectedVideo?.areaOfInterest
      );
      setRelevantVideos(related.slice(0, 6));
    } catch (error) {
      console.error('[fetchVideoDetails] Error fetching video details:', error);
      Alert.alert('Error', 'Could not fetch video details.');
    } finally {
      setLoading(false);
    }
  };


    useEffect(() => {
      if (videoId) fetchVideoDetails();

      // ✅ Debugging: check what's inside the cache directory
      RNFS.readDir(RNFS.CachesDirectoryPath)
        .then(files => {
          console.log('Cache Directory Files:', files);
        })
        .catch(err => {
          console.error('Error reading cache directory:', err);
        });
    }, [videoId]);

    if (loading) {
      return <ActivityIndicator style={{ flex: 1 }} size="large" />;
    }

    if (!videoData) {
      return (
        <Text style={{ flex: 1, textAlign: 'center', marginTop: 20 }}>
          Video not found
        </Text>
      );
    }

  const videoUrl = videoData?.path // downloaded video
    ? `file://${videoData.path}`
    : videoData?.videoPath // online video
      ? `${BASE_URL}${videoData.videoPath}`
      : null;


return (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    {/* Top Back Header */}
    <VideoHeader onBack={() => navigation.goBack()} />

    {/* Main Content */}
    <ScrollView 
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 80 }} // space for bottom nav
      showsVerticalScrollIndicator={false}
    >
      {/* Video Player */}
      <VideoPlayer videoUrl={videoUrl} />

      {/* Title */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{videoData?.title || 'Untitled Video'}</Text>
      </View>

      {/* Video Actions */}
      <VideoActions
        videoUrl={videoUrl}
        videoTitle={videoData?.title || 'video'}
      />

      {/* Video Details */}
      <VideoDetails videoData={videoData} />

      {/* Related Videos */}
      <RelevantVideos
        videos={relevantVideos}
        onPress={(id) => navigation.navigate('VideoDetail', { videoId: id })}
      />
    </ScrollView>

    {/* Bottom Navigation Bar */}
    <BottomNavBar 
      activeTab="Videos" 
      onTabPress={(tab) => console.log('Tab pressed', tab)} 
    />
  </View>
);

  };

  const styles = StyleSheet.create({
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginTop: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
      flex: 1,
      marginRight: 10,
    },
  });

  export default VideoDetailScreen;
