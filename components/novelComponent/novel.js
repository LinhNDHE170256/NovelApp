import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';

const Noovel = () => {
    const [activeTab, setActiveTab] = useState('detail'); // Mặc định là tab Detail

    const categories = [
        { id: 1, name: 'Thể loại 1' },
        { id: 2, name: 'Thể loại 2' },
        { id: 3, name: 'Thể loại 3' },
    ];

    const relatedStories = [
        { id: 1, name: 'Truyện liên quan 1', image: '../assets/public/images.jpg' },
        { id: 2, name: 'Truyện liên quan 2', image: '../assets/public/images.jpg' },
        { id: 3, name: 'Truyện liên quan 3', image: '../assets/public/images.jpg' },
    ];

    const chapters = [
        { id: 1, name: 'Chap 1' },
        { id: 2, name: 'Chap 2' },
        { id: 3, name: 'Chap 3' },
        { id: 4, name: 'Chap 4' },
        { id: 5, name: 'Chap 5' },
    ];

    return (
        <ScrollView style={styles.container}>

            <View style={styles.bannerContainer}>
                <Image source={{ uri: '../assets/public/images.jpg' }} style={styles.bannerBackground} />
                <Text style={styles.storyTitle}>Tên truyện </Text>
            </View>


            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'detail' && styles.activeTab]}
                    onPress={() => setActiveTab('detail')}
                >
                    <Text style={styles.tabText}>Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'chapter' && styles.activeTab]}
                    onPress={() => setActiveTab('chapter')}
                >
                    <Text style={styles.tabText}>Chapter</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'detail' ? (
                <>
                    <View style={styles.infoSection}>
                        <FlatList
                            data={categories}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.category}>
                                    <Text style={styles.categoryText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                        />
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.description}>Mô tả</Text>
                    </View>


                    <Text style={styles.sectionTitle}>Truyện liên quan</Text>
                    <FlatList
                        data={relatedStories}
                        renderItem={({ item }) => (
                            <View style={styles.relatedStory}>
                                <Image source={{ uri: item.image }} style={styles.storyImage} />
                                <Text style={styles.storyText}>{item.name}</Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                    />
                </>
            ) : (
                <View style={styles.infoSection}>

                    <View style={styles.chapterHeader}>
                        <View style={styles.line} />
                        <Text style={styles.sectionTitle}>Danh sách chương</Text>
                        <View style={styles.line} />
                    </View>

                    <FlatList
                        data={chapters}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.category}>
                                <Text style={styles.categoryText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={6}
                        contentContainerStyle={styles.chapterList}
                    />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    bannerContainer: {
        position: 'relative',
    },
    bannerBackground: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        opacity: 0.6,
    },
    storyTitle: {
        position: 'absolute',
        top: 20,
        left: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    tab: {
        flex: 1,
        padding: 12,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        margin: 4,
    },
    activeTab: {
        backgroundColor: '#ffa500',
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
    infoSection: {
        padding: 16,
    },
    category: {
        backgroundColor: 'orange',
        padding: 8,
        borderRadius: 8,
        margin: 4,
    },
    categoryText: {
        fontSize: 16,
        color: '#fff',
    },
    description: {
        marginTop: 16,
        fontSize: 16,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        paddingLeft: 16,
    },
    relatedStory: {
        width: 120,
        marginHorizontal: 8,
    },
    storyImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    storyText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginTop: 8,
    },
    chapterHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    chapterList: {
        marginVertical: 16,
    },
});

export default Noovel;
