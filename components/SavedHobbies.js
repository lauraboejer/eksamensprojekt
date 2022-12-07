// Importerer React-elementer
import React, { useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";

// Opretter og eksporterer HobbyDetails-funktionen, som returnerer view'et for den valgte hobbys detaljer fra databasen på IT-match
export default function SavedHobbies() {
    const [search, updateSearch] = useState('');
        return (
            // Returnerer view'et for gemte events oprettet i applikationen. Da funktionaliteten endnu ikke er implementeret
            // viser siden udelukkende et statisk eksempel på den endelige løsning
            <View>
                {/* Illusterer en søgebar, som dog endnu ikke funktionelt er implementeret */}
                <SearchBar placeholder = "Type Here..." onChangeText = { updateSearch } value = { search } lightTheme = 'false'/>
            <View style = { styles.container }>
                <TouchableOpacity style = { styles.hobby }>
                    <Text style = { { fontWeight: 'bold' } }>Saved Event 1</Text>
                    {/* Returnerer knap til at gemme event. Eftersom funktionaliteten endnu ikke er implementeret,
                        er knappen statisk udelukkende til illustration, hvorfor der intet sker ved OnPress() */}
                    <TouchableOpacity style = { { alignItems: 'flex-end' } } onPress = { () => { } }>
                        <Ionicons name = "heart" size = { 25 }/>
                    </TouchableOpacity>
                    <Text>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style = { styles.hobby }>
                    <Text style = { { fontWeight: 'bold' } }>Saved Event 2</Text>
                    {/* Returnerer knap til at gemme event. Eftersom funktionaliteten endnu ikke er implementeret,
                        er knappen statisk udelukkende til illustration, hvorfor der intet sker ved OnPress() */}
                    <TouchableOpacity style = { { alignItems: 'flex-end' } } onPress = { () => { } }>
                        <Ionicons name = "heart" size = { 25 }/>
                    </TouchableOpacity>
                    <Text>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style = { styles.hobby }>
                    <Text style = { { fontWeight: 'bold' } }>Saved Event 3</Text>
                    {/* Returnerer knap til at gemme event. Eftersom funktionaliteten endnu ikke er implementeret,
                        er knappen statisk udelukkende til illustration, hvorfor der intet sker ved OnPress() */}
                    <TouchableOpacity style = { { alignItems: 'flex-end' } } onPress = { () => { } }>
                        <Ionicons name = "heart" size = { 25 }/>
                    </TouchableOpacity>
                    <Text>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style = { styles.hobby }>
                    <Text style = { { fontWeight: 'bold' } }>Saved Event 4</Text>
                    {/* Returnerer knap til at gemme event. Eftersom funktionaliteten endnu ikke er implementeret,
                        er knappen statisk udelukkende til illustration, hvorfor der intet sker ved OnPress() */}
                    <TouchableOpacity style = { { alignItems: 'flex-end' } } onPress = { () => { } }>
                        <Ionicons name = "heart" size = { 25 }/>
                    </TouchableOpacity>
                    <Text>Date</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Opretter stylesheet
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingLeft: 5
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 20,
    },
    hobby: {
        width: 365,
        backgroundColor: 'teal',
        borderRadius: 10,
        margin: 5,
        padding: 5,
        height: 70,
        marginRight: 10,
        justifyContent: 'center',
    },
})