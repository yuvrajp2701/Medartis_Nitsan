import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../components/BottomNavBar';
import { isTablet } from '../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import { fetchAccountDetails } from '../APIs/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import styles from '../styles/AccountSettingsStyles';

const AccountSettingsScreen = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [user, setUser] = useState<any>(null); // State to hold user details
  const [loading, setLoading] = useState(true); // Loading state
  const navigation = useNavigation();

  // Fetch user data when component mounts
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        // Get the username from AsyncStorage dynamically
        const username = await AsyncStorage.getItem('username');
        if (username) {
          console.log('Fetched username from AsyncStorage:', username);
          const data = await fetchAccountDetails(username);
          setUser(data); // Set user data into state
        } else {
          console.log('No username found in AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to fetch account details:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    getUserDetails();
  }, []);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    console.log(`Switched to tab: ${tab}`);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.titleWithArrow}
        >
          <Icon name="arrow-back" size={24} color="#fff" style={styles.backArrow} />
          <Text style={styles.title}>Account Settings</Text>
        </TouchableOpacity>

        <View style={styles.topRight}>
          <Icon name="heart-outline" size={isTablet ? 30 : 22} color="#fff" style={styles.iconSpacing} />
          <Icon name="notifications-outline" size={isTablet ? 30 : 22} color="#fff" style={styles.iconSpacing} />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.containerPadding}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Icon name="person-circle-outline" size={110} color="#333" />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          {/* <Text style={styles.mobile}>{user?.mobile}</Text> */}
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Icon name="language-outline" size={isTablet ? 30 : 22} color="#333" style={styles.iconSpacingLeft} />
              <Text style={styles.preferenceLabel}>Translation</Text>
            </View>
            <View style={styles.preferenceRight}>
              <Text style={styles.preferenceValue}>English (EN)</Text>
              <Icon name="chevron-forward-outline" size={isTablet ? 30 : 22} color="#777" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Icon name="location-outline" size={isTablet ? 30 : 22} color="#333" style={styles.iconSpacingLeft} />
              <Text style={styles.preferenceLabel}>Region</Text>
            </View>
            <View style={styles.preferenceRight}>
              <Text style={styles.preferenceValue}>Medartis</Text>
              <Icon name="chevron-forward-outline" size={isTablet ? 30 : 22} color="#777" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.supportSection}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Icon name="chatbubbles-outline" size={isTablet ? 30 : 22} color="#333" style={styles.iconSpacingLeft} />
              <Text style={styles.supportText}>Contact Us</Text>
            </View>
            <Icon name="chevron-forward-outline" size={isTablet ? 30 : 22} color="#777" />
          </TouchableOpacity>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Icon name="information-circle-outline" size={isTablet ? 30 : 22} color="#333" style={styles.iconSpacingLeft} />
              <Text style={styles.supportText}>App Version</Text>
            </View>
            <Text style={styles.supportText}>1.0</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   containerPadding: { padding: isTablet ? 50 : 20 },

//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#222',
//     paddingHorizontal: isTablet ? 40 : 20,
//     paddingVertical: isTablet ? 30 : 25,
//     borderBottomWidth: 1,
//     borderColor: '#444',
//     justifyContent: 'space-between',
//   },

//   titleWithArrow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   backArrow: {
//     marginRight: 10,
//   },

//   title: {
//     fontSize: isTablet ? 26 : 20,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },

//   topRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   iconSpacing: {
//     marginLeft: isTablet ? 30 : 16,
//     color: '#fff',
//   },

//   profileSection: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   name: {
//     fontSize: isTablet ? 27 : 24,
//     fontWeight: '600',
//     color: '#333',
//     marginTop: 10,
//     marginBottom: -5,
//   },
//   email: {
//     fontSize: isTablet ? 19 : 16,
//     color: '#555',
//     marginVertical: 10,
//   },
//   mobile: {
//     fontSize: isTablet ? 19 : 16,
//     color: '#555',
//     marginVertical: 10,
//   },
//   editButton: {
//     backgroundColor: '#68686828',
//     paddingVertical: isTablet ? 10 : 8,
//     paddingHorizontal: isTablet ? 29 : 25,
//     borderRadius: 20,
//     marginTop: 10,
//   },
//   editButtonText: {
//     color: '#000',
//     fontSize: isTablet ? 17 : 15,
//     paddingVertical: 4,
//   },

//   preferencesSection: { marginBottom: 0 },
//   sectionTitle: {
//     fontSize: isTablet ? 25 : 20,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 20,
//   },

//   preferenceItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 55,
//   },
//   preferenceLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   preferenceRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   preferenceLabel: {
//     fontSize: isTablet ? 20 : 17,
//     color: '#333',
//     marginLeft: 10,
//   },
//   preferenceValue: {
//     fontSize: isTablet ? 18 : 16,
//     color: '#555',
//     marginRight: 5,
//   },
//   iconSpacingLeft: {
//     marginRight: 10,
//   },

//   supportSection: { marginTop: -10 },
//   supportText: {
//     fontSize: isTablet ? 19 : 16,
//     color: '#000',
//   },

//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

export default AccountSettingsScreen;
