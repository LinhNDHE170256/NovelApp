import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Login = () => {
    return (
        <View style={styles.container}>
            {/* Background image */}
            <Image source={{ uri: '../assets/public/loginBackground.jpg' }} style={styles.background} />

            {/* Login form */}
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <Text style={styles.title}>Đăng nhập</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input} placeholder="Email" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mật khẩu</Text>
                        <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry={true} />
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Don't have an account? */}
            <View style={styles.footer}>
                <Text style={styles.text}>Don't have an account?</Text>
                <TouchableOpacity style={styles.link}>
                    <Text style={styles.linkText}>Register</Text>
                </TouchableOpacity>
            </View>

            {/* Back to home page? */}
            <View style={styles.footer}>
                <Text style={styles.text}>Back to home page?</Text>
                <TouchableOpacity style={styles.link}>
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
        color: '#333',
    },
    link: {
        fontSize: 16,
        color: '#333',
        textDecorationLine: 'underline',
    },
});

export default Login;