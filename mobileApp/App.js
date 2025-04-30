import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import store from "./stores/index";
import { Provider, useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { isLoggedIn } from "./actions/authActions";

import HomeScreen from "./screen/HomeScreen";
import MenuScreen from "./screen/MenuScreen";
import DoctorsScreen from "./screen/DoctorScreen";
import AppointmentScreen from "./screen/AppointmentScreen";
import DoctorsScreens from "./screen/DoctorScreen";
import AppointmentScreens from "./screen/AppointmentScreen";
import Login from "./screen/login";
import Register from "./screen/register";

// Create a stack navigator
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// Home Stack for Home and Appointment screens
function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Doctors"
        component={DoctorsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppContent() {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.authenticated);

  useEffect(() => {
    if (!authenticated) {
      dispatch(isLoggedIn());
    }
  }, [authenticated, dispatch]);

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#6200ee"
          inactiveColor="#828282"
          barStyle={{ backgroundColor: "#fff" }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = "home-outline";
              } else if (route.name === "Menu") {
                iconName = "menu-outline";
              } else if (route.name === "Appointments") {
                iconName = "calendar-outline";
              } else if (route.name === "Doctors") {
                iconName = "medkit-outline";
              }
              return <Ionicons name={iconName} size={24} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Appointments" component={AppointmentScreens} />
          <Tab.Screen name="Doctors" component={DoctorsScreens} />
          <Tab.Screen name="Menu" component={MenuScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
