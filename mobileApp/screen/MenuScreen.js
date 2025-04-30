import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../actions/authActions";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function MenuScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user.user);
  const authenticated = useSelector((state) => state.user.authenticated);

  useEffect(() => {
    if (loading === true) {
      Toast.show({
        type: "info",
        text1: "Loading...",
        visibilityTime: 0,
        autoHide: false,
      });
    } else if (loading === false) {
      Toast.hide();
    }
  }, [loading]);

  const logOut = () => {
    dispatch(signout());
  };

  return (
    <>
      <View style={styles.header}>
        {authenticated ? (
          <>
            <Text style={styles.profileText}>{user.name}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
              <Ionicons name="log-out-outline" size={24} color="#6200ee" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.profileText}>Guest</Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Ionicons name="log-out-outline" size={24} color="#6200ee" />

              <Text style={styles.logoutText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <ScrollView style={styles.container}>
        {/* Menu Items with Icons */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home-outline" size={20} color="#6200ee" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Appointments")}
        >
          <Ionicons name="calendar-outline" size={20} color="#6200ee" />
          <Text style={styles.menuText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Doctors")}
        >
          <Ionicons name="medkit-outline" size={20} color="#6200ee" />
          <Text style={styles.menuText}>Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons name="call-outline" size={20} color="#6200ee" />
          <Text style={styles.menuText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#6200ee"
          />
          <Text style={styles.menuText}>About Us</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 120,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  profileText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6200ee",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#6200ee",
    marginLeft: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
  },
});
