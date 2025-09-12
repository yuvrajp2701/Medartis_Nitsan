import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { getVideos } from '../APIs/ApiService';
import VideoHeader from '../components/VideoHeader';
import VideoPlayer from '../components/VideoPlayer';
import VideoActions from '../components/VideoActions';
import VideoDetails from '../components/VideoDetails';
import RelevantVideos from '../components/RelevantVideos';
import BottomNavBar from '../components/BottomNavBar';

const BASE_URL = 'https://medartis-app.thebetaspace.com';

const VideoDetailScreen = ({ route, navigation }: any) => {
  const { videoId } = route.params || {};
  const [videoData, setVideoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relevantVideos, setRelevantVideos] = useState<any[]>([]);

  const fetchVideoDetails = async () => {
    try {
      setLoading(true);
      const videos = await getVideos();
      const selectedVideo = videos.find((vid: any) => vid.uid === videoId);
      setVideoData(selectedVideo || null);
      const related = videos.filter(
        (vid: any) => vid.uid !== videoId && vid.areaOfInterest === selectedVideo?.areaOfInterest
      );
      setRelevantVideos(related.slice(0, 6));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoId) fetchVideoDetails();
  }, [videoId]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  if (!videoData)
    return (
      <Text style={{ flex: 1, textAlign: 'center', marginTop: 20 }}>Video not found</Text>
    );

  const videoUrl = videoData.videoPath
    ? `${BASE_URL}${videoData.videoPath}`
    : `${BASE_URL}/fileadmin/VideoDownload/Vimeo/default.mp4`;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <VideoHeader onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VideoPlayer videoUrl={videoUrl} />

        {/* Video Title */}
        <Text style={styles.title}>{videoData?.title || 'Untitled Video'}</Text>

        <VideoActions />
        <VideoDetails videoData={videoData} />
        <RelevantVideos
          videos={relevantVideos}
          onPress={(id) => navigation.navigate('VideoDetail', { videoId: id })}
        />
        <BottomNavBar activeTab="Videos" onTabPress={() => {}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#000',
  },
});

export default VideoDetailScreen;
