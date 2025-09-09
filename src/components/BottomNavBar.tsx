import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface BottomNavBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { key: 'Home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { key: 'Videos', label: 'Videos', icon: 'play-circle-outline', activeIcon: 'play-circle' },
    { key: 'Search', label: 'Search', icon: 'search-outline', activeIcon: 'search' },
    { key: 'Documents', label: 'Documents', icon: 'document-text-outline', activeIcon: 'document-text' },
    { key: 'Downloads', label: 'Downloads', icon: 'cloud-download-outline', activeIcon: 'cloud-download' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => onTabPress(tab.key)}
        >
          <Ionicons
            name={activeTab === tab.key ? tab.activeIcon : tab.icon}
            size={22}
            color={activeTab === tab.key ? '#FFD700' : '#fff'} // Yellow for active
          />
          <Text
            style={[
              styles.label,
              { color: activeTab === tab.key ? '#FFD700' : '#fff' },
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000', // Black background
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNavBar;
