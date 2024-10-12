import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Layout from './layout';
import Footer from './footer';

const Home = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const novels = [
        { id: 1, name: 'Novel 1', image: '../assets/public/images.jpg' },
        { id: 2, name: 'Novel 2', image: '../assets/public/images.jpg' },
    ];

    const categories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
    ];

    return (
        <ScrollView>
            <Header
                isLoggedIn={isLoggedIn}
                username={username}
                onLogin={() => navigate('/login')}
                onRegister={() => navigate('/register')}
            />
            <Layout novels={novels} categories={categories} />
            <Footer />
        </ScrollView>
    );
};

export default Home;
