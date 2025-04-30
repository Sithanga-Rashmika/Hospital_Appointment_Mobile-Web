import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  fetchAppointment,
  deleteAppointment,
} from "../actions/appointmentAction";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

export default function AppointmentsScreen({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.appointment.loading);
  const user = useSelector((state) => state.user.user);
  const appointments = useSelector((state) => state.appointment.appointments);

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

  useEffect(() => {
    if (user && user.email) {
      const form = {
        email: user.email,
      };
      dispatch(fetchAppointment(form));
    }
  }, [user, dispatch]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredAppointments = appointments.filter(
    (item) =>
      item.AID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobileNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.id}</Text>
      <Text style={styles.tableCell}>{item.AID}</Text>
      <Text style={styles.tableCell}>{item.userName}</Text>
      <Text style={styles.tableCell}>{item.mobileNo}</Text>
      <Text style={styles.tableCell}>{item.doctorName}</Text>
      <Text style={styles.tableCell}>{item.hospital}</Text>
      <Text style={styles.tableCell}>
        {new Date(item.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </Text>
      <Text style={styles.tableCell}>{item.number}</Text>
      <View style={styles.actionsCell}>
        <TouchableOpacity onPress={() => Appointmentdelete(item)}>
          <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );



  const Appointmentdelete = (data) => {
    const form = {
      AID: data.AID,
      AddID: data.AddID,
      email: user.email,
    };
  
    Alert.alert(
      "Delete Appointment", 
      "Are you sure you want to delete this appointment?", 
      [
        {
          text: "No", 
          onPress: () => console.log("Deletion cancelled"), 
          style: "cancel", 
        },
        {
          text: "Yes", 
          onPress: async () => {
            dispatch(deleteAppointment(form));
          },
          style: "destructive", 
        },
      ],
      { cancelable: true }
    );
  };



  return (
    <>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require("../assets/logo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Appointments Table with Horizontal Scroll */}
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>AID</Text>
            <Text style={styles.tableHeaderCell}>Name</Text>
            <Text style={styles.tableHeaderCell}>Mobile No</Text>
            <Text style={styles.tableHeaderCell}>Doctor</Text>
            <Text style={styles.tableHeaderCell}>Hospital</Text>
            <Text style={styles.tableHeaderCell}>Date</Text>
            <Text style={styles.tableHeaderCell}>Number</Text>
            <Text style={styles.tableHeaderCell}>Actions</Text>
          </View>

          <FlatList
            data={filteredAppointments}
            renderItem={renderAppointmentItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>

      {/* Make New Appointment Button */}
      <TouchableOpacity
        style={styles.newAppointmentButton}
        onPress={() => navigation.navigate("Doctors")}
      >
        <Text style={styles.newAppointmentButtonText}>
          + Make New Appointment
        </Text>
      </TouchableOpacity>
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
  },
  logo: {
    width: 200,
    height: 150,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tableContainer: {
    flex: 1,
    padding: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#333",
    paddingVertical: 10,
    marginBottom: 10,
    minWidth: 800, // Set min width for horizontal scroll
  },
  tableHeaderCell: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    minWidth: 800, // Set min width for horizontal scroll
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  actionsCell: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 1,
  },
  newAppointmentButton: {
    backgroundColor: "#fdd835",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 20,
  },
  newAppointmentButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
