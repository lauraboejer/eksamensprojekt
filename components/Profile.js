//importerer React-elementer
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

//importerer Firebase-elementer
import firebase from "firebase/compat";

//opretter funktion for komponenten, som håndterer visning af den aktuelle brugers profil
export default function Profile({ navigation }) {
    const email = firebase.auth().currentUser.email //henter og gemmer brugerens email
    const [profile, setProfile] = useState();
    const [id, setId] = useState();
    //useEffect køres når siden indlæses og henter data på brugerens profil i databasen
    useEffect(() => {
        try {
            if (!profile) {
                firebase
                    .database()
                    .ref(`/Profiles/`) //henter alle profiler i databasen
                    .orderByChild('email') //arrangerer dem efter email
                    .on('value', snapshot => {
                        snapshot.forEach(function (profileSnapshot) { //itererer gennem alle profiler og deres attributter
                            if (profileSnapshot.val().email.toLowerCase() === email) { //tjekker om profilens mailadresse matcher den aktuelle bruger
                                setProfile(profileSnapshot.val()) //gemmer profilen som profile
                                setId(profileSnapshot.key) //gemmer profilens id som id
                                return;
                            }
                        });
                    });
            }
        } catch (error) {
            throw error;
        }
    }, []);
    //hvis profile-objektet er tomt, returneres følgende view
    if (!profile) {
        return (
            <View style = { { justifyContent: 'center', flex: 1, alignItems: 'center' } }>
                <Text>Looking for profile details...</Text>
            </View>
        );
    }
    //gemmer interesser som værdierne i profile-objektets selected-attribut
    const interests = Object.values(profile.selected)
    //opretter funktion som håndterer visning af brugerens interesser i profilen
    function ShowInterests () {
        return interests.map(item => {
            return (
                <Text style = { styles.value }>{ item }</Text>
            );
        });
    }
    //opretter funktion som håndterer at brugeren logges ud
    const handleSignOut = async () => {
        try {
            //anvender prædefineret Firebase-funktionalitet til at logge brugeren ud
            await firebase.auth().signOut();
            navigation.goBack(); //navigerer brugeren tilbage til startsiden
        } catch (error){
            throw error.message;
        }
    };
    //returnerer view'et for Profile-komponenten
    return (
        <SafeAreaView style = {{ paddingTop: 40 }}>
            <Text style = { styles.header }>{ profile.firstName + ' ' + profile.lastName }</Text>
            <ScrollView>
                {/*anvender scroll view, så brugeren kan rulle på siden*/}
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
                        {/*viser knap som navigerer brugeren til redigeringssiden for profilen*/}
                        <TouchableOpacity style = { styles.button2 } onPress = { () => navigation.navigate('Edit Profile', { id, profile }) }>
                            <Text style = { styles.buttonText }>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style = { styles.interestText }>Interests</Text>
                    <View style = { styles.interests }>
                        {/*kalder visning af brugerens interesser*/}
                        <ShowInterests/>
                        {/*viser knap som navigerer brugeren til redigeringssiden for interesser*/}
                        <TouchableOpacity style = { styles.button1 } onPress = { () => navigation.navigate('Edit Interests', { interests, id }) }>
                            <Text style = { styles.buttonText }>Edit Interests</Text>
                        </TouchableOpacity>
                    </View>
                    {/*viser knap som navigerer brugeren til listevisning for egne oprettede begivenheder*/}
                    <TouchableOpacity style = { styles.button2 } onPress = { () => navigation.navigate('Organized Events')}>
                        <Text style = { styles.buttonText }>Organized Events</Text>
                    </TouchableOpacity>
                    {/*viser knap som håndterer at brugeren logger ud*/}
                    <TouchableOpacity style = { styles.button3 } onPress = { () => { handleSignOut() } }>
                        <Text style = { styles.buttonText }>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

//opretter stylesheet for komponenten
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