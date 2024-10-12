import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeContent = () => {
    const categories = [
        { id: 1, name: 'Truyện tình cảm' },
        { id: 2, name: 'Truyện phiêu lưu' },
        { id: 3, name: 'Truyện khoa học' },
        { id: 4, name: 'Truyện hài' },
        { id: 5, name: 'Truyện kinh dị' },
        { id: 6, name: 'Truyện khác' },
    ];

    const stories = [
        { id: 1, name: 'Truyện 1', image: '../assets/public/images.jpg' },
        { id: 2, name: 'Truyện 2', image: '../assets/public/images.jpg' },
        { id: 3, name: 'Truyện 3', image: '../assets/public/images.jpg' },
        { id: 4, name: 'Truyện 4', image: '../assets/public/images.jpg' },
        { id: 5, name: 'Truyện 5', image: '../assets/public/images.jpg' },
        { id: 6, name: 'Truyện 6', image: '../assets/public/images.jpg' },
    ];

    return (
        <ScrollView style={styles.container}>

            <Image source={{ uri: '../assets/public/images.jpg' }} style={styles.banner} />

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

            <View style={styles.carousel}>
                <FlatList
                    horizontal
                    data={stories}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.image }} style={styles.carouselImage} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <View style={styles.categories}>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.category}>
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                />
            </View>

            <Text style={styles.title}>Truyện đề cử</Text>
            <FlatList
                data={stories}
                renderItem={({ item }) => (
                    <View style={styles.story}>
                        <Image source={{ uri: item.image }} style={styles.storyImage} />
                        <Text style={styles.storyText}>{item.name}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
            />

            <Text style={styles.title}>Truyện mới cập nhật</Text>
            <FlatList
                data={stories}
                renderItem={({ item }) => (
                    <View style={styles.story}>
                        <Image source={{ uri: item.image }} style={styles.storyImage} />
                        <Text style={styles.storyText}>{item.name}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
            />

            <Text style={styles.title}>Truyện đã hoàn thành</Text>
            <FlatList
                data={stories}
                renderItem={({ item }) => (
                    <View style={styles.story}>
                        <Image source={{ uri: item.image }} style={styles.storyImage} />
                        <Text style={styles.storyText}>{item.name}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
            />

        </ScrollView>
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
    carousel: {
        padding: 16,
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
    },
    storyImage: {
        width: 100,
        height: 150,
        resizeMode: 'cover',
    },
    storyText: {
        fontSize: 16,
        color: '#333',
    },
});

export default HomeContent;
