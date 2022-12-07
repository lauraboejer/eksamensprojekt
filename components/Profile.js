// Importerer React-elementer
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// Opretter og eksporterer Profile-funktionen, som er ment til at  returnere view'et for den aktuelle bruger
// ved ID-match i databasen. Eftersom brugerfunktionen endnu ikke er implementeret i applikationen, viser koden
// et statisk eksempel på et layout
export default function Profile({ navigation }) {
    return(
        <View style = { styles.container }>
            <Text style = { styles.name }>FirstName LastName</Text>
            {/* View til display af brugerinfo */}
            <View style = { styles.info }>
                <Text style = { { alignItems: 'center' } }> -  Info...</Text>
                <Text style = { { alignItems: 'center' } }> -  Info...</Text>
                <Text style = { { alignItems: 'center' } }> -  Info...</Text>
            </View>
            <Text style = { styles.interestText }>Interests</Text>
            {/* View til display af brugerens valgte interesser */}
            <View style = { styles.interests }>
                <Text style = { { alignItems: 'center' } }>Skiing</Text>
                <Text style = { { alignItems: 'center' } }>Knitting</Text>
                <Text style = { { alignItems: 'center' } }>Soccer</Text>
                {/* Returnerer knap for redigering af interesser. Eftersom funktionaliteten endnu ikke er
                implementeret, er der sat en navigaitonsreference til 'Edit Interests', men da denne ikke
                eksisterer endnu, sker der intet ved OnPress() */}
                <TouchableOpacity style = { styles.button1 } onPress = { () => navigation.navigate('Edit Interests')}>
                    <Text style = { styles.buttonText }>Edit Interests</Text>
                </TouchableOpacity>
            </View>
            {/* Returnerer knap for redigering af profilen. Eftersom funktionaliteten endnu ikke er
                implementeret, er der sat en navigaitonsreference til 'Edit Profile', men da denne ikke
                eksisterer endnu, sker der intet ved OnPress() */}
            <TouchableOpacity style = { styles.button2 } onPress = { () => navigation.navigate('Edit Profile')}>
                <Text style = { styles.buttonText }>Edit Profile</Text>
            </TouchableOpacity>
            {/* Returnerer knap for listevisning af tilmeldte events. Eftersom funktionaliteten endnu ikke er
                implementeret, er der sat en navigaitonsreference til 'Registered Events', men da denne ikke
                eksisterer endnu, sker der intet ved OnPress() */}
            <TouchableOpacity style = { styles.button2 } onPress = { () => navigation.navigate('Registered Events')}>
                <Text style = { styles.buttonText }>Registered Events</Text>
            </TouchableOpacity>
        </View>
    )
};

// Opretter stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 5
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 20,
        paddingBottom: 5
    },
    interestText: {
        fontSize: 15,
        fontWeight: "bold",
        paddingTop: 20
    },
    info: {
        width: '100%',
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 200,
        backgroundColor: 'lightgrey'
    },
    interests: {
        width: '100%',
        borderRadius:10,
        margin: 5,
        paddingTop: 10,
        height: 'auto',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 5,
        backgroundColor: 'mediumaquamarine'
    },
    button1: {
        margin: 10,
        height: 40,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150
    },
    button2: {
        margin: 10,
        height: 40,
        backgroundColor: 'cornflowerblue',
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