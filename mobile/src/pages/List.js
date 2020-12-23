import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage, Text, TouchableOpacity } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo1.png';

export default function List( { navigation } ) {
    const [tech, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.2.247:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Your reservation on ${booking.spot.company} in ${booking.approved ? 'APPROVED' : 'REJECTED'}`)
            })
        })
    }, []);

    //ReactJS, Node.Js
    
    useEffect(() => {
        AsyncStorage.getItem('tech').then(StorageTechs => {
            const techsArray = StorageTechs.split(',').map( tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    function handleCancel() {
        AsyncStorage.clear();
        navigation.navigate('Login');
    }

    
    return (
        <SafeAreaView style ={StyleSheet.container}>
            <Image styles={styles.logo} source={logo} />

            <TouchableOpacity onPress={handleCancel}>
                <Text>Return to Login</Text>
            </TouchableOpacity>

            <ScrollView>
                {tech.map( tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
            )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10
    },

});