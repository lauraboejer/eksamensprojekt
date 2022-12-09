
// Importerer React-elementer
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {runOnJS} from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons"
import {useEffect, useState} from "react";

// Importerer komponenter
// Idet EditProfile og RegisteredEvents endnu ikke er implementeret, er disse udkommentere
import HobbyList from "./components/HobbyList";
import HobbyDetails from "./components/HobbyDetails";
import AddEditHobby from "./components/AddEditHobby";
import Profile from "./components/Profile";
import SavedHobbies from "./components/SavedHobbies";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EditInterests from "./components/EditInterests";
// import EditProfile from "./components/EditProfile";
import RegisteredHobbies from "./components/RegisteredHobbies";

// Importerer Firebase-elementer
import firebase from "firebase/compat";

// Konfigurering af Firebase-databasen
const firebaseConfig = {
    apiKey: "AIzaSyCIjQFfPNmoZ9UYLC0kz-w5d6FQfj5u67c",
    authDomain: "gkopg1-9b5fa.firebaseapp.com",
    projectId: "gkopg1-9b5fa",
    storageBucket: "gkopg1-9b5fa.appspot.com",
    messagingSenderId: "434585776012",
    appId: "1:434585776012:web:3a8eb09c3d5fd7636630a9",
    databaseURL: "https://gkopg1-9b5fa-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initierer Firebase-applikation
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Deklarerer navigationselementer
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = runOnJS(createDrawerNavigator());

// Opretter ExploreEventsNavigator-funktion, som returnerer stack-screens for liste af events og event-detaljer
function ExploreEventsNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Event List" component = { HobbyList }options={{headerShown: null}}/>
            <Stack.Screen name = "Event Details" component = { HobbyDetails }options={{headerShown: null}}/>
            <Stack.Screen name = "Edit Event" component={ AddEditHobby } options={{headerShown: null}}/>
            <Stack.Screen name = "Registered Events" component={RegisteredHobbies} options={{headerShown:null}}/>
        </Stack.Navigator>
    );
}

// Opretter ProfileNavigator-funktion, som returnerer stack-screens profil-detaljer, rediger profil og tilmeldte events
function ProfileNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Profile" component = { Profile }options={{headerShown: null}}/>
            <Stack.Screen name = "Edit Interests" component = { EditInterests }/>
            {/*disse to screens er endnu ikke implementerede, hvorfor de er udkommenteret*/}
            {/*<Stack.Screen name = "Edit Profile" component = { EditProfile }/>*/}
            {/*<Stack.Screen name = "Registered Events" component = { RegisteredEvents }/>*/}
        </Stack.Navigator>
    );
}

// Opretter SavedEventsNavigator-funktion, som returnerer stack-screens for liste af gemte events og event-detaljer
function SavedEventsNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name = "My Saved Events" component = { SavedHobbies } options={{headerShown: null}}/>
            <Stack.Screen name = "Saved Event Details" component = { HobbyDetails} options={{headerShown: null}}/>
        </Stack.Navigator>
    );
}

function TabNavigator() {
    return(
        <Tab.Navigator>
            <Tab.Screen name = "Explore Events" component = { ExploreEventsNavigator } options = { { tabBarIcon: () => (
                    <Ionicons name = "globe" size = { 20 }/>), headerShown: null } }/>
            <Tab.Screen name = "Saved Events" component = { SavedEventsNavigator } options = { { tabBarIcon: () => (
                    <Ionicons name = "heart" size = { 20 }/>), headerShown: null } }/>
            <Tab.Screen name = "My Profile" component = { ProfileNavigator } options = { { tabBarIcon: () => (
                    <Ionicons name = "person" size = { 20 }/>), headerShown: null } }/>
            <Tab.Screen name = "Add Event" component = { AddEditHobby } options = { { tabBarIcon: () => (
                    <Ionicons name = "add" size = { 20 }/>), headerShown: null } }/>
        </Tab.Navigator>
    )
}

// Opretter App-funktion, som returnerer de forskellige tab-screens i bunden af applikationen
function LoggedIn() {
    return(
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name={"All Events"} component={TabNavigator} options = { { tabBarIcon: () => (
                        <Ionicons name = "globe" size = { 20 }/>), headerShown: true, headerTransparent: true, headerTitleStyle: {
                        color: 'transparent'
                    } } }/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

function GuestPage() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name = "Explore Events" component = { ExploreEventsNavigator } options = { { tabBarIcon: () => (
                        <Ionicons name = "globe" size = { 20 }/>), headerShown: false } }/>
                <Tab.Screen name={ "Sign In"} component={SignIn}options = { { tabBarIcon: () => (
                        <Ionicons name = "globe" size = { 20 }/>), headerShown: null } }/>
                <Tab.Screen name={"Sign Up"} component={SignUp}options = { { tabBarIcon: () => (
                        <Ionicons name = "globe" size = { 20 }/>), headerShown: null } }/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default function App() {
    //Definerer bruger konstanter der har staten ikke logget ind
    const [user, setUser] = useState({ loggedIn: false });
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

    //Tjekker om brugerens status er ændret til at være logged ind
    //Hvis brugerens status er ændret kommer brugeren ind til HomeScreen, hvis ikke bliver de på guestPage
    return(
        user.loggedIn
            ? LoggedIn()
            : GuestPage()
    )
}


