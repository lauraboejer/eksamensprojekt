//importerer React-elementer
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { runOnJS } from "react-native-reanimated";

//importerer komponenter
import HobbyList from "./components/HobbyList";
import HobbyDetails from "./components/HobbyDetails";
import AddEditHobby from "./components/AddEditHobby";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EditInterests from "./components/EditInterests";
import EditProfile from "./components/EditProfile";
import RegisteredHobbies from "./components/RegisteredHobbies";
import OrganizedHobbies from "./components/OrganizedHobbies";

//importerer Firebase-elementer
import firebase from "firebase/compat";

//konfigurering af Firebase Realtime Database
const firebaseConfig = {
    apiKey: "AIzaSyCIjQFfPNmoZ9UYLC0kz-w5d6FQfj5u67c",
    authDomain: "gkopg1-9b5fa.firebaseapp.com",
    projectId: "gkopg1-9b5fa",
    storageBucket: "gkopg1-9b5fa.appspot.com",
    messagingSenderId: "434585776012",
    appId: "1:434585776012:web:3a8eb09c3d5fd7636630a9",
    databaseURL: "https://gkopg1-9b5fa-default-rtdb.europe-west1.firebasedatabase.app/"
};

//initierer Firebase-applikationen
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

//deklarerer navigationselementer
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = runOnJS(createDrawerNavigator());

//opretter funktion som returnerer stack navigation for event-listen
function ExploreEventsNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Event List" component = { HobbyList } options = {{ headerShown: null }}/>
            <Stack.Screen name = "Event Details" component = { HobbyDetails } options = {{ headerShown: null }}/>
            <Stack.Screen name = "Edit Event" component = { AddEditHobby } options = {{ headerShown: null }}/>
        </Stack.Navigator>
    );
}

//opretter funktion som returnerer stack navigation for registrerede events
function RegisteredEventsNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Registered List" component = { RegisteredHobbies } options = {{ headerShown: null }}/>
            <Stack.Screen name = "Registered Details" component = { HobbyDetails } options = {{ headerShown: null }}/>
        </Stack.Navigator>
    );
}

//opretter funktion som returnerer stack navigation for egne organiserede events
function OrganizedEventsNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Organized List" component = { OrganizedHobbies } options = {{ headerShown: null }}/>
            <Stack.Screen name = "Organized Details" component = { HobbyDetails } options = {{ headerShown: null }}/>
            <Stack.Screen name = "Edit Organized" component = { AddEditHobby } options = {{ headerShown: null }}/>
        </Stack.Navigator>
    );
}

//opretter funktion som returnerer stack navigation for profilsiden
function ProfileNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Profile" component = { Profile } options = {{ headerShown: null }}/>
            <Stack.Screen name = "Edit Interests" component = { EditInterests } options = {{ headerShown: null }}/>
            <Stack.Screen name = "Edit Profile" component = { EditProfile } options = {{ headerShown: null }}/>
            <Stack.Screen name = "Organized Events" component = { OrganizedEventsNavigator } options = {{ headerShown: null }}/>
        </Stack.Navigator>
    );
}

//opretter funktion som returnerer tab navigation i bunden af applikationen for brugere der er logget ind
function TabNavigator() {
    return(
        <Tab.Navigator>
            <Tab.Screen name = "Explore Events" component = { ExploreEventsNavigator } options = {{
                tabBarIcon: () => (
                    <Ionicons name = "globe" size = { 20 }/> //definerer ikon for tab-siden
                ), headerShown: null
            }}/>
            <Tab.Screen name = "Registered Events" component = { RegisteredEventsNavigator } options = {{
                tabBarIcon: () => (
                    <Ionicons name = "heart" size = { 20 }/> //definerer ikon for tab-siden
                ), headerShown: null
            }}/>
            <Tab.Screen name = "My Profile" component = { ProfileNavigator } options = {{
                tabBarIcon: () => (
                    <Ionicons name = "person" size = { 20 }/> //definerer ikon for tab-siden
                ), headerShown: null
            }}/>
            <Tab.Screen name = "Add Event" component = { AddEditHobby } options = {{
                tabBarIcon: () => (
                    <Ionicons name = "add" size = { 20 }/> //definerer ikon for tab-siden
                ), headerShown: null
            }}/>
        </Tab.Navigator>
    );
}

//opretter funktion som samler navigation container for brugere som er logget ind, inklusive drawer navigation
function LoggedIn() {
    return(
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name = {'All Events'} component = { TabNavigator } options = {{
                    headerShown: true, headerTransparent: true, headerTitleStyle: { color: 'transparent' }
                }}/>
                 <Drawer.Screen name = { "My Profile" } component = { ProfileNavigator } options = {{
                    headerShown: true, headerTransparent: true, headerTitleStyle: { color: 'transparent' }
                }}/>
                <Drawer.Screen name = { "My Registered Events" } component = { RegisteredEventsNavigator } options = {{
                    headerShown: true, headerTransparent: true, headerTitleStyle: { color: 'transparent' }
                }}/>
                <Drawer.Screen name = { "My Organized Events" } component = { OrganizedEventsNavigator } options = {{
                    headerShown: true, headerTransparent: true, headerTitleStyle: { color: 'transparent' }
                }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

//opretter gæsteside-funktion som samler navigation container for brugere som ikke er logget ind
function GuestPage() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name = "Explore Events" component = { ExploreEventsNavigator } options = {{
                    tabBarIcon: () => (
                        <Ionicons name = "globe" size = { 20 }/> //definerer ikon for tab-siden
                    ), headerShown: false
                }}/>
                <Tab.Screen name={ "Sign In"} component = { SignIn } options = {{
                    tabBarIcon: () => (
                        <Ionicons name = "person" size = { 20 }/> //definerer ikon for tab-siden
                    ), headerShown: null
                }}/>
                <Tab.Screen name={"Sign Up"} component = { SignUp } options = { {
                    tabBarIcon: () => (
                        <Ionicons name = "add" size = { 20 }/> //definerer ikon for tab-siden
                    ), headerShown: null
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

//opretter applikationsfunktion som tjekker om brugeren er logget ind og returnerer views på baggrund heraf
export default  function App() {
    const [user, setUser] = useState({ loggedIn: false });
    //tjekker autorisation i Firebase Authentification-databasen
    function onAuthStateChange(callback) {
        return (
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    //hvis brugeren er logget ind, sættes loggedIn til true
                    callback({ loggedIn: true, user: user });
                } else {
                    //hvis brugeren ikke er logget ind, sættes loggedIn til false
                    callback({ loggedIn: false });
                }
            })
        );
    }
    //useEffect køres når siden indlæses og tjekker dermed om brugeren er logget ind
    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        };
    }, []);
    //indlæser views baseret på brugerens tilstand
    return (
        user.loggedIn
            ? LoggedIn()
            : GuestPage()
    );
};