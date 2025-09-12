import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { isTablet } from '../utils/responsive';

const BASE_URL = 'https://medartis-app.thebetaspace.com';

interface RelevantVideosProps {
  videos: any[];
  onPress: (videoId: number) => void;
}

const RelevantVideos: React.FC<RelevantVideosProps> = ({ videos, onPress }) => {
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.relevantCard}
      onPress={() => onPress(item.uid)}
    >
      <Image
        source={{
          uri: item.thumbnailPath
            ? `${BASE_URL}${item.thumbnailPath}`
            : 'https://via.placeholder.com/150',
        }}
        style={styles.relevantThumbnail}
      />
      <Text style={styles.relevantTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return videos.length > 0 ? (
    <View style={styles.relevantContainer}>
      <Text style={styles.relevantHeader}>Relevant Videos</Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.uid.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  relevantContainer: {
    paddingHorizontal: isTablet ? 24 : 16,
    paddingVertical: isTablet ? 20 : 16,
  },
  relevantHeader: {
    fontSize: isTablet ? 20 : 16,
    fontWeight: '600',
    marginBottom: isTablet ? 16 : 12,
    color: '#000',
  },
  relevantCard: {
    marginBottom: isTablet ? 16 : 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  relevantThumbnail: {
    width: isTablet ? 180 : 120,
    height: isTablet ? 120 : 70,
    borderRadius: 8,
    backgroundColor: '#ccc',
    marginRight: isTablet ? 16 : 12,
  },
  relevantTitle: {
    flex: 1,
    fontSize: isTablet ? 18 : 14,
    color: '#000',
  },
});

export default RelevantVideos;
