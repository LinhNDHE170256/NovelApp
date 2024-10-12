import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigate } from 'react-router-dom';
import images from '../../assets/public/images.jpg';

const Register = () => {
    const [avatar, setAvatar] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    return (
        <View style={styles.container}>
            <Image source={{ uri: '../assets/public/loginBackground.jpg' }} style={styles.background} />

            {/* Form đăng ký */}
            <View style={styles.formContainer}>
                <View style={styles.form}>


                    {/* avatar */}
                    <View style={styles.avatarContainer}>
                        <TouchableOpacity>
                            <Image
                                source={avatar ? { uri: avatar } : images}
                                style={styles.avatar}
                            />
                            <Text style={styles.avatarText}>Chọn ảnh đại diện</Text>
                        </TouchableOpacity>
                    </View>

                    {/* các ô điền */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
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
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Không có tài khoản? */}
            <View style={styles.footer}>
                <Text style={styles.text}>Đã có tài khoản?</Text>
                <TouchableOpacity style={styles.link} onPress={() => navigate('/login')}>
                    <Text style={styles.linkText}> Đăng nhập</Text>
                </TouchableOpacity>
            </View>

            {/* Quay lại trang chính? */}
            <View style={styles.footer}>
                <Text style={styles.text}>Quay lại trang chính?</Text>
                <TouchableOpacity style={styles.link} onPress={() => navigate('/')}>
                    <Text style={styles.linkText}> Trang chủ</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
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
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        color: '#FFEA00',
        fontWeight: 'bold'
    },
    link: {
        fontSize: 20,
        color: '#fff',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
    linkText: {
        fontSize: 16,
        color: '#fff',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
});

export default Register;
