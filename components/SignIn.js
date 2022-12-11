// importerer React-elementer
import React, { useState } from 'react';
import {Button, Text, View, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';

// importerer Firebase-elementer
import firebase from "firebase/compat";
import { initializeApp } from "firebase/app";

export default function LogInForm({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async () => {
        try {
            await
                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);
        } catch (error){
            setErrorMessage(error.message);
        }
    };

    const renderButton = () => {
        return <TouchableOpacity onPress = { () => handleSubmit() } style = { styles.button1 }>
            <Text style = { styles.buttonText }>Sign In</Text>
        </TouchableOpacity>
    };

    return (
        <SafeAreaView style={{paddingTop: 40}}>
            <ScrollView>
                <View>
                    <Text style = { styles.header }>Sign In</Text>
                </View>
                <TextInput
                    placeholder = "E-mail"
                    value = { email }
                    onChangeText = { (email) => setEmail(email) }
                    style = { styles.input }
                />
                <TextInput
                    placeholder = "Password"
                    value = { password }
                    onChangeText = { (password) => setPassword(password) }
                    secureTextEntry
                    style = {styles.input}
                />
                { errorMessage && (
                    <Text style = { styles.error }>Error: { errorMessage }</Text>
                )}
                { renderButton() }
                <Text style = {{ alignSelf: 'center', paddingTop: 20 }}>Don't have an account?</Text>
                <TouchableOpacity onPress={ () => navigation.navigate('Sign Up') } style = { styles.button2 }>
                    <Text style = { styles.buttonText }>Sign up now!</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

//Lokal styling til brug i LoginFrom
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        alignSelf: 'center',
    },
    label: {
        fontWeight: 'bold',
        width: 100,
        textTransform: 'capitalize',
        paddingTop: 7
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding:10,
        marginVertical: 10,
        marginHorizontal: 5
    },
    button1: {
        margin: 10,
        height: 40,
        backgroundColor: 'seagreen',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 150
    },
    button2: {
        margin: 10,
        height: 40,
        backgroundColor: 'cornflowerblue',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 150
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 12
    }
});