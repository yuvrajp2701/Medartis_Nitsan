import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { isTablet } from '../utils/responsive';

const actions = [
  { name: 'heart-outline', label: 'Bookmark' },
  { name: 'download-outline', label: 'Download' },
  { name: 'share-social-outline', label: 'Share' },
];

const VideoActions = () => (
  <View style={styles.container}>
    {actions.map((action) => (
      <TouchableOpacity key={action.label} style={styles.button}>
        <Icon name={action.name} size={18} color="#666" />
        <Text style={styles.label}>{action.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: isTablet ? 24 : 16,
    marginVertical: isTablet ? 16 : 12,
    gap: isTablet ? 12 : 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingVertical: isTablet ? 8 : 6,
    paddingHorizontal: isTablet ? 16 : 12,
    borderRadius: 24,
  },
  label: {
    marginLeft: 6,
    fontSize: isTablet ? 16 : 12,
    color: '#666',
  },
});

export default VideoActions;
