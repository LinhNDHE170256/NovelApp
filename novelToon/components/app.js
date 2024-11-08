import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './homeComponent/home';
import Login from './authenticationComponent/login';
import Register from './authenticationComponent/register';
import Novel from './novelComponent/novel';
import Profile from './userComponent/profile';
import ListCategory from './categoryComponent/listCategory';
import ManageNovel from './userComponent/manageNovel';
import Chapter from './novelComponent/chapter';
import History from './userComponent/history';

const Stack = createStackNavigator();

const App = () => {
    const [userInfo, setUserInfo] = useState(null); // State để lưu thông tin người dùng

    const handleLoginSuccess = (userData) => {
        console.log(`${userData.username} đã đăng nhập thành công!`);
        setUserInfo(userData); // Lưu thông tin người dùng vào state
    };

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={() => <Home userInfo={userInfo} />} />
                <Stack.Screen name="Login" component={() => <Login onLoginSuccess={handleLoginSuccess} />} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Novel" component={Novel} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="ListCategory" component={ListCategory} />
                <Stack.Screen name="ManageNovel" component={ManageNovel} />
                <Stack.Screen name="Chapter" component={Chapter} />
                <Stack.Screen name="History" component={History} />
            </Stack.Navigator>
        </NavigationContainer >
    );
};

export default App;
