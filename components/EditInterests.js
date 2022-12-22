//import React-elementer
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { MultiSelect } from "react-native-element-dropdown";

//importerer Firebase-elementer
import firebase from "firebase/compat";

//opretter funktion for komponenten som håndterer ændringer i og tilføjelser af interesser
export default function EditInterests({ navigation, route }) {
    const interests = route.params.interests; //deklarerer interests på baggrund af parametre fra forrige screen
    const id = route.params.id; //deklarerer ID på baggrund af parametre fra forrige screen
    const [selected, setSelected] = useState(interests);
    //opretter funktion som håndterer dropdown-funktionalitet for interesser
    //funktionaliteten er implementeret med inspiration fra: https://www.nicesnippets.com/blog/how-to-use-multiple-select-dropdown-in-react-native
    function Dropdown() {
        //opretter prædefinerede interessekategorier
        const interests = [
            { label: 'Sports', value: 'Sports' },
            { label: 'Arts and crafts', value: 'Arts and crafts' },
            { label: 'Outdoors', value: 'Outdoors' },
            { label: 'Gastronomy', value: 'Gastronomy' },
        ];
        //returnerer view'et for dropdown-funktionen
        return (
            <MultiSelect
                style = { dropdownStyles.dropdown }
                placeholderStyle = { dropdownStyles.placeholderStyle }
                selectedTextStyle = { dropdownStyles.selectedTextStyle }
                inputSearchStyle = { dropdownStyles.inputSearchStyle }
                iconStyle = { dropdownStyles.iconStyle }
                data = { interests }
                labelField = "label"
                valueField = "value"
                placeholder = "Choose interests"
                value = { selected }
                search
                searchPlaceholder = "Search..."
                onChange = { (item) => {
                    setSelected(item);
                }}
                renderItem = { (item) => {
                    //returnerer visning af interessekategorier
                    return (
                        <View style = { dropdownStyles.item }>
                            <Text style = { dropdownStyles.selectedTextStyle }>{ item.label }</Text>
                        </View>
                    );
                }}
                renderSelectedItem = { (item, unSelect) => (
                    //returnerer visning af valgte interesser, som slettes ved tryk
                    <TouchableOpacity onPress={ () => unSelect && unSelect(item) }>
                        <View style = { dropdownStyles.selectedStyle }>
                            <Text style = { dropdownStyles.textSelectedStyle }>{ item.label }</Text>
                            <Ionicons color = "black" name = "trash" size = { 17 } />
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    }
    //opretter funktion som håndterer opdatering af interesser i databasen på baggrund af brugerens ID
    const handleData = async() => {
        try {
            await
                firebase
                    .database()
                    .ref(`/Profiles/${id}/`)
                    .update({"selected": selected});
        } catch (error) {
            console.log(error.message) //returnerer en fejlbesked i terminalen, hvis der opstår fejl
        }
    };
    //opretter funktion som kalder handleData og navigerer brugeren tilbage til profilsiden
    const handleSubmit = async() => {
        try {
            await
                handleData(selected)
            navigation.navigate('Profile')
        } catch (error){
            console.log(error.message) //returnerer en fejlbesked i terminalen, hvis der opstår fejl
        }
    };
    //returnerer view'et for EditInterests-komponenten
    return (
        <SafeAreaView style = {{ paddingTop: 40 }}>
            <ScrollView>
                {/*anvender scroll view, så brugeren kan rulle på siden*/}
                <View>
                    <Text style = { styles.header }>Change interests</Text>
                    {/*kalder dropdown-funktionen*/}
                    <Dropdown/>
                    <TouchableOpacity onPress = { () => handleSubmit() } style = { styles.button1 }>
                        <Text style = { styles.buttonText }>{ "Save changes" }</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

//opretter stylesheet for komponenten
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
//opretter stylesheet for dropdown-visning
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