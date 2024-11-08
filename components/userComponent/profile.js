import React, { useEffect, useState } from 'react';
import {
    View, Text, Pressable, TextInput, Image,
    TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, Modal
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Profile = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newAvatar, setNewAvatar] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const fetchUserData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');

            if (!userId || userId.trim() === '') {
                Alert.alert('Error', 'User ID is missing or invalid.');
                navigation.navigate('Login');
                console.log('User ID is missing or invalid.');
                return;
            }

            const response = await axios.get(`http://26.195.183.87:9999/user/profile/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            Alert.alert('Error', 'Failed to load user data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (user) {
            setNewEmail(user.email);
            setNewAvatar(user.avatar);
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userId');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to logout. Please try again.');
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const response = await axios.post(`http://26.195.183.87:9999/user/update-profile/${userId}`, {
                email: newEmail,
                avatar: newAvatar,
            });
            setUser(response.data);
            setProfileModalVisible(false);
            Alert.alert('Success', 'Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update user data:', error);
            Alert.alert('Error', 'Failed to update user data.');
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match.');
            return;
        }

        try {
            const userId = await AsyncStorage.getItem('userId');
            const response = await axios.post(`http://26.195.183.87:9999/user/change-password`, {
                userId,
                oldPassword,
                newPassword,
            });
            Alert.alert('Success', response.data.message);
            setPasswordModalVisible(false); // Close the modal after successful change
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Failed to change password:', error);
            Alert.alert('Error', 'Failed to change password.');
        }
    };

    const navigateToManageNovel = () => {
        navigation.navigate('ManageNovel');
    };

    const navigateToHistory = () => {
        navigation.navigate('History');
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#FF6347" style={{ flex: 1 }} />;
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.loginText}>Please log in to access your profile</Text>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: user.avatar || 'https://via.placeholder.com/100' }}
                    style={styles.image}
                />
            </View>

            <Text style={styles.username}>Name: {user.username}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Email: {user.email}</Text>
                <Text style={styles.infoText}>Role: {user.role}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => setProfileModalVisible(true)} // Open modal when pressing button
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Edit profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setPasswordModalVisible(true)} // Open modal when pressing button
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Change password</Text>
                </TouchableOpacity>

                {user.role === 'author' && ( // Check if user is author
                    <TouchableOpacity
                        onPress={navigateToManageNovel}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Manage Novel</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    onPress={navigateToHistory}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>History</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={profileModalVisible}
                onRequestClose={() => {
                    setProfileModalVisible(!profileModalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Profile</Text>

                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: newAvatar || 'https://via.placeholder.com/100' }}
                                style={styles.modalAvatar}
                            />
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Email mới"
                            value={newEmail}
                            onChangeText={setNewEmail}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleUpdateProfile} // Update user information
                        >
                            <Text style={styles.buttonText}>Lưu</Text>
                        </TouchableOpacity>

                        <Pressable onPress={() => setProfileModalVisible(false)}>
                            <Text style={styles.closeText}>Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={passwordModalVisible}
                onRequestClose={() => {
                    setPasswordModalVisible(!passwordModalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Change Password</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Old Password"
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleChangePassword} // Change password
                        >
                            <Text style={styles.buttonText}>Lưu</Text>
                        </TouchableOpacity>

                        <Pressable onPress={() => setPasswordModalVisible(false)}>
                            <Text style={styles.closeText}>Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#A9A9A9', // Nền màu xám
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 15,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#FFDAB9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
        textShadowColor: '#808080',
        textShadowOffset: { width: 2, height: 4 },
        textShadowRadius: 1,
    },
    infoContainer: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 20,
        padding: 28,
        marginBottom: 15,
        alignItems: 'flex-start',
        backgroundColor: '#FFF',
        width: '80%',
    },
    infoText: {
        fontSize: 16,
        color: '#000',
        marginVertical: 5,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        padding: 12,
        marginVertical: 5,
        backgroundColor: '#000',
        borderRadius: 8,
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 15,
    },
    modalAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        width: '100%',
        borderRadius: 5,
    },
    closeText: {
        color: 'blue',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});

export default Profile;