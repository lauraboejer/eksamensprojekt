// Importerer React-elementer
import React, {useEffect, useState} from 'react';
import {Text, FlatList, TouchableOpacity, StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';

// Importerer Firebase-elementer
import firebase from 'firebase/compat';
import {SearchBar} from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HobbyList({ navigation }) {
    const [hobbies, setHobbies] = useState();
    const [search, updateSearch] = useState('');

        useEffect(() => {
            try {
                if (!hobbies) {
                    firebase
                        .database()
                        .ref('/Hobbies')
                        // Henter data ved brug af '.on()'
                        .on('value', snapshot => {
                            setHobbies(snapshot.val());
                        });
                }
            } catch (error) {
                throw error;
            }
        }, []);


    if (!hobbies) {
        return (
            <View style = { { justifyContent: 'center', flex: 1, alignItems: 'center' } }>
                <Text>Trying to find hobbies...</Text>
            </View>
        );
    }

    function handleSelectHobby(id) {
        const hobby = Object.entries(hobbies).find( hobby => hobby[0] === id)
        return (
            navigation.navigate('Event Details', { hobby })
        );
    }

    const hobbyArray = Object.values(hobbies);
    const hobbyKeys = Object.keys(hobbies);

    return (
        <SafeAreaView style={{paddingTop: 40}}>
        <View style = {{ height: '100%' }}>
            <View>
                <Text style = { styles.header }>Event List</Text>
                <SearchBar
                    placeholder = "Type Here..."
                    onChangeText = { updateSearch }
                    value = { search }
                    lightTheme = 'false'
                />
            </View>
            <FlatList
            data = { hobbyArray }
            keyExtractor = { (item, index) => hobbyKeys[index] }
            renderItem = { ({ item, index }) => {
                return(
                    <TouchableOpacity style = { styles.container } onPress = { () => handleSelectHobby(hobbyKeys[index]) }>
                        <Text style = { { fontWeight: 'bold' } }>{ item.name }</Text>
                        <TouchableOpacity style = { { alignItems: 'flex-end' } } onPress = { () => {} }>
                        </TouchableOpacity>
                        <Text>{ item.date }</Text>
                    </TouchableOpacity>
                );
            }}/>
        </View>
        </SafeAreaView>
    );
};

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