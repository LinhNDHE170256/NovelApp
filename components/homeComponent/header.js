import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ isLoggedIn, username, avatar, onLogin, onRegister, onLogout, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Ionicons name="ios-search" size={24} color="#333" />
                    <Text style={styles.searchText}>Tìm truyện</Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ListCategory')}
                    >
                        <Ionicons name="md-menu" size={30} color="#333" />
                    </TouchableOpacity>
                </View>
                {!isLoggedIn ? (
                    <View style={styles.authButtons}>
                        <TouchableOpacity style={styles.button} onPress={onRegister}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.userContainer}>
                        {avatar && (
                            <Image source={{ uri: avatar }} style={styles.avatar} />
                        )}
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <Text style={styles.username}>{username}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative', // Để dropdown nằm dưới header
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#D3D3D3', // Màu nền xám nhạt
        height: 70, // Đặt độ cao của header
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
    },
    searchText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 8,
    },
    authButtons: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#333',
        padding: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontSize: 16,
        color: '#333',
        marginLeft: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});

export default Header;
