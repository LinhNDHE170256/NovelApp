import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>Footer</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 16,
        backgroundColor: '#333',
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Footer;
