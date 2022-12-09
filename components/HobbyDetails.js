//importerer React-elementer
import firebase from "firebase/compat";
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert} from 'react-native';
import {useNavigation} from "@react-navigation/native";

function LoggedIn({route}) {
    const navigation = useNavigation()
    const user = firebase.auth().currentUser.email
    const [hobby, setHobby] = useState({});
    const hobbyId = route.params.hobby[0];

    useEffect(() => {
            setHobby(route.params.hobby[1])
            /*Når vi forlader screen, tøm object*/
            return () => {
                setHobby({})
            }
    });

    console.log('registereret' + hobbyId)
    function RegisterUser() {
        try {
             firebase
                .database()
                .ref(`/Hobbies/${hobbyId}/registrations/`)
                .once('value', snapshot => {
                    if (snapshot.exists() == false || snapshot.val() == null) {
                        firebase
                            .database()
                            .ref(`/Hobbies/${hobbyId}/registrations/`)
                            .push({user: user})
                        Alert.alert('Registration successful!')
                    } else {
                        let i;
                        for (i in Object.values(snapshot.val())) {

                            if (Object.values(snapshot.val())[i].user == user) {
                                console.log(user)
                                console.log(Object.values(snapshot.val())[i].user == user)
                                Alert.alert('You´re already registered')
                            } else {
                                firebase
                                    .database()
                                    .ref(`/Hobbies/${hobbyId}/registrations/`)
                                    .push({user: user})
                                Alert.alert('Registration successful!')
                            }
                        }
                    }
                })
        } catch (error) {
            throw error;
        }
    };

    if (!hobby) {
        return <Text>No data</Text>;
    } else {
        if (hobby.organizer === user) {
            return (
                <SafeAreaView>
                    <Text style = { styles.header }>{hobby.name}</Text>
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Date</Text>
                                {/*Vores car values navne */}
                                <Text style={styles.value}>{hobby.date}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Category</Text>
                                {/*Vores car values navne */}
                                <Text style={styles.value}>{hobby.category}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Location</Text>
                                {/*Vores car values navne */}
                                <Text style={styles.value}>{hobby.location}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Description</Text>
                                {/*Vores car values navne */}
                                <Text style={styles.value}>{hobby.description}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Organizer</Text>
                                {/*Vores car values navne */}
                                <Text style={styles.value}>{hobby.organizer}</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate("Edit Event", {hobby, hobbyId})} style={{
                                backgroundColor: 'seagreen',
                                margin: 10,
                                height: 40,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 150
                                }}>
                                <Text style={styles.buttonText}>{"Edit event"}</Text>
                            </TouchableOpacity>
                        <View style={{padding: 10}}/>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )
        } else {
            return (
                <SafeAreaView>
                    <Text style = { styles.header }>{hobby.name}</Text>
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Date</Text>
                                {/*Vores car values navne */}
                                <Text style={styles.value}>{hobby.date}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Category</Text>
                                {/*Vores car values navne */}
                                <Text style={styles.value}>{hobby.category}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Location</Text>
                                {/*Vores car values navne */}
                                <Text style={styles.value}>{hobby.location}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Description</Text>
                                {/*Vores car values navne */}
                                <Text style={styles.value}>{hobby.description}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Organizer</Text>
                                {/*Vores car values navne */}
                                <Text style={styles.value}>{hobby.organizer}</Text>
                            </View>
                            <TouchableOpacity onPress={()=>{RegisterUser()}} style={{
                                backgroundColor: 'seagreen',
                                margin: 10,
                                height: 40,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 150
                            }}>
                                <Text style={styles.buttonText}>{ "Register"+"Unregister"}</Text>
                            </TouchableOpacity>
                            <View style={{padding: 10}}/>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )
        }
    }
};

//Definerer bruger konstanter der har staten ikke logget ind
function GuestPage({navigation, route}) {
    const [hobby, setHobby] = useState({});
    useEffect(() => {
        /*Henter car values og sætter dem*/
        if (route.params.savedHobby) {
            setHobby(route.params.savedHobby[1])
            /*Når vi forlader screen, tøm object*/
            return () => {
                setHobby({})
            }
        } else {
            /*Henter car values og sætter dem*/
            setHobby(route.params.hobby[1]);
            /*Når vi forlader screen, tøm object*/
            return () => {
                setHobby({})
            }
        }
    });
    if (!hobby) {
        return <Text>No data</Text>;
    } else {
        return (
            <SafeAreaView>
                <ScrollView>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.label}>Name</Text>
                    {/*Vores car values navne */}
                    <Text style={styles.value}>{hobby.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Date</Text>
                    {/*Vores car values navne */}
                    <Text style={styles.value}>{hobby.date}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Category</Text>
                    {/*Vores car values navne */}
                    <Text style={styles.value}>{hobby.category}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Location</Text>
                    {/*Vores car values navne */}
                    <Text style={styles.value}>{hobby.location}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Description</Text>
                    {/*Vores car values navne */}
                    <Text style={styles.value}>{hobby.description}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Sign In")} style={{
                    backgroundColor: 'seagreen',
                    margin: 10,
                    height: 40,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 150
                }}>
                    <Text style={styles.buttonText}>{"Sign up now to join!"}</Text>
                </TouchableOpacity>
                <View style={{padding: 10}}/>
            </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

//opretter og eksporterer HobbyDetails-funktionen, som returnerer view'et for den valgte hobbys detaljer fra databasen på IT-match
export default function HobbyDetails ({ navigation, route }) {
    const [user, setUser] = useState({loggedIn: false});

    function onAuthStateChange(callback) {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback({loggedIn: true, user: user});
            } else {
                callback({loggedIn: false});
            }
        });
    }

    //funktion der træder i kræft med det samme siden loader
    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        };
    }, []);
    //Tjekker om brugerens status er ændret til at være logged ind//Hvis brugerens status er ændret kommer brugeren ind til HomeScreen, hvis ikke bliver de på guestPage
    return (
        user.loggedIn
            ? LoggedIn({route})
            : GuestPage({navigation, route})
    )
};

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