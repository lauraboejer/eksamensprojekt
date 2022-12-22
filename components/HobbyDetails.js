//importerer React-elementer
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

//importerer Firebase-elementer
import firebase from "firebase/compat";

//opretter funktion som håndterer visning af begivenheder, hvis brugeren er logget ind
function LoggedIn({ route, register, setRegister }) {
    const navigation = useNavigation(); //kalder useNavigation, som anvendes til lettere navigation mellem screens
    const user = firebase.auth().currentUser.email; //henter brugerens email
    const [hobby, setHobby] = useState({});
    const isEditHobby = route.name === "Event Details"; //definerer route som siden besøges fra
    const isOrganizedHobby = route.name === "Organized Details"; //definerer route som siden besøges fra
    const hobbyId = route.params.hobby[0]; //deklarerer begivenhedens ID på baggrund af parametre fra forrige screen
    //useEffect køres når siden indlæses og tjekker i databasen, om brugeren er tilmeldt begivenheden
    useEffect(() => {
        try {
            //leder efter tilmeldte profiler for den aktuelle begivenhed
            firebase
                .database()
                .ref(`/Hobbies/${hobbyId}/registrations/`)
                .once('value', snapshot => {
                    if (snapshot.exists() == false || snapshot.val() == null) {
                        setRegister(false) //register sættes til false, hvis der ikke er nogen tilmeldinger
                    } else {
                        let i;
                        for (i in Object.values(snapshot.val())) {
                            if (Object.values(snapshot.val())[i].user == user) {
                                setRegister(true) //register sættes til true, hvis den aktuelle bruger er tilmeldt
                            } else {
                                setRegister(false) //register sættes til false, hvis den aktuelle bruger ikke er tilmeldt
                            }
                        }
                    }
                });
        } catch (error) {
            throw error;
        }
        setHobby(route.params.hobby[1]) //sætter hobby på baggrund af parametre fra forrige screen
        return () => {
            setHobby({}) //tømmer hobby-objektet når brugeren forlader screen'en
        }
    });
    //opretter funktion som håndterer til- og afmelding i begivenheder
    function registerUser() {
        if (register) {
            //hvis brugeren er tilmeldt, slettes brugeren i begivenhedens registrations-attribut
            firebase
                .database()
                .ref(`/Hobbies/${hobbyId}/registrations/`)
                .remove();
            setRegister(false);
            Alert.alert('You´re already registered');
        } else if (!register) {
            //hvis brugeren er ikke tilmeldt, oprettes brugeren i begivenhedens registrations-attribut
            firebase
                .database()
                .ref(`/Hobbies/${hobbyId}/registrations/`)
                .push({user: user});
            setRegister(true);
            Alert.alert('Registration successful!');
        }
    }
    //opretter funktion som håndterer videredirigering til den rigtige stack screen for brugeren
    function handleSubmit(hobby, hobbyId) {
        if (isEditHobby) {
            navigation.navigate('Edit Event', { hobby, hobbyId });
        } else if (isOrganizedHobby) {
            navigation.navigate('Edit Organized', { hobby, hobbyId });
        }
    };
    //hvis hobby-objektet er tomt, returneres følgende view
    if (!hobby) {
        return (
            <Text>No available data</Text>
        );
    //hvis brugeren er arrangør på begivenheden returneres følgende view
    } else {
        if (hobby.organizer === user) {
            return (
                <SafeAreaView style = {{ paddingTop: 40 }}>
                    <Text style = { styles.header }>{ hobby.name }</Text>
                    <ScrollView>
                        {/*anvender scroll view, så brugeren kan rulle på siden*/}
                        <View style = { styles.container }>
                            <View style = { styles.row }>
                                <Text style = { styles.label }>Date</Text>
                                <Text style = { styles.value }>{ hobby.date }</Text>
                            </View>
                            <View style = { styles.row }>
                                <Text style = { styles.label }>Category</Text>
                                <Text style = { styles.value }>{ hobby.category }</Text>
                            </View>
                            <View style = { styles.row }>
                                <Text style = { styles.label }>Location</Text>
                                <Text style = { styles.value }>{ hobby.location }</Text>
                            </View>
                            <View style = { styles.row }>
                                <Text style = { styles.label }>Description</Text>
                                <Text style = { styles.value }>{ hobby.description }</Text>
                            </View>
                            <View style = { styles.row }>
                                <Text style = { styles.label }>Organizer</Text>
                                <Text style = { styles.value }>{ hobby.organizer }</Text>
                            </View>
                            {/*viser knap som navigerer brugeren til Edit Event*/}
                            <TouchableOpacity onPress = { () => { handleSubmit(hobby, hobbyId) } } style = {{
                                backgroundColor: 'seagreen',
                                margin: 10,
                                height: 40,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 150
                                }}>
                                <Text style = { styles.buttonText }>{ "Edit Event" }</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        //hvis brugeren er ikke er arrangør på begivenheden returneres følgende view
        } else {
            return (
                <SafeAreaView style = { { paddingTop: 40 }}>
                    <Text style = { styles.header }>{ hobby.name }</Text>
                    <ScrollView>
                        {/*anvender scroll view, så brugeren kan rulle på siden*/}
                        <View style = { styles.container }>
                            <View style = { styles.row }>
                                <Text style = { styles.label }>Date</Text>
                                <Text style = { styles.value }>{ hobby.date }</Text>
                            </View>
                            <View style = { styles.row }>
                                <Text style = { styles.label }>Category</Text>
                                <Text style = { styles.value }>{ hobby.category }</Text>
                            </View>
                            <View style = { styles.row }>
                                <Text style = { styles.label }>Location</Text>
                                <Text style = { styles.value }>{ hobby.location }</Text>
                            </View>
                            <View style = { styles.row }>
                                <Text style = { styles.label }>Description</Text>
                                <Text style = { styles.value }>{ hobby.description }</Text>
                            </View>
                            <View style = { styles.row }>
                                <Text style = { styles.label }>Organizer</Text>
                                <Text style = { styles.value }>{ hobby.organizer }</Text>
                            </View>
                            {/*viser knap som håndterer til- og afmelding af en bruger på en begivenhed*/}
                            <TouchableOpacity onPress = { () => { registerUser() }} style = {{
                                backgroundColor: register ? 'firebrick' : 'seagreen',
                                margin: 10,
                                height: 40,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 150
                            }}>
                                <Text style = { styles.buttonText }>{ register ? "Unregister" : "Register" }</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
}
//opretter funktion som håndterer visning af begivenheder, hvis brugeren ikke er logget ind
function GuestPage({ navigation, route }) {
    const [hobby, setHobby] = useState({});
    //useEffect køres når siden indlæses og sætter hobby-objektet
    useEffect(() => {
        setHobby(route.params.hobby[1]); //deklarerer begivenheden på baggrund af parametre fra forrige screen
        return () => {
            setHobby({}); //tømmer hobby-objektet når brugeren forlader view'et
        };
    });
    //hvis hobby-objektet er tomt returneres følgende view
    if (!hobby) {
        return (
            <Text>No available data</Text>
        );
    //hvis hobby-objektet ikke er tomt, returneres følgende view
    } else {
        return (
            <SafeAreaView>
                <ScrollView>
                    {/*anvender scroll view, så brugeren kan rulle på siden*/}
                    <View style = { styles.container }>
                        <View style = { styles.row }>
                            <Text style = { styles.label }>Name</Text>
                            <Text style = { styles.value }>{ hobby.name }</Text>
                        </View>
                        <View style = { styles.row }>
                            <Text style = { styles.label }>Date</Text>
                            <Text style = { styles.value }>{ hobby.date }</Text>
                        </View>
                        <View style = { styles.row }>
                            <Text style = { styles.label }>Category</Text>
                            <Text style = { styles.value }>{ hobby.category }</Text>
                        </View>
                        <View style = { styles.row }>
                            <Text style = { styles.label }>Location</Text>
                            <Text style = { styles.value }>{ hobby.location }</Text>
                        </View>
                        <View style = { styles.row }>
                            <Text style = { styles.label }>Description</Text>
                            <Text style = { styles.value }>{ hobby.description }</Text>
                        </View>
                        {/*viser knap som navigerer brugeren til Sign In*/}
                        <TouchableOpacity onPress = { () => navigation.navigate("Sign In") } style = {{
                            backgroundColor: 'seagreen',
                            margin: 10,
                            height: 40,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 150
                        }}>
                            <Text style = { styles.buttonText }>Sign in now to join!</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

//opretter funktion for komponenten som håndterer visning af begivenhedsdetaljer
export default function HobbyDetails ({ navigation, route }) {
    const [user, setUser] = useState({ loggedIn: false });
    const [register, setRegister] = useState (false);
    //opretter funktion som tjekker om brugeren er logget ind
    function onAuthStateChange(callback) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //hvis brugeren er logget ind, sættes loggedIn til true
                callback({loggedIn: true, user: user});
            } else {
                //hvis brugeren ikke er logget ind, sættes loggedIn til false
                callback({loggedIn: false});
            }
        })
    }
    //useEffect køres når siden indlæses og tjekker dermed om brugeren er logget ind
    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        };
    }, []);
    //indlæser views baseret på brugerens status
    return (
        user.loggedIn
            ? LoggedIn({route, register, setRegister})
            : GuestPage({navigation, route})
    );
};

//opretter stylesheet for komponenten
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', display: 'flex' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        alignSelf: 'center',
    },
    label: {
        width: 100,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    value: { flex: 1 },
    button: {
        margin: 10,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 12
    }
});