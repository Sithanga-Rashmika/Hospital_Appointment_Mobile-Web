import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={require("../assets/hero.jpg")}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>WELCOME TO MediConnect</Text>
            <Text style={styles.heroSubtitle}>Your Health, Our Priority</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Our Services</Text>

          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigation.navigate("Appointment")}
          >
            <Image
              source={require("../assets/calander.png")}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceText}>Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            <Image
              source={require("../assets/doc.png")}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceText}>Medical History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            <Image
              source={require("../assets/card.png")}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceText}>Health Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            <Image
              source={require("../assets/paid.png")}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceText}>Payments</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 2,
  },
  logo: {
    width: 200,
    height: 150,
    marginRight: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  heroSection: {
    width: "100%",
    height: 250,
    position: "relative",
    backgroundColor: "#f5f5f5",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroTextContainer: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  serviceItem: {
    width: "90%",
    height: 150,
    backgroundColor: "#E0F7FA",
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceIcon: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
});
