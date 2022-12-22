//importerer React-elementer
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

//importerer Firebase-elementer
import firebase from "firebase/compat";

//opretter funktion for komponenten som håndterer at brugeren logger ind
export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    //opretter funktion som håndterer log ind i Firebase Authentification
    const handleSignIn = async () => {
        try {
            await
                //anvender prædefineret Firebase-funktionalitet til at logge ind med password og e-mail
                firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error){
            setErrorMessage(error.message);
        }
    };
    //returnerer view'et for SignIn-komponenten
    return (
        <SafeAreaView style = {{ paddingTop: 40 }}>
            <ScrollView>
                {/*anvender scroll view, så brugeren kan rulle på siden*/}
                <View>
                    <Text style = { styles.header }>Sign In</Text>
                </View>
                {/*tekstinput for e-mail*/}
                <TextInput
                    placeholder = "E-mail"
                    value = { email }
                    onChangeText = { (email) => setEmail(email) }
                    style = { styles.input }
                />
                {/*tekstinput for password*/}
                <TextInput
                    placeholder = "Password"
                    value = { password }
                    onChangeText = { (password) => setPassword(password) }
                    secureTextEntry
                    style = {styles.input}
                />
                {/*viser fejlbesked ved log ind*/}
                { errorMessage && (
                    <Text style = { styles.error }>Error: { errorMessage }</Text>
                )}
                {/*viser knap som logger brugeren ind*/}
                <TouchableOpacity onPress = { () => handleSignIn() } style = { styles.button1 }>
                    <Text style = { styles.buttonText }>Sign In</Text>
                </TouchableOpacity>
                <Text style = {{ alignSelf: 'center', paddingTop: 20 }}>Don't have an account?</Text>
                {/*viser knap som fører brugeren til Sign Up-siden, hvis de ikke allerede har en brugerprofil*/}
                <TouchableOpacity onPress={ () => navigation.navigate('Sign Up') } style = { styles.button2 }>
                    <Text style = { styles.buttonText }>Sign up now!</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

//opretter stylesheet for komponenten
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