import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface BottomNavBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabPress }) => {
  const navigation = useNavigation<RootStackNavigationProp>(); // Properly type navigation

  // Tabs array to manage navigation
  const tabs = [
    { key: 'Home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { key: 'VideoGallery', label: 'VideoGallery', icon: 'play-circle-outline', activeIcon: 'play-circle' },
    { key: 'Search', label: 'Search', icon: 'search-outline', activeIcon: 'search' },
    { key: 'Documents', label: 'Documents', icon: 'document-text-outline', activeIcon: 'document-text' },
    { key: 'Downloads', label: 'Downloads', icon: 'cloud-download-outline', activeIcon: 'cloud-download' },
  ];

  // Handle navigation for tab presses
  const handleTabPress = (tabKey: string) => {
    switch (tabKey) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'VideoGallery':
        navigation.navigate('VideoGallery');
        break;
      case 'Search':
        navigation.navigate('VideoGallery');
        break;
      case 'Documents':
        navigation.navigate('VideoGallery');
        break;
      case 'Downloads':
        navigation.navigate('VideoGallery');
        break;
    }
    onTabPress(tabKey);  // Update active tab state in parent component
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => handleTabPress(tab.key)}  // Use the handler to navigate
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
