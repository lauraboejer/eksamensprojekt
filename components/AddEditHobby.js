import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from "react-native";
import { Text, TextInput, SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import firebase from 'firebase/compat';

export default function AddEditHobby ({ navigation, route }) {
    const organizer = firebase.auth().currentUser.email;
    const initialState = { name: '', category: '', date: '', location: '', description: '' };
    const [newHobby, setNewHobby] = useState(initialState);
    const isEditHobby = route.name === "Edit Event";

    const [hobbyId, setHobbyId] = useState();
    useEffect(() => {
        if(isEditHobby) {
            const hobby = route.params.hobby;
            setNewHobby(hobby);
            const id = route.params.hobbyId;
            setHobbyId(id);
        }
        return () => {
            setNewHobby(initialState);
        };
    }, []);

    const  handleDelete = () => {
        try {
            firebase
                .database()
                .ref(`/Hobbies/${ hobbyId }`)
                .remove();
            // Og går tilbage når det er udført
            navigation.pop(2);
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const confirmDelete = () => {
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete this event?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    function DeleteEvent() {
        if (isEditHobby) {
            return(
                <TouchableOpacity style = { styles.button2 } onPress = { () => confirmDelete() }>
                    <Text style = { styles.buttonText }>Delete event</Text>
                </TouchableOpacity>
            );
        }
    }

    const changeTextInput = (name, event) => {
        setNewHobby({ ...newHobby, [name]: event });
    };

    const handleSave = () => {
        const { name, category, date, location, description } = newHobby;
        if (name.length === 0 || category.length === 0 || date.length === 0 || location.length === 0 || description.length === 0) {
            return (
                Alert.alert('Et af felterne er tomme!')
            );
        } else if (isEditHobby) {
            try {
                firebase
                    .database()
                    .ref(`/Hobbies/${ hobbyId }`)
                    .update({ name, category, date, location, description});
                Alert.alert("Your event has been updated");
                const hobby = [hobbyId,newHobby];
                navigation.goBack({ hobby });
            } catch (error) {
                console.log(`Error: ${ error.message }`);
            }
        } else {
            try {
                firebase
                    .database()
                    .ref('/Hobbies/')
                    .push({ name, category, date, location, description, organizer });
                Alert.alert(`Saved`);
                const hobby = [hobbyId, newHobby]
                navigation.navigate("Organized Events", { hobby });
                return setNewHobby(initialState);
            } catch (error) {
                console.log(`Error: ${ error.message }`);
            }
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style = { styles.header }>{ isEditHobby ? "Edit event" : "Add event" }</Text>
                {
                    Object.keys(initialState).map((key, index) => {
                        return (
                            <View style = { styles.row } key = { index }>
                                <Text style = { styles.label }>{ key }</Text>
                                <TextInput
                                    value = { newHobby[key] }
                                    onChangeText = { (event) => changeTextInput(key, event) }
                                    style = { styles.input }
                                />
                            </View>
                        );
                    })
                }
                <View style = {{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                    <TouchableOpacity style = { styles.button1 } onPress = { () => handleSave() }>
                        <Text style = { styles.buttonText }>{ isEditHobby ? "Save changes" : "Add event" }</Text>
                    </TouchableOpacity>
                    <DeleteEvent/>
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