import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/videoGalleryStyles';

interface TopBarProps {
  navigation: any;
}

const TopBar: React.FC<TopBarProps> = ({ navigation }) => {
  return (
    <View style={styles.topBar}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.titleWithArrow}>
        <Icon name="arrow-back" size={24} color="#fff" style={styles.backArrow} />
        <Text style={styles.title}>Videos</Text>
      </TouchableOpacity>

      {/* Right Icons */}
      <View style={styles.topRight}>
        <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
          <Icon name="heart-outline" size={27} color="#fff" style={styles.iconSpacing} />
        </TouchableOpacity>
        <Icon name="notifications-outline" size={27} color="#fff" style={styles.iconSpacing} />
        <Icon name="filter-outline" size={27} color="#fff" style={styles.iconSpacing} />
      </View>
    </View>
  );
};

export default TopBar;
