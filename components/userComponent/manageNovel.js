import React, { useEffect, useState } from 'react';
import {
    View, Text, Pressable, Image,
    TouchableOpacity, StyleSheet, ScrollView, Alert, Modal, ActivityIndicator, TextInput
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    require('../../assets/public/images.jpg')
];

const ManageNovel = () => {
    const [novels, setNovels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [chapters, setChapters] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (userId) {
                    const response = await axios.post('http://26.195.183.87:9999/novel/get-novel-by-author', { authorId: userId });
                    setNovels(response.data);
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch novels.');
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://26.195.183.87:9999/category/get-all');
                setCategories(response.data.data);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch categories.');
            }
        };

        fetchNovels();
        fetchCategories();
    }, []);

    const handleAddCategory = (categoryId) => {
        if (!selectedCategories.includes(categoryId)) {
            setSelectedCategories((prev) => [...prev, categoryId]);
        }
    };

    const handleRemoveCategory = (categoryId) => {
        setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    };

    const handleAddChapterText = () => {
        setChapters((prev) => [...prev, '']);
    };

    const handleDelete = async (novelId) => {
        try {
            await axios.delete(`http://26.195.183.87:9999/novel/delete`, { params: { id: novelId } });
            setNovels(novels.filter((novel) => novel._id !== novelId));
            Alert.alert('Success', 'Novel deleted successfully');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to delete novel.');
        }
    };

    const getCoverImage = (cover_image) => {
        const index = parseInt(cover_image.replace('ava', '')) - 1;
        return imageSources[index] || imageSources[imageSources.length - 1];
    };

    const handleAddNovel = async () => {
        if (!title || !description || selectedCategories.length === 0 || chapters.length === 0) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        try {
            const userId = await AsyncStorage.getItem('userId');
            const formData = {
                title,
                description,
                cover_image: coverImage || '../../assets/public/images.jpg',
                author_id: userId,
                categories: selectedCategories,
                chapters,
            };
            await axios.post('http://26.195.183.87:9999/novel/add', formData);
            Alert.alert('Success', 'Novel added successfully');
            setShowAddForm(false);
            fetchNovels();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to add novel.');
        }
    };

    const renderNovelRow = (novel) => (
        <View style={styles.row} key={novel._id}>
            <Text style={styles.cell}>{novel.title}</Text>
            <Text style={[styles.cell, styles.descriptionText]} numberOfLines={3} ellipsizeMode="tail">
                {novel.description}
            </Text>
            <Image source={getCoverImage(novel.cover_image)} style={styles.image} />
            <Text style={styles.cell}>{novel.chapters.length || 1}</Text>
            <View style={styles.actions}>
                <Pressable onPress={() => navigation.navigate('EditNovel', { novelId: novel._id })}>
                    <MaterialIcons name="edit" size={24} color="black" />
                </Pressable>
                <Pressable onPress={() => handleDelete(novel._id)}>
                    <MaterialIcons name="delete" size={24} color="red" />
                </Pressable>
            </View>
        </View>
    );

    const renderTableHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.tableHeaderText]}>Tên</Text>
            <Text style={[styles.cell, styles.tableHeaderText]}>Mô tả</Text>
            <Text style={[styles.cell, styles.tableHeaderText]}>Ảnh</Text>
            <Text style={[styles.cell, styles.tableHeaderText]}>Số chương</Text>
            <Text style={[styles.cell, styles.tableHeaderText]}>Action</Text>
        </View>
    );

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tủ sách của bạn</Text>
            <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => setShowAddForm(true)}
            >
                <Text style={styles.uploadText}>Đăng truyện</Text>
            </TouchableOpacity>

            <ScrollView style={styles.scrollView}>
                <View>
                    {renderTableHeader()}
                    {novels.map(renderNovelRow)}
                </View>
            </ScrollView>
            {showAddForm && (
                <Modal animationType="slide" transparent visible={showAddForm}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder="Tên truyện"
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Mô tả"
                            value={description}
                            onChangeText={setDescription}
                            style={styles.input}
                            multiline
                        />
                        <View style={styles.categoryContainer}>
                            <Text>Chọn thể loại:</Text>
                            <ScrollView horizontal>
                                {categories.map((category) => (
                                    <TouchableOpacity
                                        key={category._id}
                                        onPress={() => handleAddCategory(category._id)}
                                        style={styles.categoryItem}
                                    >
                                        <Text style={styles.categoryText}>{category.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <ScrollView horizontal>
                                {selectedCategories.map((categoryId) => {
                                    const category = categories.find(cat => cat._id === categoryId);
                                    return category ? (
                                        <View key={category._id} style={styles.selectedCategory}>
                                            <Text style={styles.selectedCategoryText}>{category.name}</Text>
                                            <TouchableOpacity
                                                style={styles.categoryRemoveButton}
                                                onPress={() => handleRemoveCategory(category._id)}
                                            >
                                                <Text style={styles.categoryRemoveButtonText}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : null;
                                })}
                            </ScrollView>
                        </View>
                        <Text>Chương:</Text>
                        <TouchableOpacity onPress={handleAddChapterText}>
                            <Text>Them chương bằng text</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Alert.alert('chưa chọn được file')}>
                            <Text>Them chương bằng file</Text>
                        </TouchableOpacity>

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={styles.cancelButton}
                                onPress={() => setShowAddForm(false)}
                            >
                                <Text style={styles.buttonText}>Hủy</Text>
                            </Pressable>
                            <Pressable
                                style={styles.addButton}
                                onPress={handleAddNovel}
                            >
                                <Text style={styles.buttonText}>Thêm truyện</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    uploadButton: {
        backgroundColor: '#00bcd4',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    uploadText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    tableHeaderText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        padding: 10,
    },
    descriptionText: {
        maxWidth: 200,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    categoryContainer: {
        marginBottom: 10,
    },
    categoryItem: {
        marginRight: 10,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    categoryText: {
        fontSize: 16,
    },
    selectedCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginRight: 10,
        padding: 5,
    },
    selectedCategoryText: {
        fontSize: 16,
    },
    categoryRemoveButton: {
        marginLeft: 5,
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 5,
    },
    categoryRemoveButtonText: {
        color: 'white',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#00bcd4',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ManageNovel;
