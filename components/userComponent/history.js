import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = () => {
    const [history, setHistory] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const user_id = await AsyncStorage.getItem('userId');
                const response = await axios.post('http://26.195.183.87:9999/user/get-history', { user_id });

                if (response.status === 200) {
                    const sortedHistory = response.data.history.sort((a, b) => {
                        // Giả sử mỗi phần tử trong `history` có thuộc tính `createdAt` hoặc `date`
                        return new Date(b.createdAt) - new Date(a.createdAt);  // Sắp xếp từ mới nhất đến cũ nhất
                    });
                    setHistory(sortedHistory);
                }
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, []);

    const handleNovelPress = (novel) => {
        navigation.navigate('Novel', { novel });
    };

    const imageSources = [
        require('../../assets/novel/1.jpg'),
        require('../../assets/novel/2.jpg'),
        require('../../assets/novel/3.jpg'),
        require('../../assets/novel/4.jpg'),
        require('../../assets/novel/5.jpg'),
        require('../../assets/novel/6.jpg'),
        require('../../assets/novel/7.jpg'),
        require('../../assets/novel/8.jpg'),
        require('../../assets/novel/9.jpg'),
        require('../../assets/novel/10.jpg'),
        require('../../assets/novel/11.jpg'),
        require('../../assets/novel/12.jpg'),
    ];

    const getImageSource = (coverImage) => {
        const index = parseInt(coverImage.replace('ava', '')) - 1;
        return imageSources[index] || imageSources[0];
    };

    const renderNovelItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.novelItem} onPress={() => handleNovelPress(item)}>
                <Image source={getImageSource(item.cover_image)} style={styles.novelImage} />
                <Text style={styles.novelTitle} numberOfLines={2}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lịch sử đọc truyện </Text>
            <FlatList
                data={history}
                renderItem={renderNovelItem}
                keyExtractor={(item) => item._id.toString()}
                numColumns={3}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        margin: 16,
        textAlign: 'left',
    },
    listContainer: {
        paddingBottom: 20,
    },
    row: {
        justifyContent: 'flex-start',
        marginBottom: 16,
    },
    novelItem: {
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 2,
        flex: 1,
    },
    novelImage: {
        width: 100,
        height: 150,
        marginBottom: 8,
        borderRadius: 8,
    },
    novelTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        maxWidth: 100,
    },
});

export default History;
