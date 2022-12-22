//importerer React-elementer
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, SafeAreaView, ScrollView, View, Alert } from 'react-native';

//importerer Firebase-elementer
import firebase from 'firebase/compat';

//opretter funktion for komponenten som håndterer ændringer i og sletning af profil
export default function EditProfile({ navigation, route}) {
    const profile = route.params.profile; //deklarerer profilen på baggrund af parametre fra forrige screen
    const id = route.params.id; //deklarerer id på baggrund af parametre fra forrige screen
    const initialState = {firstName: '', lastName:'', location: '', gender: '', birthdate: ''}; //definerer initialtilstand for profiler
    const [editProfile, setEditProfile] = useState(initialState);
    //useEffect køres når siden indlæses og sætter profilen
    useEffect(() => {
        setEditProfile(profile);
    },[])
    //opretter funktion som håndterer sletning af profilen i databasen på baggrund af profilens ID
    const handleDelete = () => {
        try {
            //sletter brugeren i Realtime Databasen
            firebase
                .database()
                .ref(`/Profiles/${ id }`)
                .remove();
            //sletter brugeren i Authentification-databasen
            firebase.auth().currentUser.delete();
            navigation.navigate('Event List'); //navigerer brugeren til overblikket over begivenheder
        } catch (error) {
            Alert.alert(error.message); //giver brugeren besked, hvis der er sket en fejl
        }
    };
    //opretter funktion som advarer brugeren inden sletning
    const confirmDelete = () => {
        if(Platform.OS === 'ios' || Platform.OS === 'android') {
            Alert.alert('Are you sure?', 'Do you want to delete your profile?', [
                { text: 'Cancel', style: 'cancel' }, //afbryder sletningen, hvis brugeren trykker 'Cancel'
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() }, //kalder slette-funktionen, hvis brugeren trykker 'Delete'
            ]);
        }
    };

    //opretter funktion som ændrer state på editProfile ved et givent event change
    const changeTextInput = (name, event) => {
        setEditProfile({...editProfile, [name]: event});
    };
    //opretter funktion som håndterer ændringer i profiler i databasen
    const handleSave = () => {
        const { firstName, lastName, location, gender, birthdate } = editProfile;
        //tjekker om inputfelterne er tomme
        if(firstName.length === 0 || lastName.length === 0 || location.length === 0 || gender.length === 0|| birthdate.length === 0) {
            return Alert.alert('One of the fields is empty');
        } else {
            try {
                //leder i databasen efter den aktuelle profil gennem ID'et og opdaterer den
                firebase
                    .database()
                    .ref(`/Profiles/${ id }`)
                    .update({ firstName, lastName, location, gender, birthdate});
                Alert.alert("Your profile has been updated"); //giver brugeren besked om, at opdateringen har fundet sted
                navigation.navigate("Profile"); //navigerer brugeren tilbage til profilsiden
            } catch (error) {
                console.log(`Error: ${error.message}`); //returnerer en fejlbesked i terminalen, hvis noget går galt
            }
        }
    };
    //returnerer view'et for EditProfile-komponenten
    return (
        <SafeAreaView style = {{ paddingTop: 40 }}>
            <ScrollView>
                {/*anvender scroll view, så brugeren kan rulle på siden*/}
                <Text style = { styles.header }>Edit profile</Text>
                {
                    Object.keys(initialState).map((key, index) => {
                        {/*henter objekt keys for initialState*/}
                        return (
                            <View style = { styles.row } key = { index }>
                                {/*viser objekt keys baseret på initialState*/}
                                <Text style = { styles.label }>{ key }</Text>
                                {/*definerer tekstinput, som indeholder profilinformation*/}
                                <TextInput
                                    value = { editProfile[key] }
                                    onChangeText = { (event) => changeTextInput(key, event) }
                                    style = { styles.input }
                                />
                            </View>
                        );
                    })
                }
                <View style = {{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                    {/*viser knap som håndterer gem*/}
                    <TouchableOpacity style = { styles.button1 } onPress = { () => handleSave() }>
                        <Text style = { styles.buttonText }>Save changes</Text>
                    </TouchableOpacity>
                    {/*viser knap som håndterer sletning*/}
                    <TouchableOpacity style = { styles.button2 } onPress = { () => confirmDelete() }>
                        <Text style = { styles.buttonText }>Delete profile</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

//opretter stylesheet for komponenten
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
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
        padding:5,
        flex: 1,
    },
    button1: {
        margin: 10,
        height: 40,
        backgroundColor: 'seagreen',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150
    },
    button2: {
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
    header: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        alignSelf: 'center',
    },
});