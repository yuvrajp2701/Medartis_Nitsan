import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { isTablet } from '../utils/responsive';

interface VideoDetailsProps {
  videoData?: any; // make it optional for safety
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ videoData }) => {
  // fallback for missing videoData
  if (!videoData) {
    return (
      <View style={styles.container}>
        <Text style={styles.value}>No video details available.</Text>
      </View>
    );
  }

  // prepare details safely using optional chaining
  const details = [
    {
      label: 'Publish Date',
      value: videoData?.creation_date
        ? new Date(videoData.creation_date * 1000).toLocaleDateString()
        : 'Unknown',
    },
    {
      label: 'Video Size',
      value: videoData?.videoSize
        ? `${(videoData.videoSize / (1024 * 1024)).toFixed(1)} Mb`
        : 'N/A',
    },
    {
      label: 'Area Of Interest',
      value: videoData?.areaOfInterest || videoData?.area || 'Not specified',
      highlight: true,
    },
    { label: 'Video Type', value: videoData?.filetype_video || 'Unknown' },
    { label: 'Language', value: videoData?.sprache || 'Unknown' },
  ];

  return (
    <View style={styles.container}>
      {details.map((item, idx) => (
        <View key={idx} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={[styles.value, item.highlight ? styles.highlight : null]}>
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: isTablet ? 24 : 16,
    paddingBottom: isTablet ? 16 : 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: isTablet ? 6 : 4,
  },
  label: {
    fontSize: isTablet ? 16 : 14,
    color: '#666',
  },
  value: {
    fontSize: isTablet ? 16 : 14,
    color: '#000',
  },
  highlight: {
    color: '#f5b000',
  },
});

export default VideoDetails;
