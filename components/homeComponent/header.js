import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ isLoggedIn, username, onLogin, onRegister }) => {
    return (
        <View style={styles.header}>
            <View style={styles.searchBar}>
                <Ionicons name="ios-search" size={24} color="#333" />
                <Text style={styles.searchText}>Tìm kiếm</Text>
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
                <Text style={styles.username}>{username}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
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
        marginLeft: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    username: {
        fontSize: 16,
        color: '#333',
    },
});

export default Header;
