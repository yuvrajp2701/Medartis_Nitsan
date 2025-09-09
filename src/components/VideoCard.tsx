import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { isTablet } from '../utils/responsive';
const { width } = Dimensions.get('window');


interface CarouselCardProps {
  title: string;
  type: 'video' | 'document';
  thumbnailUrl?: string;
  onPress: () => void;
  onShare?: () => void; // Added optional prop for share action
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  title,
  type,
  thumbnailUrl,
  onPress,
  onShare,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.thumbnailWrapper}>
        {/* Thumbnail Image */}
        {thumbnailUrl ? (
          <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, { backgroundColor: '#ccc' }]} />
        )}

        {/* Center Play/View Button */}
        <TouchableOpacity style={styles.centerButton} onPress={onPress}>
          <Text style={styles.buttonText}>
            {type === 'video' ? 'Watch Video' : 'View Document'}
          </Text>
        </TouchableOpacity>

        {/* Bottom Left Share Button */}
        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <Ionicons name="share-outline" size={20} color="#000" />
        </TouchableOpacity>

        {/* Bottom Right Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="heart-outline" size={18} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="download-outline" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: isTablet?width/3: width,
    height: 270,
    // marginHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    overflow: 'hidden',
  },
  thumbnailWrapper: {
    flex: 1,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  centerButton: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  /* Share button at bottom-left */
  shareButton: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    padding: 6,
  },
  /* Like & Download buttons at bottom-right */
  actionButtons: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    padding: 4,
  },
  iconBtn: {
    marginHorizontal: 4,
  },
  footer: {
    backgroundColor: '#7a7a7a38',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default CarouselCard;
