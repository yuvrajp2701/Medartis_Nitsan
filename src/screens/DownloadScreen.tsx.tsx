// screens/DownloadScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import BottomNavBar from '../components/BottomNavBar';
import Video from 'react-native-video';

interface DownloadedVideo {
  name: string;
  path: string;
  size: number;
}

const DownloadScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'Videos' | 'Documents'>('Videos');
  const [downloadedVideos, setDownloadedVideos] = useState<DownloadedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch all downloaded files from cache
   */
  const fetchDownloadedVideos = async () => {
    try {
      setLoading(true);
      const files = await RNFS.readDir(RNFS.CachesDirectoryPath);

      console.log('[DownloadScreen] Cache Directory Files:', files);

      // Filter only mp4 files
      const videos = files
        .filter(file => file.name.endsWith('.mp4'))
        .map(file => ({
          name: file.name,
          path: file.path,
          size: file.size,
        }));

      setDownloadedVideos(videos);
    } catch (error) {
      console.error('[DownloadScreen] Error reading cache directory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDownloadedVideos();
  }, []);

  /**
   * Render each downloaded video
   */
  const renderVideoItem = ({ item }: { item: DownloadedVideo }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => navigation.navigate('VideoDetail', { video: item })}
    >
      <Video
        source={{ uri: 'file://' + item.path }}
        style={styles.videoPreview}
        resizeMode="cover"
        muted
        repeat
      />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {item.name.replace('.mp4', '')}
        </Text>
        <Text style={styles.videoSize}>
          {(item.size / (1024 * 1024)).toFixed(2)} MB
        </Text>
      </View>
    </TouchableOpacity>

  );


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Downloads</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Icon name="heart-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellContainer}>
            <Icon name="notifications-outline" size={22} color="#fff" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>5</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Videos' && styles.activeTab]}
          onPress={() => setActiveTab('Videos')}
        >
          <Text style={styles.tabText}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Documents' && styles.activeTab]}
          onPress={() => setActiveTab('Documents')}
        >
          <Text style={styles.tabText}>Documents</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#d4af37" />
        ) : downloadedVideos.length === 0 ? (
          <Text style={styles.emptyText}>
            No {activeTab.toLowerCase()} available offline. Download {activeTab.toLowerCase()} to view them offline.
          </Text>
        ) : (
          <FlatList
            data={downloadedVideos}
            keyExtractor={(item) => item.path}
            renderItem={renderVideoItem}
            contentContainerStyle={{ padding: 16 }}
          />
        )}
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar
        activeTab="Downloads"
        onTabPress={(tabName) => {
          if (tabName === 'Favorites') navigation.navigate('FavoriteScreen');
          else if (tabName === 'Downloads') navigation.navigate('DownloadScreen');
          else navigation.navigate(tabName); // Navigate to other tabs like Home, Videos, etc.
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginLeft: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#ffd700',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  notificationText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },

  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#d4af37',
    backgroundColor: '#f5f1e9',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },

  content: {
    flex: 1,
  },
  emptyText: {
    color: '#a0a0a0',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
  },

  videoCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  videoPreview: {
    width: 120,
    height: 80,
    backgroundColor: '#000',
  },
  videoInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  videoSize: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default DownloadScreen;
