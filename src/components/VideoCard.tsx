import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  ActivityIndicator 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { isTablet } from '../utils/responsive';

const { width } = Dimensions.get('window');

interface CarouselCardProps {
  title: string;
  type: 'video' | 'document';
  thumbnailUrl?: string;
  onPress: () => void;
  onShare?: () => void;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  title,
  type,
  thumbnailUrl,
  onPress,
  onShare,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.thumbnailWrapper}>
        {/* Loader */}
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}

        {/* Thumbnail Image */}
        {thumbnailUrl ? (
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        ) : (
          <View style={[styles.thumbnail, { backgroundColor: '#ccc' }]} />
        )}

        {/* Center Play/View Button */}
        {!loading && (
          <TouchableOpacity style={styles.centerButton} onPress={onPress}>
            {type === 'video' ? (
              <Ionicons name="play" size={25} color="#000000ff" />
            ) : (
              <Text style={styles.buttonText}>View Document</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Bottom Right Action Buttons */}
        {!loading && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="heart-outline" size={18} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="download-outline" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        )}
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
    width: isTablet ? width / 3 - 10 : width - 30,
    height: 310,
    marginHorizontal: isTablet ? 5 : 15,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    overflow: 'hidden',
  },
  thumbnailWrapper: {
    flex: 1,
    position: 'relative',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '95%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: '#f2f2f2',
  },
  centerButton: {
    position: 'absolute',
    top: '33%',
    alignSelf: 'center',
    backgroundColor: 'rgba(247, 247, 247, 0.94)',
    padding: 14,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 15,
    right: 2,
    flexDirection: 'row',
    borderRadius: 8,
    padding: 4,
  },
  iconBtn: {
    marginHorizontal: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 3,
  },
  footer: {
    backgroundColor: '#ffffff38',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: '#333',
  },
});

export default CarouselCard;
