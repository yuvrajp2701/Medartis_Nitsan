import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/videoGalleryStyles';
import { isTablet } from '../utils/responsive';
import { VideoItem } from '../screens/VideoGalleryScreen';

interface VideoCardProps {
  video: VideoItem;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  navigation: any;
}

const VideoCardList: React.FC<VideoCardProps> = ({ video, isFavorite, onToggleFavorite, navigation }) => {
  const getThumbnailUrl = () => {
    if (video.youtubeId) return `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
    if (video.vimeoId) return 'https://via.placeholder.com/320x180.png?text=Vimeo+Video';
    return 'https://via.placeholder.com/320x180.png?text=Video';
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => navigation.navigate('VideoDetail', { videoId: video.uid })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Thumbnail */}
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: getThumbnailUrl() }} style={styles.thumbnail} />

          {/* Buttons under thumbnail */}
          <View style={[styles.actionButtons, { marginTop: 8 }]}>
            <TouchableOpacity style={[styles.iconButton, styles.heartButton]} onPress={onToggleFavorite}>
              <Icon name="heart" size={isTablet ? 22 : 19} color={isFavorite ? '#FFD700' : '#fff'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, styles.downloadButton]}>
              <Icon name="download-outline" size={isTablet ? 22 : 20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Video Info */}
        <View style={{ flex: 1, marginLeft: isTablet ? 22 : 12, justifyContent: 'center' }}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={styles.videoDetails}>Published: {formatDate(video.creation_date)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VideoCardList;
