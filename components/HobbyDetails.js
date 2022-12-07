//importerer React-elementer
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

//opretter og eksporterer HobbyDetails-funktionen, som returnerer view'et for den valgte hobbys detaljer fra databasen på IT-match
export default function HobbyDetails ({ route }) {
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
    }
    //all content
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
        <View style = {styles.container}>
            {
                Object.entries(hobby).map((item,index)=>{
                    return(
                        <View style = { styles.row } key = { index }>
                            {/*Vores car keys navn*/}
                            <Text style = { styles.label }>{ item[0] }</Text>
                            {/*Vores car values navne */}
                            <Text style = { styles.value }>{ item[1] }</Text>
                        </View>
                    )
                })
            }
            <TouchableOpacity onPress = { () => setRegister(!register)} style = { { backgroundColor: changeColor(), margin: 10, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: 150 } }>
                <Text style = { styles.buttonText }>{ register ? "Registered" : "Not Registered" }</Text>
            </TouchableOpacity>
            <View style = { { padding: 10 } }/>
        </View>
    );
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