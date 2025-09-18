import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/videoGalleryStyles';

const Filters: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState('Area of Interest');
  const [selectedProduct, setSelectedProduct] = useState('Products');
  const [selectedContentType, setSelectedContentType] = useState('Type of Content');
  const [selectedLanguage, setSelectedLanguage] = useState('Language');

  return (
    <>
        <View style={styles.marginTopp}>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBox} onPress={() => console.log('Area selected')}>
          <Text style={styles.filterText}>{selectedArea}</Text>
          <Icon name="chevron-down" size={20} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBox} onPress={() => console.log('Product selected')}>
          <Text style={styles.filterText}>{selectedProduct}</Text>
          <Icon name="chevron-down" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBox} onPress={() => console.log('Content type selected')}>
          <Text style={styles.filterText}>{selectedContentType}</Text>
          <Icon name="chevron-down" size={20} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBox} onPress={() => console.log('Language selected')}>
          <Text style={styles.filterText}>{selectedLanguage}</Text>
          <Icon name="chevron-down" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      </View>
    </>
  );
};

export default Filters;
