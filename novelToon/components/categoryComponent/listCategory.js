import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://26.195.183.87:9999/category/get-all', {
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });
            console.log('Response data:', response.data);
            if (response.data && response.data.data) {
                setCategories(response.data.data);
            } else {
                console.error('Invalid data format', response.data);
                Alert.alert('Error', 'Invalid data format.');
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            Alert.alert('Error', 'Failed to load categories.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#FF6347" style={{ flex: 1 }} />;
    }

    if (!Array.isArray(categories)) {
        return <Text>Error: Categories is not an array</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Danh sách thể loại</Text>
            </View>

            <View style={styles.categoryContainer}>
                {categories.map((category, index) => (
                    <View key={index} style={styles.category}>
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FFF',
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    category: {
        width: '40%',
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
});

export default ListCategory;
