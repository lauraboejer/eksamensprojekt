// importerer React-elementer
import React, { useState } from 'react';
import {Button, Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

// importerer Firebase-elementer
import firebase from "firebase/compat";
import { initializeApp } from "firebase/app";

export default function LogInForm({navigation}) {
    // instantiering af statevariabler, der skal benyttes i LogInForm
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    /*
    * Metoden herunder håndterer login af en eksisterende bruger ved at anvende den prædefinerede metode, som stilles til rådighed af firebase
    * signInWithEmailAndPassword tager en mail og et password med som argumenter og foretager et asynkront kald, der eksekverer login i firebase
    * Opstår der fejl under forsøget på login, vil der i catch blive fremsat en fejlbesked, som, ved brug af
    * setErrorMessage, angiver værdien for state-variablen, errormessage
    */
    // håndterer log ind for eksisterende brugere
    const handleSubmit = async () => {
        try {
            // prædefineret Firebase-funktion
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data)=>{
            });

        } catch (error){
            setErrorMessage(error.message)
        }
    }

    //Her defineres loginknappen, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return <TouchableOpacity onPress={() => handleSubmit()} style={styles.button1}>
            <Text style={styles.buttonText}>{"Sign In"}</Text>
        </TouchableOpacity>
    }
//I return oprettes en tekstkomponent, der angiver at dette er loginfrom
//Dernæst er der to inputfelter, som løbeende sætter værdien af state-variablerne, mail og password.
// Afslutningsvis, angives det at, hvis errorMessage får fastsat en værdi, skal denne udskrives i en tekstkomponent.
    return (
        <View>
            <View>
                <Text style = { styles.header }>Sign In</Text>
            </View>
            <TextInput
                placeholder="E-mail"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(password) => setPassword(password) }
                secureTextEntry
                style={styles.input}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
            <Text style={{alignSelf: 'center', paddingTop: 20}}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')} style={styles.button2}>
                <Text style={styles.buttonText}>{"Sign up now!"}</Text>
            </TouchableOpacity>
        </View>
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
        paddingTop: 55
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