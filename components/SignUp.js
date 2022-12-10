import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View, TextInput, StyleSheet, Alert, SafeAreaView, ScrollView} from 'react-native';
import firebase from "firebase/compat";
import { initializeApp } from "firebase/app";
import Ionicons from "react-native-vector-icons/Ionicons";
import {MultiSelect} from "react-native-element-dropdown";

export default function SignUpForm({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [selected, setSelected] = useState([]);

    function Dropdown() {
        const interests = [
            {label: 'Sports', value: 'Sports'},
            {label: 'Arts and crafts', value: 'Arts and crafts'},
            {label: 'Outdoors', value: 'Outdoors'},
            {label: 'Gastronomy', value: 'Gastronomy'},
        ];

        return(
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
                value = {selected}
                search
                searchPlaceholder = "Search..."
                onChange = { (item) => {
                    setSelected(item);
                }}
                renderItem = { (item) => {
                    return (
                        <View style = { dropdownStyles.item }>
                            <Text style = { dropdownStyles.selectedTextStyle }>{ item.label }</Text>
                        </View>
                    );
                }}
                renderSelectedItem= { (item, unSelect) => (
                    <TouchableOpacity onPress = { () => unSelect && unSelect(item) }>
                        <View style = { dropdownStyles.selectedStyle }>
                            <Text style = { dropdownStyles.textSelectedStyle }>{ item.label }</Text>
                            <Ionicons color = "black" name = "trash" size = { 17 }/>
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    }

    const handleData = async() => {
        try {
            firebase
                .database()
                .ref('/Profiles/')
                .push({email, firstName, lastName, location, birthdate, gender, selected});
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = async() => {
        try {
            await
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((data) => {
                        handleData({ email, firstName, lastName, location, birthdate, gender, selected })
            });
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text style = { styles.header }>Sign Up</Text>
                </View>
                <TextInput
                    placeholder = "First name"
                    value = { firstName }
                    onChangeText = { (firstName) => setFirstName(firstName) }
                    style = { styles.input }
                />
                <TextInput
                    placeholder = "Last name"
                    value = { lastName }
                    onChangeText = { (lastName) => setLastName(lastName) }
                    style = { styles.input }

                />
                <TextInput
                    placeholder = "Gender"
                    value = { gender }
                    onChangeText = { (gender) => setGender(gender) }
                    style = { styles.input }
                />
                <TextInput
                    placeholder = "Birthdate"
                    value = { birthdate }
                    onChangeText = { (birthdate) => setBirthdate(birthdate) }
                    style = { styles.input }
                />
                <TextInput
                    placeholder = "Location"
                    value = { location }
                    onChangeText = { (location) => setLocation(location) }
                    style = { styles.input }
                />
                <Dropdown/>
                <TextInput
                    placeholder = "E-mail"
                    value = { email }
                    onChangeText = { (email) => setEmail(email) }
                    style = { styles.input }
                />
                <TextInput
                    placeholder = "Password"
                    value = {password}
                    onChangeText = { (password) => setPassword(password) }
                    secureTextEntry
                    style = { styles.input }
                />
                { errorMessage && (
                    <Text style = { styles.error }>Error: { errorMessage }</Text>
                )}
                <TouchableOpacity onPress = { () => handleSubmit() } style = { styles.button1 }>
                    <Text style = { styles.buttonText }>Sign Up</Text>
                </TouchableOpacity>
                <Text style = {{ alignSelf: 'center', paddingTop: 20 }}>Already have an account?</Text>
                <TouchableOpacity onPress = { () => navigation.navigate('Sign In') } style = { styles.button2 }>
                    <Text style = { styles.buttonText }>Sign in now!</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

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