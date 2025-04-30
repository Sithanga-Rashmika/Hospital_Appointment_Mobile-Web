import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { SignUp } from "../actions/authActions";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const navigation = useNavigation(); // For navigation between screens

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    if (loading) {
      Toast.show({
        type: "info",
        text1: "Loading...",
        autoHide: false,
      });
    } else {
      Toast.hide();
    }
  }, [loading]);

  const formSubmit = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (name === "") {
      Toast.show({
        type: "error",
        text1: "Please Provide a Name..!",
      });
    } else if (address === "") {
      Toast.show({
        type: "error",
        text1: "Please Provide an Address..!",
      });
    } else if (email === "") {
      Toast.show({
        type: "error",
        text1: "Please Provide an Email..!",
      });
    } else if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Please Provide a Valid Email..!",
      });
    } else if (contact === "") {
      Toast.show({
        type: "error",
        text1: "Please Provide a Mobile Number..!",
      });
    } else if (!phoneRegex.test(contact)) {
      Toast.show({
        type: "error",
        text1: "Please Provide a Valid 10-Digit Mobile Number..!",
      });
    } else if (pwd === "") {
      Toast.show({
        type: "error",
        text1: "Please Provide a Password..!",
      });
    } else {
      const form = {
        name: name,
        mobileNo: contact,
        address: address,
        email: email,
        password: pwd,
      };

      dispatch(SignUp(form));
      setName("");
      setContact("");
      setAddress("");
      setEmail("");
      setPwd("");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/logo2.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact No"
        value={contact}
        onChangeText={(text) => setContact(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={pwd}
        onChangeText={(text) => setPwd(text)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={formSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.registerText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: "80%",
    height: 50,
    marginBottom: 30,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
  registerText: {
    fontSize: 14,
    color: "#1E90FF",
    marginLeft: 5,
  },
});
