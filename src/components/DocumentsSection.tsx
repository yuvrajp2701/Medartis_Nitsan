import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DocumentCard from './DocumentCard';

const DocumentsSection = () => {
  const documents = [
    {
      id: 1,
      image: require('../assets/RecoverPassword.png'),
      title: "Athlete's Scaphoid Non-Union",
      size: '0.76 MB',
      tag: 'CR',
    },
    {
      id: 2,
      image: require('../assets/iconForgot.png'),
      title: 'Severe hallux valgus, MTP2 dislocation',
      size: '0.37 MB',
      tag: 'CR',
    },
    {
      id: 3,
      image: require('../assets/iconForgot.png'),
      title: 'Severe hallux valgus, MTP2 dislocation',
      size: '0.37 MB',
      tag: 'CR',
    },
    {
      id: 4,
      image: require('../assets/iconForgot.png'),
      title: 'Severe hallux valgus, MTP2 dislocation',
      size: '0.37 MB',
      tag: 'CR',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="document-text-outline" size={20} color="#000" />
          <Text style={styles.headerText}>Documents</Text>
        </View>

        <TouchableOpacity style={styles.viewAllBtn}>
          <Icon name="eye-outline" size={14} color="#FFF" style={{ marginRight: 4 }} />
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            image={doc.image}
            title={doc.title}
            size={doc.size}
            tag={doc.tag}
            onFavoritePress={() => console.log('Favorite pressed for', doc.title)}
            onDownloadPress={() => console.log('Download pressed for', doc.title)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default DocumentsSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 6,
    color: '#000',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewAllText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
});
