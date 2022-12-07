// Importerer React-elementer
import React, { useState, useEffect } from 'react';
import { Text, TextInput, SafeAreaView, ScrollView, StyleSheet, View, Alert, TouchableOpacity } from 'react-native';

// Importerer Firebase-elementer
import firebase from 'firebase/compat';

// Opretter og eksporterer AddEditHobby-funktionen, som returnerer views for både tilføj og rediger event
// 'Rediger event' er endnu ikke implementeret i applikationen, men koden gør implementeringen let
export default function AddEditHobby ({ navigation, route }) {
    // deklarerer initialState, som angiver datastrukturen på et event-objekt
    const initialState = {name: '', category: '', location: '', date: '', description: ''};
    const [newHobby, setNewHobby] = useState(initialState);

    // Deklarerer isEditHobby-variablen, som kan bruges til at tilpasse view'et ved implementering af rediger event
    const isEditHobby = route.name === "Edit Hobby";

    /* Opretter useEffect-funktionen, som tjekker for isEditHobby-variablen og returnerer eventet
    baseret på route-parametrene */
    useEffect(() => {
        if(isEditHobby) {
            const hobby = route.params.hobby[1];
            setNewHobby(hobby)
        }
        return () => {
            setNewHobby(initialState)
        };
    }, []);

    // Opretter changeTextInput-funktionen, som ændrer state på hobby ved et givent event
    const changeTextInput = (name, event) => {
        setNewHobby({...newHobby, [name]: event});
    };

    // Opretter handleSave-funktionen, som opdaterer databasen ved enten oprettelse eller redigering af et event
    const handleSave = () => {
        const { name, category, location, date, description } = newHobby;
        if(name.length === 0 || category.length === 0 || location.length === 0 || date.length === 0 || description.length === 0 ) {
            return Alert.alert('Et af felterne er tomme!');
        }
        // Tjekker om der er tale om en redigering af et eksisterende event og opdaterer databasen med ny info
        if(isEditHobby) {
            const id = route.params.hobby[0];
            try {
                firebase
                    .database()
                    .ref(`/Hobbies/${id}`)
                    // Gør brug af update, så kun de felter der ændres opdateres i databasen
                    .update({ name, category, location, date, description });
                Alert.alert("Hobby-info er nu opdateret");
                const hobby = [id,newHobby]
                // Navigerer tilbage til eventets detaljer for at vise ændringerne
                navigation.navigate("Hobby Details",{hobby});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }// Håndterer oprettelse af et nyt event, hvis der ikke er tale om et eksisterende event
        } else {
            try {
                firebase
                    .database()
                    .ref('/Hobbies/')
                    // Gør brug af push for at oprette et nyt objekt i databasen
                    .push({ name, category, location, date, description });
                Alert.alert(`Saved`);
                setNewHobby(initialState)
            } catch (error) {
                console.log(`Error: ${ error.message }`);
            }
        }
    };
    // Returnerer view'et for redigering/oprettelse af event
    return (
        <SafeAreaView>
            <ScrollView>
                <View style = {{alignItems: 'center'}}>
                    <Text style = { styles.header }>Add Event</Text>
                </View>
                {
                    Object.keys(initialState).map((key, index) => {
                        return (
                            <View style = { styles.row } key = { index }>
                                {/* Viser objekt-keys baseret på initialState-variablen*/}
                                <Text style = { styles.label }>{ key }</Text>
                                {/* Definerer tekstinput, som indeholder information, hvis der er tale om redigering */}
                                <TextInput
                                    value = { newHobby[key] }
                                    onChangeText = { (event) => changeTextInput(key, event) }
                                    style = { styles.input }
                                />
                            </View>
                        );
                    })
                }
                <View style = { { justifyContent: 'center', alignItems: 'center', paddingTop: 20 } }>
                    {/* TouchableOpacity fungerer som en knap, hvis tekst ændrer sig alt efter,
                    om der er tale om oprettelse eller redigering */}
                    <TouchableOpacity style = { styles.button } onPress = { () => handleSave() }>
                        <Text style = { styles.buttonText }>{ isEditHobby ? "Save Changes" : "Add Hobby" }</Text>
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
    button: {
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
    header: {
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 20,
    },
});
