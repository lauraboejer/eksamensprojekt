//importerer React-elementer
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { SearchBar } from "react-native-elements";

//importerer Firebase-elementer
import firebase from 'firebase/compat';

//opretter funktion for komponenten som håndterer listevisning af begivenheder
export default function HobbyList({ navigation }) {
    const [hobbies, setHobbies] = useState();
    const [search, updateSearch] = useState('');
    //useEffect køres når siden indlæses og tjekker for begivenheder i databasen
        useEffect(() => {
            try {
                if (!hobbies) {
                    firebase
                        .database()
                        .ref('/Hobbies')
                        // Henter data ved brug af '.on()'
                        .on('value', snapshot => {
                            setHobbies(snapshot.val()); //gemmer begivenheder i hobby-objektet
                        });
                }
            } catch (error) {
                throw error; //returnerer fejlbesked, hvis der opstår en fejl
            }
        }, []);
    //hvis hobby-objektet er tomt, returneres følgende view
    if (!hobbies) {
        return (
            <View style = { { justifyContent: 'center', flex: 1, alignItems: 'center' } }>
                <Text>Trying to find hobbies...</Text>
            </View>
        );
    }
    //opretter en funktion som håndterer visning af en specifik begivenhed
    function handleSelectHobby(id) {
        const hobby = Object.entries(hobbies).find( hobby => hobby[0] === id)
        return (
            navigation.navigate('Event Details', { hobby })
        );
    }
    const hobbyArray = Object.values(hobbies); //opretter array for begivenheders values
    const hobbyKeys = Object.keys(hobbies); //opretter array for begivenheders keys
    //returnerer view'et for HobbyList-komponenten
    return (
        <SafeAreaView style = {{ paddingTop: 40 }}>
            <View style = {{ height: '100%' }}>
                <View>
                    <Text style = { styles.header }>Event List</Text>
                    <SearchBar
                        placeholder = "Type Here..."
                        onChangeText = { updateSearch }
                        value = { search }
                        lightTheme = 'false'
                    />
                    {/*viser illustrativ søgebar, på trods af at funktionaliteten endnu ikke er implementeret*/}
                </View>
                {/*genererer liste baseret på begivenhedernes values*/}
                <FlatList
                    data = { hobbyArray }
                    keyExtractor = { (item, index) => hobbyKeys[index] }
                    renderItem = { ({ item, index }) => {
                        return (
                            //returnerer knap som håndterer valg af specifik begivenhed
                            <TouchableOpacity style = { styles.container } onPress = { () => handleSelectHobby(hobbyKeys[index]) }>
                                <Text style = {{ fontWeight: 'bold' }}>{ item.name }</Text>
                                <Text>{ item.date }</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
        </View>
        </SafeAreaView>
    );
};

//opretter stylesheet for komponenten
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