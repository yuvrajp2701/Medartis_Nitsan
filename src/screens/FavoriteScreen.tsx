// screens/FavoriteScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../components/BottomNavBar';

const FavoriteScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Icon name="heart" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellContainer}>
            <Icon name="notifications-outline" size={22} color="#fff" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>5</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.emptyText}>
          You haven’t added anything to your favorites yet.
        </Text>
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar
        activeTab="Favorites"
        onTabPress={(tabName) => {
          if (tabName === 'Favorites') navigation.navigate('FavoriteScreen');
          else if (tabName === 'Downloads') navigation.navigate('DownloadScreen');
          else navigation.navigate(tabName);
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

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#a0a0a0',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default FavoriteScreen;
