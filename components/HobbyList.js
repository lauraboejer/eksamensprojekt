// Importerer React-elementer
import React, {useEffect, useState} from 'react';
import {Text, FlatList, TouchableOpacity, StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';

// Importerer Firebase-elementer
import firebase from 'firebase/compat';
import {SearchBar} from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

// Opretter og eksporterer HobbyList-funktionen, som returnerer view'et i form af en liste af hobbyer fra databasen
export default function HobbyList({ navigation }) {
    const [hobbies, setHobbies] = useState();
    const [search, updateSearch] = useState('');
    // Henter data fra databasen hvis hobbies ikke er hentet endnu
        useEffect(() => {
            try {
                if (!hobbies) {
                    firebase
                        .database()
                        .ref('/Hobbies')
                        // Henter data ved brug af '.on()'
                        .on('value', snapshot => {
                            setHobbies(snapshot.val())
                        });
                }
            } catch (error) {
                throw error;
            }
        }, []);
    //rReturnerer teksten, hvis der ikke findes nogle hobbyer i databasen
    if (!hobbies) {
        return <View style = { { justifyContent: 'center', flex: 1, alignItems: 'center' } }>
            <Text>Trying to find hobbies...</Text>
        </View>    }
    // Opretter handleSelectHobby-funktion, som ud fra et array af alle hobbyer returnerer den valgte hobby på ID-match
    function handleSelectHobby(id) {
        const hobby = Object.entries(hobbies).find( hobby => hobby[0] === id /*id*/)
        return (
            navigation.navigate('Event Details', { hobby })
        );
    }
    // Deklarerer hobbyerne som objekter i et array som input til FlatList
    const hobbyArray = Object.values(hobbies);
    const hobbyKeys = Object.keys(hobbies);
    // Returnerer view'et for Explore Events i form af hobbylisten
    return (
        // Returnerer view'et for events oprettet i applikationen
        <SafeAreaView>
        <View style={{height: '100%' }}>
            <View>
                <Text style = { styles.header }>Event List</Text>
                {/* Illusterer en søgebar, som dog endnu ikke funktionelt er implementeret */}
                <SearchBar
                    placeholder = "Type Here..."
                    onChangeText = { updateSearch }
                    value = { search }
                    lightTheme = 'false'
                />
            </View>
            <FlatList
            data = { hobbyArray }
            // Anvender hobbyKeys til at finde ID på den aktuelle hobby og returnerer dette som 'key', og
            // giver dette som ID til hobby-item
            keyExtractor = { (item, index) => hobbyKeys[index] }
            renderItem = { ({ item, index }) => {
                return(
                    <TouchableOpacity style = { styles.container } onPress = { () => handleSelectHobby(hobbyKeys[index]) }>
                        <Text style = { { fontWeight: 'bold' } }>{ item.name }</Text>
                        {/* Returnerer knap til at gemme event. Eftersom funktionaliteten endnu ikke er implementeret,
                        er knappen statisk udelukkende til illustration, hvorfor der intet sker ved OnPress() */}
                        <TouchableOpacity style = { { alignItems: 'flex-end' } } onPress = { () => { } }>
                            <Ionicons name = "heart-outline" size = { 25 }/>
                        </TouchableOpacity>
                        <Text>{ item.date }</Text>
                    </TouchableOpacity>
                )
            }}/>
        </View>
        </SafeAreaView>
    );
}

// Opretter stylesheet
const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        margin: 5,
        padding: 5,
        height: 70,
        alignSelf:'center',
        backgroundColor: 'teal',
        width: '96%'
    },
        label: { fontWeight: 'bold' },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        alignSelf: 'center'
    }
});