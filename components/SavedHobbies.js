// Importerer React-elementer
import React, { useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SavedHobbies() {
    const [search, updateSearch] = useState('');
    return (
        <SafeAreaView>
            <View>
                <Text style = { styles.header }>Saved Events</Text>
                <SearchBar placeholder = "Type Here..." onChangeText = { updateSearch } value = { search } lightTheme = 'false'/>
            </View>
            <ScrollView>
                <TouchableOpacity style = { styles.hobby }>
                    <Text style = {{ fontWeight: 'bold' }}>Saved Event 1</Text>
                    <TouchableOpacity style = {{ alignItems: 'flex-end' }} onPress = { () => {} }>
                        <Ionicons name = "heart" size = { 25 }/>
                    </TouchableOpacity>
                    <Text>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style = { styles.hobby }>
                    <Text style = {{ fontWeight: 'bold' }}>Saved Event 2</Text>
                    <TouchableOpacity style = { { alignItems: 'flex-end' } } onPress = { () => { } }>
                        <Ionicons name = "heart" size = { 25 }/>
                    </TouchableOpacity>
                    <Text>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style = { styles.hobby }>
                    <Text style = {{ fontWeight: 'bold' }}>Saved Event 3</Text>
                    <TouchableOpacity style = {{ alignItems: 'flex-end' }} onPress = { () => {} }>
                        <Ionicons name = "heart" size = { 25 }/>
                    </TouchableOpacity>
                    <Text>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style = { styles.hobby }>
                    <Text style = {{ fontWeight: 'bold' }}>Saved Event 4</Text>
                    <TouchableOpacity style = {{ alignItems: 'flex-end' }} onPress = { () => {} }>
                        <Ionicons name = "heart" size = { 25 }/>
                    </TouchableOpacity>
                    <Text>Date</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingLeft: 5
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        alignSelf: 'center',
    },
    hobby: {
        width: '96%',
        backgroundColor: 'teal',
        borderRadius: 10,
        margin: 5,
        padding: 5,
        height: 70,
        alignSelf: 'center',
    },
})