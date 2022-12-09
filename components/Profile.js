// Importerer React-elementer
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {SearchBar} from "react-native-elements";
import firebase from "firebase/compat";

// Opretter og eksporterer Profile-funktionen, som er ment til at  returnere view'et for den aktuelle bruger
// ved ID-match i databasen. Eftersom brugerfunktionen endnu ikke er implementeret i applikationen, viser koden
// et statisk eksempel på et layout
export default function Profile({ navigation }) {
    const email = firebase.auth().currentUser.email
    const [profile, setProfile] = useState();
    const [id, setId] = useState();
    // Henter data fra databasen hvis hobbies ikke er hentet endnu
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
                        })
                    })
            };
        } catch (error) {
            throw error;
        }
    }, []);

    if (!profile) {
        return <View style = { { justifyContent: 'center', flex: 1, alignItems: 'center' } }>
            <Text>Looking for profile details...</Text>
        </View>
    }
    const interests = Object.values(profile.selected)
    function ShowInterests () {
        return interests.map(item => {
            return <Text style={styles.value}>{item}</Text>
        })
    }
    return (
        <SafeAreaView>
            <Text style = { styles.header }>{profile.firstName + ' ' + profile.lastName}</Text>
            <ScrollView>
        <View style = { styles.container }>
            {/* View til display af brugerinfo */}
            <View style = { styles.info }>
                <View style={styles.row}>
                    <Text style={styles.label}>E-mail</Text>
                        {/*Vores car values navne */}
                    <Text style={styles.value}>{profile.email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Location</Text>
                    {/*Vores car values navne */}
                    <Text style={styles.value}>{profile.location}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Gender</Text>
                {/*Vores car values navne */}
                    <Text style={styles.value}>{profile.gender}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Birthdate</Text>
                    {/*Vores car values navne */}
                    <Text style={styles.value}>{profile.birthdate}</Text>
                </View>
            </View>
            <Text style = { styles.interestText }>Interests</Text>
            {/* View til display af brugerens valgte interesser */}
            <View style = { styles.interests }>
                <ShowInterests/>
                {/* Returnerer knap for redigering af interesser. Eftersom funktionaliteten endnu ikke er
                implementeret, er der sat en navigaitonsreference til 'Edit Interests', men da denne ikke
                eksisterer endnu, sker der intet ved OnPress() */}
                <TouchableOpacity style = { styles.button1 } onPress = { () => navigation.navigate('Edit Interests', {interests, id})}>
                    <Text style = { styles.buttonText }>Edit Interests</Text>
                </TouchableOpacity>
            </View>
            {/* Returnerer knap for redigering af profilen. Eftersom funktionaliteten endnu ikke er
                implementeret, er der sat en navigaitonsreference til 'Edit Profile', men da denne ikke
                eksisterer endnu, sker der intet ved OnPress() */}
            <TouchableOpacity style = { styles.button2 } onPress = { () => navigation.navigate('Edit Profile')}>
                <Text style = { styles.buttonText }>Edit Profile</Text>
            </TouchableOpacity>
            {/* Returnerer knap for listevisning af tilmeldte events. Eftersom funktionaliteten endnu ikke er
                implementeret, er der sat en navigaitonsreference til 'Registered Events', men da denne ikke
                eksisterer endnu, sker der intet ved OnPress() */}
            <TouchableOpacity style = { styles.button2 } onPress = { () => navigation.navigate('Registered Events')}>
                <Text style = { styles.buttonText }>Registered Events</Text>
            </TouchableOpacity>
        </View>
            </ScrollView>
        </SafeAreaView>
    )
};

// Opretter stylesheet
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
        padding: 5,
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
        backgroundColor: 'cornflowerblue',
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