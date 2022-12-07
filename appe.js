// Importerer React-elementer
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {runOnJS} from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons"
import {useEffect} from "react";

// Importerer komponenter
// Idet EditProfile og RegisteredEvents endnu ikke er implementeret, er disse udkommentere
import HobbyList from "./components/HobbyList";
import HobbyDetails from "./components/HobbyDetails";
import AddEditHobby from "./components/AddEditHobby";
import Profile from "./components/Profile";
import SavedHobbies from "./components/SavedHobbies";
// import EditProfile from "./components/EditProfile";
// import RegisteredEvents from "./components/RegisteredHobbies";

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

function GuestPage(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Log in'} component={LogInScreen} />
                <Stack.Screen name={'Sign up'} component={SignUpScreen} />
                <Stack.Screen name={'Home'} component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default function App() {
    //Definerer bruger konstanter der har staten ikke logget ind
    const [user, setUser] = useState({ loggedIn: false });

    //
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
            ? <HomeScreen />
            : GuestPage
    )
}