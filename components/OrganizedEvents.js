// Importerer React-elementer
import React, {useEffect, useState} from 'react';
import {Text, FlatList, TouchableOpacity, StyleSheet, View, SafeAreaView, ScrollView, TextInput} from 'react-native';

// Importerer Firebase-elementer
import firebase from 'firebase/compat';
import {SearchBar} from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

// Opretter og eksporterer HobbyList-funktionen, som returnerer view'et i form af en liste af hobbyer fra databasen
export default function OrganizedHobbies({ navigation }) {
    const email = firebase.auth().currentUser.email;
    const [search, updateSearch] = useState('');
    const [hobbies, setHobbies] = useState();
    const hobbyArray = [];
    const hobbyKeys = [];
    useEffect(() => {
        try {
            firebase
                .database()
                .ref(`/Hobbies/`)
                .on('value', snapshot => {
                    setHobbies(snapshot);
                });
        } catch (error) {
            throw error
        }
    },[]);

    if (!hobbies) {
        return (
            <View style={{paddingTop: 40}}>
                <Text>Looking for your organized events..</Text>
            </View>
        );
    } else {
        function GetHobbies() {
            return(
                hobbies.forEach(function(data) {
                    //console.log( data.key)
                    data.forEach(function(hobby){
                        if(hobby.val().toString() === email) {
                            hobbyArray.push(data.val())
                            hobbyKeys.push(data.key)
                        }
                    });
                })
            );
        }
        GetHobbies();

        function handleSelectHobby(id, item) {
            const hobby = [id, item];
            return (
                navigation.navigate('Organized Details', { hobby })
            );
        }

        return (
            <SafeAreaView style={{paddingTop: 40}}>
                <View style = {{ height: '100%' }}>
                    <View>
                        <Text style = { styles.header }>Organized Events</Text>
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
                        renderItem = { ({item, index }) => {
                            return (
                                <View style = { styles.row }>
                                    <TouchableOpacity style = { styles.container } onPress={() => handleSelectHobby(hobbyKeys[index], item) }>
                                        <Text style = {{ fontWeight: 'bold' }}>{ item.name }</Text>
                                        <Text>{ item.date }</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}/>
                </View>
            </SafeAreaView>
        );
    }
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