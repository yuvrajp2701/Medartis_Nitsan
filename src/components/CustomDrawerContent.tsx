import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Linking,
    Image,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = (props: any) => {
    const [username, setUsername] = useState<string>('');

    // Retrieve username from AsyncStorage when the component mounts
    useEffect(() => {
        const getUsernameFromStorage = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                if (storedUsername) {
                    setUsername(storedUsername);
                    console.log('Retrieved username from AsyncStorage:', storedUsername);
                }
            } catch (error) {
                console.error('Error retrieving username from AsyncStorage:', error);
            }
        };

        getUsernameFromStorage();
    }, []);

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
                {/* User Profile */}
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: 'https://www.example.com/profile.jpg' }} // Replace with dynamic URL or image
                        style={styles.profileImage}
                    />
                    <Text style={styles.greeting}>
                        {username ? `Hello, ${username}` : 'Hello, User'} {/* Display username if available */}
                    </Text>
                </View>
            </View>
            {/* Divider between greeting and menu */}
            <View style={styles.divider} />

            {/* Menu Items */}
            <View style={styles.menuSection}>
                {[
                    { label: 'Videos', icon: 'play-circle-outline', route: 'Videos' },
                    { label: 'Documents', icon: 'document-text-outline', route: 'Documents' },
                    { label: 'Favorites', icon: 'heart-outline', route: 'Favorites' },
                    { label: 'Downloads', icon: 'download-outline', route: 'Downloads' },
                    { label: 'Account Settings', icon: 'settings-outline', route: 'Account Settings' },
                    { label: 'Contact Us', icon: 'mail-outline', route: 'Contact Us' },
                    { label: 'Internal Resources', icon: 'folder-open-outline', route: 'Internal Resources' },
                ].map((item, idx) => (
                    <TouchableOpacity
                        key={idx}
                        style={styles.menuItem}
                        onPress={() => {
                            // Navigate to the respective screen
                            props.navigation.navigate(item.route);
                            console.log(`Navigating to ${item.label}`);
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
                    <Text style={[styles.menuLabel, { color: 'red', fontWeight: 'bold' }]}>Sign out</Text>
                </TouchableOpacity>

                <View style={styles.externalLinksContainer}>
                    {/* External Links */}
                    {[
                        'Medartis Website',
                        'CMX Personalized Solutions',
                        'IBRA Med Ed and Scientific Partner',
                        'Terms & Conditions',
                    ].map((label, idx) => (
                        <TouchableOpacity key={idx} style={styles.menuItem}>
                            <Icon name="open-outline" size={20} style={styles.linkIcon} />
                            <Text style={styles.linkLabel}>{label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Social Media */}
            <Text style={styles.linkLabel}>Follow Us</Text>
            <View style={styles.socialRow}>
                {['linkedin', 'instagram', 'youtube', 'facebook', 'logo-xing'].map((icon, idx) => (
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
        paddingBottom: 50,
        paddingTop: 35,
        backgroundColor: '#fff',
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 7,
    },
    greeting: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    menuSection: {
        flex: 1,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    menuIcon: {
        width: 24,
        color: '#333',
    },
    menuLabel: {
        fontSize: 18,
        marginLeft: 12,
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#9e9e9eff',
        marginVertical: 12,
    },
    linkIcon: {
        width: 20,
        color: '#555',
    },
    linkLabel: {
        fontSize: 17,
        marginLeft: 10,
        color: '#373636ff',
        fontWeight: '600',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    externalLinksContainer: {
        paddingTop: 65, // You can adjust this to move it further down or up
    },

    socialIcon: {
        color: '#000',
    },
});

export default CustomDrawerContent;
