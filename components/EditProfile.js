import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from "react-native";
import { Text, TextInput, SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import firebase from 'firebase/compat';

export default function EditProfile({ navigation, route}) {
    const profile = route.params.profile;
    const id = route.params.id;
    const initialState = {firstName: '', lastName:'', location: '', gender: '', birthdate: ''};
    const [editProfile, setEditProfile] = useState(initialState);

    useEffect(()=>{
        setEditProfile(profile);
    },[])

    const  handleDelete = () => {
        try {
            firebase
                .database()
                .ref(`/Profiles/${ id }`)
                .remove();
            firebase.auth().currentUser.delete();
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const confirmDelete = () => {
        if(Platform.OS === 'ios' || Platform.OS === 'android') {
            Alert.alert('Are you sure?', 'Do you want to delete this event?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    const changeTextInput = (name, event) => {
        setEditProfile({...editProfile, [name]: event});
    };

    const handleSave = () => {
        const { firstName, lastName, location, gender, birthdate } = editProfile;
        if(firstName.length === 0 || lastName.length === 0 || location.length === 0 || gender.length === 0|| birthdate.length === 0) {
            return Alert.alert('Et af felterne er tomme!');
        } else {
            try {
                firebase
                    .database()
                    .ref(`/Profiles/${ id }`)
                    .update({ firstName, lastName, location, gender, birthdate});
                Alert.alert("Your profile has been updated");
                navigation.navigate("Profile");
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style = { styles.header }>Edit profile</Text>
                {
                    Object.keys(initialState).map((key, index) => {
                        return (
                            <View style = { styles.row } key = { index }>
                                <Text style = { styles.label }>{ key }</Text>
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
                    <TouchableOpacity style = { styles.button1 } onPress = { () => handleSave() }>
                        <Text style = { styles.buttonText }>Save changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = { styles.button2 } onPress = { () => confirmDelete() }>
                        <Text style = { styles.buttonText }>Delete profile</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

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