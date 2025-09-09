// src/components/CustomDrawerContent.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawerContent = (props: any) => {
  const handleSignOut = () => {
    // TODO: Add your sign out logic here
    console.log('Signing out...');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Top Section */}
      <View style={styles.userSection}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Icon name="arrow-back-outline" size={24} />
        </TouchableOpacity>
        <Text style={styles.greeting}>Hello, Test</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {[
          { label: 'Videos', icon: 'videocam-outline' },
          { label: 'Documents', icon: 'document-text-outline' },
          { label: 'Favorites', icon: 'heart-outline' },
          { label: 'Downloads', icon: 'download-outline' },
          { label: 'Account Settings', icon: 'settings-outline' },
          { label: 'Contact Us', icon: 'mail-outline' },
          { label: 'Internal Resources', icon: 'folder-open-outline' },
        ].map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.menuItem}
            onPress={() => {
              // You can add navigation logic here
              console.log(`Pressed ${item.label}`);
            }}
          >
            <Icon name={item.icon} size={20} style={styles.menuIcon} />
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Sign Out */}
        <TouchableOpacity onPress={handleSignOut} style={styles.menuItem}>
          <Icon name="log-out-outline" size={20} style={[styles.menuIcon, { color: 'red' }]} />
          <Text style={[styles.menuLabel, { color: 'red' }]}>Sign out</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* External Links */}
        {[
          'Medartis Website',
          'CMX Personalized Solutions',
          'IBRA Med Ed and Scientific Partner',
          'Terms & Conditions',
        ].map((label, idx) => (
          <TouchableOpacity key={idx} style={styles.menuItem}>
            <Icon name="open-outline" size={16} style={styles.linkIcon} />
            <Text style={styles.linkLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Social Media */}
      <View style={styles.socialRow}>
        {['linkedin', 'instagram', 'youtube', 'logo-facebook', 'logo-xing'].map((icon, idx) => (
          <TouchableOpacity key={idx}>
            <MaterialIcon name={icon} size={22} style={styles.socialIcon} />
          </TouchableOpacity>
        ))}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  menuSection: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuIcon: {
    width: 24,
    color: '#333',
  },
  menuLabel: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  linkIcon: {
    width: 20,
    color: '#555',
  },
  linkLabel: {
    fontSize: 14,
    marginLeft: 10,
    color: '#555',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  socialIcon: {
    color: '#000',
  },
});

export default CustomDrawerContent;
