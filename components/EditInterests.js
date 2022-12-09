import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View, TextInput, StyleSheet, Alert, SafeAreaView, ScrollView} from 'react-native';
import firebase from "firebase/compat";
import { initializeApp } from "firebase/app";
import Ionicons from "react-native-vector-icons/Ionicons";
import {MultiSelect} from "react-native-element-dropdown";

export default function EditInterests({navigation, route}) {
    //Instantiering af state-variabler, der skal benyttes i SignUpForm
    const interests = route.params.interests;
    const id = route.params.id;
    const [selected, setSelected] = useState(interests);

    function Dropdown() {
        const interests = [
            {label: 'Sports', value: 'Sports'},
            {label: 'Arts and crafts', value: 'Arts and crafts'},
            {label: 'Outdoors', value: 'Outdoors'},
            {label: 'Gastronomy', value: 'Gastronomy'},
        ];
        return(
            <MultiSelect
                style={dropdownStyles.dropdown}
                placeholderStyle={dropdownStyles.placeholderStyle}
                selectedTextStyle={dropdownStyles.selectedTextStyle}
                inputSearchStyle={dropdownStyles.inputSearchStyle}
                iconStyle={dropdownStyles.iconStyle}
                data={interests}
                labelField="label"
                valueField="value"
                placeholder="Choose interests"
                value={selected}
                search
                searchPlaceholder="Search..."
                onChange={ (item) => {
                    setSelected(item);
                }}
                renderItem = { (item) => {
                    return (
                        <View style={dropdownStyles.item}>
                            <Text style={dropdownStyles.selectedTextStyle}>{item.label}</Text>
                        </View>
                    );
                }}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={dropdownStyles.selectedStyle}>
                            <Text style={dropdownStyles.textSelectedStyle}>{item.label}</Text>
                            <Ionicons color="black" name="trash" size={17} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        )
    }
    const handleData = async() => {
        try {
            await
            firebase
                .database()
                .ref(`/Profiles/${id}/`)
                .update({"selected": selected});
        } catch (error) {
            console.log(error.message)
        }
    };

    const handleSubmit = async() => {
        try {
            await
                handleData(selected)
            navigation.navigate('Profile')
        } catch (error){
            setErrorMessage(error.message)
        }

    }

//I return oprettes en tekstkomponent, der angiver at dette er SignUpfrom
//Dernæst er der to inputfelter, som løbeende sætter værdien af state-variablerne, mail og password.
// Afslutningsvis, angives det at, hvis errorMessage får fastsat en værdi, skal denne udskrives i en tekstkomponent.

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text style = { styles.header }>Change interests</Text>
                <Dropdown/>
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.button1}>
                    <Text style = { styles.buttonText }>{"Save changes"}</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

//Lokal styling til brug i SignUpForm
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        alignSelf: 'center',
        paddingTop: 55
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
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 5
    },
    button1: {
        margin: 10,
        height: 40,
        backgroundColor: 'seagreen',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 150
    },
    button2: {
        margin: 10,
        height: 40,
        backgroundColor: 'cornflowerblue',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 150
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 12
    }
});

const dropdownStyles = StyleSheet.create({
    dropdownContainer: {
        backgroundColor: '#37d5d2a2',
        paddingTop: 30,
        flex:1
    },
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
});