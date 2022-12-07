//importerer React-elementer
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import firebase from "firebase/compat";
import {useRoute} from "@react-navigation/native";

function LoggedIn({route}) {
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
        const [register, setRegister] = useState(false);
        function changeColor() {
            if(!register) {
                return(
                    'firebrick'
                );
            } else {
                return(
                    'seagreen'
                );
            }
        }
        return (
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
                <TouchableOpacity onPress={() => setRegister(!register)} style={{
                    backgroundColor: changeColor(),
                    margin: 10,
                    height: 40,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 150
                }}>
                    <Text style={styles.buttonText}>{register ? "Registered" : "Not Registered"}</Text>
                </TouchableOpacity>
                <View style={{padding: 10}}/>
            </View>
        );
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