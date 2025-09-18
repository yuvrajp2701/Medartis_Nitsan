import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
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

const VideoCardList: React.FC<VideoCardProps> = ({
  video,
  isFavorite,
  onToggleFavorite,
  navigation,
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  /** Debugging the video item data */
  useEffect(() => {
    console.log('🎥 VideoCardList Loaded Video Item:', video);
    console.log('📌 Video UID:', video?.uid);
    console.log('📌 Video Title:', video?.title);
    console.log('📌 Video Size (bytes):', video?.size);
    console.log('📌 Video Published Timestamp:', video?.creation_date);
    console.log('📌 Youtube ID:', video?.youtubeId);
    console.log('📌 Vimeo ID:', video?.vimeoId);
  }, [video]);

/** 
 * Helper function to format file size into MB/KB/GB
 */
const formatFileSize = (bytes: number): string => {
  if (!bytes || bytes <= 0) return '0 MB';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`; // one decimal place
};

  const getThumbnailUrl = () => {
    const url = video.youtubeId
      ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
      : video.vimeoId
      ? 'https://via.placeholder.com/320x180.png?text=Vimeo+Video'
      : 'https://via.placeholder.com/320x180.png?text=Video';

    console.log('🖼️ Thumbnail URL:', url);
    return url;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => {
        console.log('➡️ Navigating to VideoDetail with ID:', video.uid);
        navigation.navigate('VideoDetail', { videoId: video.uid });
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Thumbnail Section */}
        <View style={{ alignItems: 'center', position: 'relative' }}>
          {/* Loader while the image loads */}
          {imageLoading && (
            <View style={[styles.loaderBackground, { position: 'absolute' }]}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          )}

          {/* Thumbnail Image */}
          <Image
            source={{ uri: getThumbnailUrl() }}
            style={styles.thumbnail}
            onLoadStart={() => {
              console.log('⏳ Thumbnail loading started for video:', video.title);
              setImageLoading(true);
            }}
            onLoadEnd={() => {
              console.log('✅ Thumbnail loading completed for video:', video.title);
              setImageLoading(false);
            }}
          />

          {/* Play Button - only show when NOT loading */}
          {!imageLoading && (
            <View style={styles.playButtonContainer}>
              <Icon name="play" size={isTablet ? 32 : 15} color="#000000ff" />
            </View>
          )}

          {/* Video Size - bottom right corner */}
          {!imageLoading && video.size && (
            <View style={styles.videoSizeContainer}>
              <Text style={styles.videoSizeText}>
                {formatFileSize(video.videoSize)}
              </Text>
            </View>
          )}

          {/* Buttons under thumbnail */}
          <View style={[styles.actionButtons, { marginVertical: 9 }]}>
            {/* Favorite Button */}
            <TouchableOpacity
              style={[
                styles.iconButton,
                isFavorite ? styles.heartButton : styles.notFavouriteButton,
              ]}
              onPress={() => {
                console.log('❤️ Toggled favorite for video:', video.title);
                onToggleFavorite();
              }}
            >
              <View
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Outer heart border */}
                <Icon
                  name="heart"
                  size={isTablet ? 24 : 17}
                  color={isFavorite ? '#ffffff' : '#000'}
                  style={{ position: 'absolute' }}
                />
                {/* Inner heart */}
                <Icon
                  name="heart"
                  size={isTablet ? 22 : 13}
                  color={isFavorite ? '#ffffff' : '#D3D3D3'}
                />
              </View>
            </TouchableOpacity>

            {/* Download Button */}
            <TouchableOpacity
              style={[styles.iconButton, styles.downloadButton]}
              onPress={() => console.log('⬇️ Download button pressed for:', video.title)}
            >
              <Icon name="download-outline" size={isTablet ? 22 : 20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Video Info Section */}
        <View
          style={{
            flex: 1,
            marginTop: 10,
            marginLeft: isTablet ? 22 : 12,
            justifyContent: 'center',
          }}
        >
          <Text style={styles.videoTitle} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={styles.videoDetails}>
            Published: {formatDate(video.creation_date)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VideoCardList;
