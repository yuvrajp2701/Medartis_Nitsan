import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface DocumentCardProps {
  image: any;
  title: string;
  size: string;
  tag: string;
  onFavoritePress: () => void;
  onDownloadPress: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  image,
  title,
  size,
  tag,
  onFavoritePress,
  onDownloadPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Document Image */}
      <View>
        <Image source={image} style={styles.image} />

        {/* Top Left Tag */}
        <View style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>

        {/* Bottom Left Size */}
        <View style={styles.sizeBadge}>
          <Text style={styles.sizeText}>{size}</Text>
        </View>

        {/* Bottom Right Actions */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={onFavoritePress} style={styles.iconButton}>
            <Icon name="heart-outline" size={18} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDownloadPress} style={styles.iconButton}>
            <Icon name="download-outline" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

export default DocumentCard;

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  tag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  sizeBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#FFF',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  sizeText: {
    fontSize: 11,
    color: '#000',
  },
  actions: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    padding: 4,
    marginLeft: 6,
  },
  title: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
});
