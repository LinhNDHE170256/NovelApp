import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import images from '../../assets/public/images.jpg';
import * as ImagePicker from 'expo-image-picker';

const pickImage = async (setAvatar) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
        Alert.alert("Bạn cần cấp quyền truy cập vào ảnh!");
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
        setAvatar(result.uri);
    }
};

const Register = () => {
    const [avatar, setAvatar] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Thêm state cho confirmPassword
    const navigation = useNavigation();

    const handleRegister = async () => {
        if (!email || !name || !password || !confirmPassword) {
            Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Thông báo", "Mật khẩu không khớp!");
            return;
        }

        let avatarBase64 = null;
        if (avatar) {
            const response = await fetch(avatar);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                avatarBase64 = reader.result.split(',')[1]; // Lấy phần Base64 từ data URI
            };
        }

        try {
            const response = await fetch('http://26.195.183.87:9999/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    username: name,
                    password,
                    confirmPassword, // Gửi confirmPassword đến backend
                    avatar: avatarBase64
                }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Thành công", "Đăng ký thành công!");
                navigation.navigate('Login');
            } else {
                Alert.alert("Thất bại", data.message || "Đăng ký thất bại!");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra trong quá trình đăng ký!");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/public/loginBackground.jpg')} style={styles.background} />

            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <View style={styles.avatarContainer}>
                        <TouchableOpacity onPress={() => pickImage(setAvatar)}>
                            <Image
                                source={avatar ? { uri: avatar } : images}
                                style={styles.avatar}
                            />
                            <Text style={styles.avatarText}>Chọn ảnh đại diện</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Tên tài khoản</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Xác nhận mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword} // Cập nhật state cho confirmPassword
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.text}>Đã có tài khoản?</Text>
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.text}>Quay lại trang chính?</Text>
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.linkText}>Trang chủ</Text>
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
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        padding: 16,
        borderRadius: 8,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        padding: 16,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ddd',
        marginBottom: 8,
    },
    avatarText: {
        fontSize: 16,
        color: '#333',
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
        borderColor: '#555',
        borderWidth: 2,
        padding: 8,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#333',
        padding: 8,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
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
        color: '#fff',
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

export default Register;
