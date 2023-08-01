import { StatusBar } from "expo-status-bar";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { SafeAreaView } from "react-native-safe-area-context";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContextProvider } from "./Context/AuthContext";
import { LanguageContextProvider } from "./Context/LanguageSetContext";
import CreateFlipCards from "./screens/CreateFlipCards";
import CreateScreen from "./screens/CreateScreen";
import FlipCardsViewer from "./screens/FlipCardsViewer";
import LanguageScreen from "./screens/LanguageScreen";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import SignInScreen from "./screens/SignInScreen";
import UserScreen from "./screens/UserScreen";
import { useAuthContext } from "./util/useAuthContext";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFCcktCSx1UFusE79oPSCgDsvR1jQdDjo",
  authDomain: "learning-app-c8811.firebaseapp.com",
  databaseURL: "https://learning-app-c8811-default-rtdb.firebaseio.com",
  projectId: "learning-app-c8811",
  storageBucket: "learning-app-c8811.appspot.com",
  messagingSenderId: "129442315236",
  appId: "1:129442315236:web:4f20829baff5079eb3a5f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#003049" },
        tabBarInactiveBackgroundColor: "#3a86ff",
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "#001d3d",
        headerStyle: {
          backgroundColor: "#3a86ff",
        },
        headerTintColor: "white",
      }}
    >
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: "All Languages",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="folder-open" />
          ),
          headerRight: () => (
            <Ionicons
              name="language"
              size={32}
              color="white"
              style={{ marginRight: 8 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          title: "User Panel",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="person-circle" />
          ),
        }}
      />

      <Tab.Screen
        name="CreateLanguage"
        component={CreateScreen}
        options={{
          title: "Create Language-set",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="add-circle" size={size} />
          ),
          headerRight: () => (
            <Ionicons
              name="add-circle"
              size={32}
              style={{ fontWeight: "900", marginRight: 8 }}
              color="white"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function Navigation() {
  const { user, isAuthenticated } = useAuthContext();

  return user ? (
    <Stack.Navigator
      screenOptions={{
        initialRouteName: "BottomNavigation",
        contentStyle: { backgroundColor: "#003049" },
        headerStyle: {
          backgroundColor: "#3a86ff",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        component={BottomNavigation}
        name="BottomNavigation"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />

      <Stack.Screen name="CreateFlipcards" component={CreateFlipCards} />

      <Stack.Screen name="FlipCardsViewer" component={FlipCardsViewer} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#003049" },
        headerStyle: {
          backgroundColor: "#3a86ff",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="SignUpScreen"
        component={SignInScreen}
        options={{
          title: "Sign Up to Flipcardio !",
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: "Log in to Flipcardio !",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <LanguageContextProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </SafeAreaView>
        </LanguageContextProvider>
      </AuthContextProvider>
    </>
  );
}
