import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        try {
            const response = await fetch('http://26.195.183.87:9999/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // Lưu ID và tên người dùng vào AsyncStorage
                await AsyncStorage.setItem('userId', data.user.id); // Lưu ID
                await AsyncStorage.setItem('username', data.user.username); // Lưu tên người dùng
                await AsyncStorage.setItem('role', data.user.role); // Lưu tên người dùng

                onLoginSuccess(data.user); // Nếu bạn có hàm xử lý đăng nhập thành công
                navigation.navigate('Home'); // Chuyển đến trang chính sau khi đăng nhập
            } else {
                Alert.alert('Đăng nhập không thành công', data.message);
            }
        } catch (error) {
            console.error('Lỗi kết nối đến server:', error);
            Alert.alert('Lỗi', 'Không thể kết nối đến server');
        }
    };


    return (
        <View style={styles.container}>
            {/* Background image */}
            <Image source={require('../../assets/public/loginBackground.jpg')} style={styles.background} />

            {/* Login form */}
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <Text style={styles.title}>Login</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                            placeholder="username"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholder="password"
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Don't have an account? */}
            <View style={styles.footer}>
                <Text style={styles.text}>Don't have an account?</Text>
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.linkText}>Register</Text>
                </TouchableOpacity>
            </View>

            {/* Back to home page? */}
            <View style={styles.footer}>
                <Text style={styles.text}>Back to home page?</Text>
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.linkText}>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.44)',
        padding: 16,
        borderRadius: 8,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
    },
    button: {
        backgroundColor: '#333',
        padding: 8,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontSize: 16,
        color: '#FFEA00',
        fontWeight: 'bold',
    },
    link: {
        fontSize: 20,
        color: '#333',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    linkText: {
        fontSize: 16,
        color: '#fff',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
});

export default Login;
