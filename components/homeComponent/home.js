import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
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
            {/* Thanh tìm kiếm và nút login */}
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Ionicons name="ios-search" size={24} color="#333" />
                    <Text style={styles.searchText}>Tìm kiếm</Text>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>

            {/* Banner ảnh */}
            <Image source={{ uri: '../assets/public/images.jpg' }} style={styles.banner} />

            {/* 4 icon để điều hướng */}
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

            {/* Carousel các truyện hot */}
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

            {/* Danh sách các category */}
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

            {/* Truyện đề cử */}
            <Text style={styles.title}>Truyện đề cử</Text>

            {/* Danh sách các truyện */}
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

            <Text style={styles.title}>Truyện đề cử</Text>

            {/* Danh sách các truyện */}
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

            {/* Danh sách các truyện */}
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

            {/* Danh sách các truyện */}
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

            <Text style={styles.title}>Footer</Text>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
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
    loginButton: {
        backgroundColor: '#333',
        padding: 8,
        borderRadius: 8,
    },
    loginText: {
        fontSize: 16,
        color: '#fff',
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
    carouselImage: {
        width: 100,
        height: 150,
        resizeMode: 'cover',
        marginRight: 16,
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

export default Home;
