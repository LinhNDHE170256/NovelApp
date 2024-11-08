// Home.js
import React, { useEffect, useState } from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './header';
import Layout from './layout';
import Footer from './footer';


const Home = ({ userInfo }) => {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(!!userInfo);
    const [username, setUsername] = useState(userInfo ? userInfo.username : '');

    const novels = [
        { id: 1, name: 'Novel 1', image: 'https://ibb.co/p00dqJY' },
        { id: 2, name: 'Novel 2', image: 'https://ibb.co/p00dqJY' },
    ];

    const categories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
    ];

    const handleLoginSuccess = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            // Bạn có thể gọi API để lấy thông tin người dùng dựa trên token nếu cần
            setIsLoggedIn(true);
            // Lấy tên người dùng từ token hoặc API nếu cần
            setUsername('Tên Người Dùng'); // Cập nhật tên người dùng ở đây nếu cần
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <ScrollView>
            <Header
                isLoggedIn={isLoggedIn}
                username={username}
                avatar={userInfo?.avatar} // Sử dụng thông tin avatar nếu có
                onLogin={() => navigation.navigate('Login')}
                onRegister={() => navigation.navigate('Register')}
                navigation={navigation} // Truyền navigation vào đây
            />
            <Layout novels={novels} categories={categories} />
            <Footer />
        </ScrollView>
    );
};

export default Home;
