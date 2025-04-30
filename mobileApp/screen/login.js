import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Logins } from "../actions/authActions";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const authenticated = useSelector((state) => state.user.authenticated);
  const navigation = useNavigation(); // For navigating between screens

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
    if (email === "") {
      Toast.show({
        type: "error",
        text1: "Please Provide An Email..!",
      });
    } else if (pwd === "") {
      Toast.show({
        type: "error",
        text1: "Please Provide the Password..!",
      });
    } else {
      const form = {
        email: email,
        password: pwd,
      };

      dispatch(Logins(form));
      setEmail("");
      setPwd("");
    }
  };

  useEffect(() => {
    if (authenticated) {
      navigation.navigate("Home");
    }
  }, [authenticated]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo2.png")} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Email address"
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

      <View style={styles.rememberContainer}>
        <Text style={styles.rememberText}>Remember me</Text>

        <Text style={styles.forgotText}>Forgot password?</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={formSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Not a member?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  rememberText: {
    fontSize: 14,
    color: "#333",
  },
  forgotText: {
    fontSize: 14,
    color: "#1E90FF",
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
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
