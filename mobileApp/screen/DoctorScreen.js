import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { fetchData } from "../actions/dataAction";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { newAppointment } from "../actions/appointmentAction";

export default function DoctorsScreen({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.details.loading);
  const loading2 = useSelector((state) => state.appointment.loading);
  const adds = useSelector((state) => state.details.adds);
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

  useEffect(() => {
    if (loading2 === true) {
      Toast.show({
        type: "info",
        text1: "Loading...",
        visibilityTime: 0,
        autoHide: false,
      });
    } else if (loading2 === false) {
      Toast.hide();
    }
  }, [loading2]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const [filteredResults, setFilteredResults] = useState([]);
  const [type, setType] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [date, setDate] = useState("");

  const [typeOpen, setTypeOpen] = useState(false);
  const [doctorOpen, setDoctorOpen] = useState(false);
  const [hospitalOpen, setHospitalOpen] = useState(false);

  const [typeOptions, setTypeOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [hospitalOptions, setHospitalOptions] = useState([]);

  useEffect(() => {
    if (adds && adds.length > 0) {
      const uniqueTypes = Array.from(
        new Set(adds.map((item) => item.specialization))
      ).map((type) => ({ label: type, value: type }));

      const uniqueDoctors = Array.from(
        new Set(adds.map((item) => item.doctorName))
      ).map((doctor) => ({ label: doctor, value: doctor }));

      const uniqueHospitals = Array.from(
        new Set(adds.map((item) => item.hospital))
      ).map((hospital) => ({ label: hospital, value: hospital }));

      setTypeOptions(uniqueTypes);
      setDoctorOptions(uniqueDoctors);
      setHospitalOptions(uniqueHospitals);
      setFilteredResults(adds);
    }
  }, [adds]);

  const handleSearch = () => {
    const filtered = adds.filter((item) => {
      const typeMatch = type ? item.specialization === type : true;
      const doctorMatch = doctor ? item.doctorName === doctor : true;
      const hospitalMatch = hospital ? item.hospital === hospital : true;
      const dateMatch = date ? item.date === date : true;
      return typeMatch && doctorMatch && hospitalMatch && dateMatch;
    });
    setFilteredResults(filtered);
  };

  const resetFilters = () => {
    setType(null);
    setDoctor(null);
    setHospital(null);
    setDate("");
    setFilteredResults(adds);
  };

  // Make a new appointment
  const makeReservation = (data) => {
    if (!authenticated) {
      Toast.show({
        type: "error",
        text1: "You must be logged in to make a reservation!",
      });

      setTimeout(() => {
        navigation.navigate("Home", { screen: "Login" });
      }, 2500);
      return;
    }

    const form = {
      AddID: data.AddID,
      userName: user.name,
      mobileNo: user.mobileNo,
      address: user.address,
      email: user.email,
      doctorName: data.doctorName,
      hospital: data.hospital,
      specialization: data.specialization,
      date: data.date,
      arrivalTime: data.arrivalTime,
    };

    Alert.alert(
      "Confirm Appointment",
      "Are you sure you want to make an appointment?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            dispatch(newAppointment(form));
            Toast.show({
              type: "success",
              text1: "Appointment confirmed!",
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

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
        <Text style={styles.heading}>Available Doctors</Text>

        {/* Filters Section */}
        <View style={styles.filterContainer}>
          <View style={{ zIndex: 3000, position: "relative" }}>
            <DropDownPicker
              open={typeOpen}
              value={type}
              items={typeOptions}
              setOpen={setTypeOpen}
              setValue={setType}
              placeholder="Select Type"
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View style={{ zIndex: 2000, position: "relative", marginTop: 10 }}>
            <DropDownPicker
              open={doctorOpen}
              value={doctor}
              items={doctorOptions}
              setOpen={setDoctorOpen}
              setValue={setDoctor}
              placeholder="Select Doctor"
              zIndex={2000}
              zIndexInverse={2000}
            />
          </View>

          <View style={{ zIndex: 1000, position: "relative", marginTop: 10 }}>
            <DropDownPicker
              open={hospitalOpen}
              value={hospital}
              items={hospitalOptions}
              setOpen={setHospitalOpen}
              setValue={setHospital}
              placeholder="Select Hospital"
              zIndex={1000}
              zIndexInverse={3000}
            />
          </View>

          <TextInput
            style={styles.dateInput}
            placeholder="mm/dd/yyyy"
            value={date}
            onChangeText={(text) => setDate(text)}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Doctor Cards Section */}
        <View style={styles.doctorsContainer}>
          {filteredResults.map((doctor, index) => (
            <View key={index} style={styles.doctorCard}>
              <Image
                source={{ uri: doctor.imgUrl }}
                style={styles.doctorImage}
              />
              <Text style={styles.doctorName}>{doctor.doctorName}</Text>
              <Text style={styles.doctorDetail}>
                Specialization: {doctor.specialization}
              </Text>
              <Text style={styles.doctorDetail}>
                Hospital: {doctor.hospital}
              </Text>
              <Text style={styles.doctorDetail}>Date: {doctor.date}</Text>
              <Text style={styles.doctorDetail}>
                Arrival Time: {doctor.arrivalTime}
              </Text>
              <Text style={styles.doctorDetail}>
                Total Appointments: {doctor.totCount}
              </Text>
              <Text style={styles.doctorDetail}>
                Available Appointments: {doctor.totCount - doctor.filledCount}
              </Text>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => makeReservation(doctor)}
              >
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          ))}
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
  },
  logo: {
    width: 200,
    height: 150,
    marginRight: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  filterContainer: {
    flexDirection: "column",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  filterItem: {
    marginVertical: 10,
    zIndex: 1000,
  },
  dateInput: {
    height: 40,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  doctorsContainer: {
    paddingHorizontal: 10,
  },
  doctorCard: {
    backgroundColor: "#dbdbdb",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    zIndex: 10,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  doctorDetail: {
    fontSize: 14,
    marginBottom: 5,
  },
  bookButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "50%",
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  resetButton: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  searchButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
