//importerer React-elementer
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, View, SafeAreaView} from 'react-native';
import { SearchBar } from "react-native-elements";

//importerer Firebase-elementer
import firebase from 'firebase/compat';

//opretter funktion for komponenten, som håndterer listevisning af begivenheder som den aktuelle bruger har oprettet
export default function OrganizedHobbies({ navigation }) {
    const email = firebase.auth().currentUser.email; //gemmer den aktuelle brugers email
    const [search, updateSearch] = useState('');
    const [hobbies, setHobbies] = useState();
    const hobbyArray = [];
    const hobbyKeys = [];
    //useEffect køres når siden indlæses og henter alle begivenheder i databasen
    useEffect(() => {
        try {
            firebase
                .database()
                .ref(`/Hobbies/`)
                .on('value', snapshot => {
                    setHobbies(snapshot); //sætter begivenhederne i databasen i hobbies-objektet
                });
        } catch (error) {
            throw error;
        }
    },[]);
    //hvis hobby-objektet er tomt, returneres følgende view
    if (!hobbies) {
        return (
            <View style = { { justifyContent: 'center', flex: 1, alignItems: 'center' } }>
                <Text>Looking for your organized events..</Text>
            </View>
        );
    } else {
        //opretter en funktion der itererer gennemm hobbies-array'et og finder de begivenheder, hvor organizer er lig den aktuelle bruger
        function GetHobbies() {
            return(
                hobbies.forEach(function(data) {
                    data.forEach(function(hobby){
                        if(hobby.val().toString() === email) { //sætter hobby.val() til en streng, da den ellers er et objekt
                            hobbyArray.push(data.val()) //gemmer values i hobbyArray
                            hobbyKeys.push(data.key) //gemmer keys i hobbyKeys
                        }
                    });
                })
            );
        }
        GetHobbies(); //kalder GetHobbies-funktionen
        //opretter en funktion som håndterer visning af en specifik begivenhed
        function handleSelectHobby(id, item) {
            const hobby = [id, item];
            return (
                navigation.navigate('Organized Details', { hobby }) //navigerer brugeren til detaljevisning for den valgte begivenhed
            );
        }
        //returnerer view'et for OrganizedEvents-komponenten
        return (
            <SafeAreaView style = {{ paddingTop: 40 }}>
                <View style = {{ height: '100%' }}>
                    <View>
                        <Text style = { styles.header }>Organized Events</Text>
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
                        renderItem = { ({item, index }) => {
                            return (
                                //returnerer knap som håndterer valg af specifik begivenhed
                                <View style = { styles.row }>
                                    <TouchableOpacity style = { styles.container } onPress = { () => handleSelectHobby(hobbyKeys[index], item) }>
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