//importerer React-elementer
import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { MultiSelect } from "react-native-element-dropdown";

//importerer Firebase-elementer
import firebase from "firebase/compat";

//opretter funktion for komponenten som håndterer oprettelsen af en ny brugerprofil
export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [selected, setSelected] = useState([]);
    //opretter funktion som håndterer dropdown-funktionalitet for interesser
    //funktionaliteten er implementeret med inspiration fra: https://www.nicesnippets.com/blog/how-to-use-multiple-select-dropdown-in-react-native
    function Dropdown() {
        //opretter prædefinerede interessekategorier
        const interests = [
            {label: 'Sports', value: 'Sports'},
            {label: 'Arts and crafts', value: 'Arts and crafts'},
            {label: 'Outdoors', value: 'Outdoors'},
            {label: 'Gastronomy', value: 'Gastronomy'},
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
                value = {selected}
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
                renderSelectedItem= { (item, unSelect) => (
                    //returnerer visning af valgte interesser, som slettes ved tryk
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
    //opretter funktion som håndterer gem af brugeroplysninger i Realtime Databasen
    const handleData = async() => {
        try {
            firebase
                .database()
                .ref('/Profiles/')
                .push({email, firstName, lastName, location, birthdate, gender, selected});
        } catch (error) {
            console.log(error.message); //returnerer en fejlbesked i terminalen, hvis der opstår fejl
        }
    };
    //opretter funktion som kalder handleData og håndterer oprettelse i databasen
    const handleSubmit = async() => {
        try {
            await
                //opretter brugeren i Firebase Authentification-databasen
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
    //returnerer view'et for SignUp-komponenten
    return (
        <SafeAreaView style = {{ paddingTop: 40 }}>
            <ScrollView>
                {/*anvender scroll view, så brugeren kan rulle på siden*/}
                <View>
                    <Text style = { styles.header }>Sign Up</Text>
                </View>
                {/*tekstinput for fornavn*/}
                <TextInput
                    placeholder = "First name"
                    value = { firstName }
                    onChangeText = { (firstName) => setFirstName(firstName) }
                    style = { styles.input }
                />
                {/*tekstinput for efternavn*/}
                <TextInput
                    placeholder = "Last name"
                    value = { lastName }
                    onChangeText = { (lastName) => setLastName(lastName) }
                    style = { styles.input }

                />
                {/*tekstinput for køn*/}
                <TextInput
                    placeholder = "Gender"
                    value = { gender }
                    onChangeText = { (gender) => setGender(gender) }
                    style = { styles.input }
                />
                {/*tekstinput for fødselsdato*/}
                <TextInput
                    placeholder = "Birthdate"
                    value = { birthdate }
                    onChangeText = { (birthdate) => setBirthdate(birthdate) }
                    style = { styles.input }
                />
                {/*tekstinput for lokation*/}
                <TextInput
                    placeholder = "Location"
                    value = { location }
                    onChangeText = { (location) => setLocation(location) }
                    style = { styles.input }
                />
                {/*kalder dropdown-funktionen*/}
                <Dropdown/>
                {/*tekstinput for e-mail*/}
                <TextInput
                    placeholder = "E-mail"
                    value = { email }
                    onChangeText = { (email) => setEmail(email) }
                    style = { styles.input }
                />
                {/*tekstinput for password*/}
                <TextInput
                    placeholder = "Password"
                    value = {password}
                    onChangeText = { (password) => setPassword(password) }
                    secureTextEntry
                    style = { styles.input }
                />
                {/*viser fejlbesked ved oprettelse*/}
                { errorMessage && (
                    <Text style = { styles.error }>Error: { errorMessage }</Text>
                )}
                {/*viser knap som kalder handleSubmit og opretter brugeren*/}
                <TouchableOpacity onPress = { () => handleSubmit() } style = { styles.button1 }>
                    <Text style = { styles.buttonText }>Sign Up</Text>
                </TouchableOpacity>
                <Text style = {{ alignSelf: 'center', paddingTop: 20 }}>Already have an account?</Text>
                {/*viser knap som navigerer brugeren til Sign In-siden, hvis de allerede har en profil*/}
                <TouchableOpacity onPress = { () => navigation.navigate('Sign In') } style = { styles.button2 }>
                    <Text style = { styles.buttonText }>Sign in now!</Text>
                </TouchableOpacity>
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