// Importerer React-elementer
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import firebase from "firebase/compat";

export default function Profile({ navigation }) {
    const email = firebase.auth().currentUser.email
    const [profile, setProfile] = useState();
    const [id, setId] = useState();
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        try {
            if (!profile) {
                firebase
                    .database()
                    .ref(`/Profiles/`)
                    .orderByChild('email')
                    .on('value', snapshot => {
                        snapshot.forEach(function (profileSnapshot) {
                            if (profileSnapshot.val().email.toLowerCase() === email) {
                                setProfile(profileSnapshot.val())
                                setId(profileSnapshot.key)
                                return;
                            }
                        });
                    });
            }
        } catch (error) {
            throw error;
        }
    }, []);

    if (!profile) {
        return (
            <View style = { { justifyContent: 'center', flex: 1, alignItems: 'center' } }>
                <Text>Looking for profile details...</Text>
            </View>
        );
    }

    const interests = Object.values(profile.selected)

    function ShowInterests () {
        return interests.map(item => {
            return (
                <Text style = { styles.value }>{ item }</Text>
            );
        });
    }

    const handleSubmit = async () => {
        try {
            // prædefineret Firebase-funktion
            await firebase.auth().signOut();
            navigation.goBack();
        } catch (error){
            setErrorMessage(error.message)
        }
    }

    return (
        <SafeAreaView style={{paddingTop: 40}}>
            <Text style = { styles.header }>{ profile.firstName + ' ' + profile.lastName }</Text>
            <ScrollView>
        <View style = { styles.container }>
            <View style = { styles.info }>
                <View style = { styles.row }>
                    <Text style = { styles.label }>E-mail</Text>
                    <Text style = { styles.value }>{ profile.email }</Text>
                </View>
                <View style = { styles.row }>
                    <Text style = { styles.label }>Location</Text>
                    <Text style = { styles.value }>{ profile.location }</Text>
                </View>
                <View style = { styles.row }>
                    <Text style = { styles.label }>Gender</Text>
                    <Text style = { styles.value }>{ profile.gender }</Text>
                </View>
                <View style = { styles.row }>
                    <Text style = { styles.label }>Birthdate</Text>
                    <Text style = { styles.value }>{ profile.birthdate }</Text>
                </View>
                <TouchableOpacity style = { styles.button2 } onPress = { () => navigation.navigate('Edit Profile', { id, profile }) }>
                    <Text style = { styles.buttonText }>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <Text style = { styles.interestText }>Interests</Text>
            <View style = { styles.interests }>
                <ShowInterests/>
                <TouchableOpacity style = { styles.button1 } onPress = { () => navigation.navigate('Edit Interests', { interests, id }) }>
                    <Text style = { styles.buttonText }>Edit Interests</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style = { styles.button2 } onPress = { () => navigation.navigate('Organized Events')}>
                <Text style = { styles.buttonText }>Organized Events</Text>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.button3 } onPress = { () => { handleSubmit() } }>
                <Text style = { styles.buttonText }>Sign Out</Text>
            </TouchableOpacity>
        </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 5,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 20,
        paddingBottom: 5
    },
    interestText: {
        fontSize: 15,
        fontWeight: "bold",
        paddingTop: 20
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        alignSelf: 'center',
    },
    info: {
        width: '100%',
        borderRadius:10,
        margin: 5,
        paddingTop: 5,
        paddingHorizontal: 5,
        height: 'auto',
        backgroundColor: 'lightgrey'
    },
    interests: {
        width: '100%',
        borderRadius:10,
        margin: 5,
        paddingTop: 10,
        height: 'auto',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 5,
        backgroundColor: 'mediumaquamarine'
    },
    button1: {
        margin: 10,
        height: 40,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150
    },
    button2: {
        margin: 10,
        height: 40,
        backgroundColor: 'grey',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        alignSelf: 'center'
    },
    button3: {
        margin: 10,
        height: 40,
        backgroundColor: 'firebrick',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 12
    },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: {
        width: 100,
        fontWeight: 'bold'
    },
    value: { flex: 1 },
});