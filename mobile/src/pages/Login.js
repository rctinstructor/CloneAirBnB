import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo1.png';
//import { platform } from 'os';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [tech, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        })
    }, []);

    async function handleSubmit() {
        //email, technology
        //console.log(email, techs);
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data;
        //console.log(_id);

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('tech', tech);
        // navigate to this screen
        navigation.navigate('List');

    }


    return (
     <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
        <Image source={logo} />

        <View style={styles.form}>
            <Text style={styles.label}>Your Email *</Text>
            <TextInput
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            />

            <Text style={styles.label}>Technologies *</Text>
            <TextInput
            style={styles.input}
            placeholder="Technologies you are interested"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={tech}
            onChangeText={setTechs}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Find spots</Text>
            </TouchableOpacity>
        </View>
     </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2, 
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

});