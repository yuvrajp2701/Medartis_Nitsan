import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { isTablet } from '../utils/responsive';

interface VideoHeaderProps {
  title?: string;
  onBack: () => void;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({ title, onBack }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack}>
      <Icon name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title || 'Watch Video'}</Text>
    <View style={styles.headerActions}>
      <TouchableOpacity>
        <Icon name="heart-outline" size={22} color="#fff" style={styles.iconSpacing} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="notifications-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
    paddingVertical: isTablet ? 20 : 12,
    paddingHorizontal: isTablet ? 24 : 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { color: '#fff', fontSize: isTablet ? 24 : 18, fontWeight: '500' },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  iconSpacing: { marginRight: isTablet ? 24 : 16 },
});

export default VideoHeader;
