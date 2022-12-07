import React, {useState} from 'react';
import {TouchableOpacity,Text, View, TextInput, StyleSheet } from 'react-native';
import firebase from "firebase/compat";
import { initializeApp } from "firebase/app";


export default function SignUpForm({navigation}) {
    //Instantiering af state-variabler, der skal benyttes i SignUpForm
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    //Her defineres brugeroprettelsesknappen, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return <TouchableOpacity onPress={() => handleSubmit()} style={styles.button1}>
            <Text style = { styles.buttonText }>{"Sign Up"}</Text>
        </TouchableOpacity>
    };


    /*
   * Metoden herunder håndterer oprettelse af brugere ved at anvende den prædefinerede metode, som stilles til rådighed af firebase
   * signInWithEmailAndPassword tager en mail og et password med som argumenter og foretager et asynkront kald, der eksekverer en brugeroprettelse i firebase
   * Opstår der fejl under forsøget på oprettelse, vil der i catch blive fremsat en fejlbesked, som, ved brug af
   * setErrorMessage, angiver værdien for state-variablen, errormessage
   */
    const handleSubmit = async() => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then((data)=>{
            });
        } catch (error){
            setErrorMessage(error.message)
        }

    }

//I return oprettes en tekstkomponent, der angiver at dette er SignUpfrom
//Dernæst er der to inputfelter, som løbeende sætter værdien af state-variablerne, mail og password.
// Afslutningsvis, angives det at, hvis errorMessage får fastsat en værdi, skal denne udskrives i en tekstkomponent.

    return (
        <View>
            <View>
                <Text style = { styles.header }>Sign Up</Text>
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
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.input}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
            <Text style={{alignSelf: 'center', paddingTop: 20}}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign In')} style={styles.button2}>
                <Text style={styles.buttonText}>{"Sign in now!"}</Text>
            </TouchableOpacity>
        </View>
    );
}

//Lokal styling til brug i SignUpForm
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
        padding: 10,
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