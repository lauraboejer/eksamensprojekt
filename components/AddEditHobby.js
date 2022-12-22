//importerer React-elementer
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, TextInput, SafeAreaView, ScrollView, View, Alert, TouchableOpacity } from 'react-native';

//importerer Firebase-elementer
import firebase from 'firebase/compat';

//opretter funktion for komponenten som håndterer ændringer i og tilføjelser af begivenheder
export default function AddEditHobby ({ navigation, route }) {
    const organizer = firebase.auth().currentUser.email; //henter brugerens email
    const isEditHobby = route.name === "Edit Event" || "Edit Organized"; //definerer route som siden besøges fra
    const [hobbyId, setHobbyId] = useState();
    const initialState = { name: '', category: '', date: '', location: '', description: '' }; //definerer initialtilstand for begivenheder
    const [newHobby, setNewHobby] = useState(initialState);
    //useEffect køres når siden indlæses og tjekker hvorvidt brugeren ønsker at redigere begivenheden
    useEffect(() => {
        if(isEditHobby) {
            const hobby = route.params.hobby; //deklarerer begivenheden på baggrund af parametre fra forrige screen
            setNewHobby(hobby);
            const id = route.params.hobbyId; //deklarerer begivenhedens ID på baggrund af parametre fra forrige screen
            setHobbyId(id);
        }
        return () => {
            setNewHobby(initialState); //tømmer hobby-objektet når brugeren forlader view'et
        };
    }, []);
    //opretter funktion som håndterer sletning af en begivenhed i databasen
    const handleDelete = () => {
        try {
            //leder i databasen efter den aktuelle begivenhed gennem ID'et og sletter den
            firebase
                .database()
                .ref(`/Hobbies/${ hobbyId }`)
                .remove();
            navigation.pop(2); //navigerer brugeren tilbage til listen, når begivenheden er slettet
        } catch (error) {
            Alert.alert(error.message); //returnerer en fejlbesked, hvis noget går galt
        }
    };
    //opretter funktion som advarer brugeren inden sletning
    const confirmDelete = () => {
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete this event?', [
                { text: 'Cancel', style: 'cancel' }, //afbryder sletningen, hvis brugeren trykker 'Cancel'
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() }, //kalder slette-funktionen, hvis brugeren trykker 'Delete'
            ]);
        }
    };
    //opretter funktion som viser sletteknappen, hvis brugeren er i færd med at redigere begivenheden
    function DeleteHobby() {
        if (isEditHobby) {
            return(
                //viser knap som aktiverer confirmDelete-funktionen hvis den trykkes på
                <TouchableOpacity style = { styles.button2 } onPress = { () => confirmDelete() }>
                    <Text style = { styles.buttonText }>Delete event</Text>
                </TouchableOpacity>
            );
        }
    }
    //opretter funktion som ændrer state på newHobby ved et givent event change
    const changeTextInput = (name, event) => {
        setNewHobby({ ...newHobby, [name]: event });
    };
    //opretter funktion som håndterer ændringer i begivenheder i databasen
    const handleSave = () => {
        const { name, category, date, location, description } = newHobby;
        //tjekker om inputfelterne er tomme
        if (name.length === 0 || category.length === 0 || date.length === 0 || location.length === 0 || description.length === 0) {
            return (
                Alert.alert('One of the fields is empty') //returnerer en advarsel til brugeren, hvis et af felterne er tomme
            );
        //tjekker om brugeren er i færd med at ændre begivenheden
        } else if (isEditHobby) {
            try {
                //leder i databasen efter den aktuelle begivenhed gennem ID'et og opdaterer den
                firebase
                    .database()
                    .ref(`/Hobbies/${ hobbyId }`)
                    .update({ name, category, date, location, description});
                Alert.alert("Your event has been updated"); //giver brugeren besked om, at opdateringen har fundet sted
                const hobby = [hobbyId,newHobby];
                navigation.pop(2, {hobby}); //navigerer brugeren tilbage til begivenhedsprofilen sammen med det opdaterede hobby-objekt
            } catch (error) {
                console.log(`Error: ${ error.message }`);  //returnerer en fejlbesked i terminalen, hvis noget går galt
            }
        //opretter en ny begivenhed, hvis der ikke er tale om redigering
        } else {
            try {
                //opretter en ny begivenhed i databasen
                firebase
                    .database()
                    .ref('/Hobbies/')
                    .push({ name, category, date, location, description, organizer });
                Alert.alert(`Saved`); //giver brugeren besked om, at oprettelsen har fundet sted
                const hobby = [hobbyId, newHobby]
                navigation.navigate("Organized Events", { hobby }); //navigerer brugeren til overblikket over organiserede begivenheder sammen med det opdaterede hobby-objekt
                return setNewHobby(initialState);
            } catch (error) {
                console.log(`Error: ${ error.message }`); //returnerer en fejlbesked i terminalen, hvis noget går galt
            }
        }
    };
    //returnerer view'et for AddEditProfile-komponenten
    return (
        <SafeAreaView style = {{ paddingTop: 40 }}>
            <ScrollView>
                {/*anvender scroll view, så brugeren kan rulle på siden*/}
                <Text style = { styles.header }>{ isEditHobby ? "Edit Event" : "Add Event" }</Text>
                {/*ændrer overskriften alt efter om der er tale om oprettelse eller ændring*/}
                {
                    Object.keys(initialState).map((key, index) => {
                        {/*henter objekt keys for initialState*/}
                        return (
                            <View style = { styles.row } key = { index }>
                                {/*viser objekt keys baseret på initialState*/}
                                <Text style = { styles.label }>{ key }</Text>
                                {/*definerer tekstinput, som indeholder begivenhedsinformation, hvis der er tale om redigering*/}
                                <TextInput
                                    value = { newHobby[key] }
                                    onChangeText = { (event) => changeTextInput(key, event) }
                                    style = { styles.input }
                                />
                            </View>
                        );
                    })
                }
                <View style = {{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                    {/*viser knap som håndterer gem*/}
                    <TouchableOpacity style = { styles.button1 } onPress = { () => handleSave() }>
                        {/*ændrer knappens skrift alt efter om der er tale om redigering eller oprettelse*/}
                        <Text style = { styles.buttonText }>{ isEditHobby ? "Save changes" : "Add event" }</Text>
                    </TouchableOpacity>
                    {/*kalder sletteknappen*/}
                    <DeleteHobby/>
                </View>
                </ScrollView>
        </SafeAreaView>
    )
};

//opretter stylesheet for komponenten
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
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
        padding:5,
        flex: 1,
    },
    button1: {
        margin: 10,
        height: 40,
        backgroundColor: 'seagreen',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150
    },
    button2: {
        margin: 10,
        height: 40,
        backgroundColor: 'firebrick',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 12
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        alignSelf: 'center',
    },
});