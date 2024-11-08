import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

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

const HomeContent = () => {
    const navigation = useNavigation();
    const [novels, setNovels] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await axios.get('http://26.195.183.87:9999/novel/get-novel');
                console.log("Novels fetched:", response.data);
                setNovels(response.data);
            } catch (error) {
                console.error("Error fetching novels:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://26.195.183.87:9999/category/get-all');
                setCategories(response.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchNovels();
        fetchCategories();
    }, []);

    const getRandomCategories = () => {
        const shuffled = categories.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6);
    };

    const getRandomNovels = (data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6);
    };

    const handleNovelPress = (novel) => {
        navigation.navigate('Novel', { novel });
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'http://your-banner-url.com/banner.jpg' }} style={styles.banner} />

            <View style={styles.icons}>
                <TouchableOpacity style={styles.icon}>
                    <Ionicons name="ios-home" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <Ionicons name="ios-book" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <Ionicons name="ios-person" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <Ionicons name="ios-settings" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={styles.categories}>
                <FlatList
                    data={getRandomCategories()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.category}>
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                />
            </View>

            <Text style={styles.title}>Truyện đề cử</Text>
            <FlatList
                data={getRandomNovels(novels)}
                renderItem={({ item }) => {
                    const imageNumber = item.cover_image.replace('ava', '');
                    const imageSource = imageSources[parseInt(imageNumber) - 1];

                    return (
                        <TouchableOpacity style={styles.story} onPress={() => handleNovelPress(item)}>
                            <Image source={imageSource} style={styles.storyImage} />
                            <Text style={styles.storyText}>{item.title}</Text>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item._id}
                numColumns={3}
            />

            <Text style={styles.title}>Truyện mới cập nhật</Text>
            <FlatList
                data={getRandomNovels(novels)}
                renderItem={({ item }) => {
                    const imageNumber = item.cover_image.replace('ava', '');
                    const imageSource = imageSources[parseInt(imageNumber) - 1];

                    return (
                        <TouchableOpacity style={styles.story} onPress={() => handleNovelPress(item)}>
                            <Image source={imageSource} style={styles.storyImage} />
                            <Text style={styles.storyText}>{item.title}</Text>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item._id}
                numColumns={3}
            />

            <Text style={styles.title}>Truyện đã hoàn thành</Text>
            <FlatList
                data={getRandomNovels(novels)}
                renderItem={({ item }) => {
                    const imageNumber = item.cover_image.replace('ava', '');
                    const imageSource = imageSources[parseInt(imageNumber) - 1];

                    return (
                        <TouchableOpacity style={styles.story} onPress={() => handleNovelPress(item)}>
                            <Image source={imageSource} style={styles.storyImage} />
                            <Text style={styles.storyText}>{item.title}</Text>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item._id}
                numColumns={3}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    banner: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    icon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    categories: {
        padding: 16,
    },
    category: {
        flex: 1,
        margin: 8,
        padding: 8,
        backgroundColor: 'orange',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 16,
        color: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    story: {
        width: '33.33%',
        padding: 8,
        alignItems: 'center', // Center align text under the image
    },
    storyImage: {
        width: 100,
        height: 150,
        resizeMode: 'cover',
    },
    storyText: {
        fontSize: 13,
        color: '#333'
    },
});

export default HomeContent;
