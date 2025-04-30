import React, { useState, useEffect } from "react";
import { MDBTypography, MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../actions/dataAction";
import { toast } from "react-hot-toast";
import { newAppointment } from "../actions/appointmentAction";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.details.loading);
  const loading2 = useSelector((state) => state.appointment.loading);
  const adds = useSelector((state) => state.details.adds);
  const user = useSelector((state) => state.user.user);
  const authenticated = useSelector((state) => state.user.authenticated);

  useEffect(() => {
    if (loading === true) {
      toast.loading("Loading...", {
        id: "loading",
      });
    } else if (loading === false) {
      toast.dismiss("loading");
    }
  }, [loading]);
  useEffect(() => {
    if (loading2 === true) {
      toast.loading("Loading...", {
        id: "loading2",
      });
    } else if (loading2 === false) {
      toast.dismiss("loading2");
    }
  }, [loading2]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const [filteredResults, setFilteredResults] = useState([]);

  const [type, setType] = useState("");
  const [doctor, setDoctor] = useState("");
  const [hospital, setHospital] = useState("");
  const [date, setDate] = useState("");

  const [typeOptions, setTypeOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [hospitalOptions, setHospitalOptions] = useState([]);

  useEffect(() => {
    if (adds && adds.length > 0) {
      const uniqueTypes = Array.from(
        new Set(adds.map((item) => item.specialization))
      );
      const uniqueDoctors = Array.from(
        new Set(adds.map((item) => item.doctorName))
      );
      const uniqueHospitals = Array.from(
        new Set(adds.map((item) => item.hospital))
      );

      setTypeOptions(uniqueTypes);
      setDoctorOptions(uniqueDoctors);
      setHospitalOptions(uniqueHospitals);
      setFilteredResults(adds);
    }
  }, [adds]);

  // Handle search
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

  const makeReservation = (data, e) => {
    e.preventDefault();

    if (!authenticated) {
      toast.error("You must be logged in to make a reservation!");
      setTimeout(() => {
        navigate("/login");
      }, 2500);

      return;
    } else {
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

      Swal.fire({
        title: "Are you sure want to Make an Appointment?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#008000",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
        cancelButtonText: "No!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          dispatch(newAppointment(form));
        }
      });
    }
  };

  const reset = () => {
    setDate("");
    setDoctor("");
    setHospital("");
    setType("");
  };
  return (
    <>
      <div className="main-container">
        <MDBTypography tag="div" className="display-6 pb-3 mb-3 border-bottom">
          Available Doctors
        </MDBTypography>

        <div className="appointment-container">
          <h2 className="appointment-title">Book Your Appointment</h2>

          {/* Filter Section */}
          <div className="filter-container">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="filter-dropdown"
            >
              <option value="">Select Type</option>
              {typeOptions.map((data, index) => (
                <option value={data} key={index}>
                  {data}
                </option>
              ))}
            </select>

            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="filter-dropdown"
            >
              <option value="">Select Doctor</option>
              {doctorOptions.map((data, index) => (
                <option value={data} key={index}>
                  {data}
                </option>
              ))}
              {/* Add more options */}
            </select>

            <select
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="filter-dropdown"
            >
              <option value="">Select Hospital</option>
              {hospitalOptions.map((data, index) => (
                <option value={data} key={index}>
                  {data}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="filter-dropdown"
            />

            <button className="reset-btn" onClick={reset}>
              reset
            </button>
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          {/* Doctor Cards */}
          <MDBRow>
            {filteredResults.map((data, index) => (
              <MDBCol key={index} md="4" sm="12" className="mb-4">
                <div className="doctor-card">
                  <div className="doctor-avatar">
                    <img
                      src={data.imgUrl}
                      alt="Doctor Avatar"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <h3>{data.doctorName}</h3>
                  <p>
                    <strong>Specialization:</strong> {data.specialization}
                  </p>
                  <p>
                    <strong>Hospital:</strong> {data.hospital}
                  </p>
                  <p>
                    <strong>Date:</strong> {data.date}
                  </p>
                  <p>
                    <strong>Arrival Time:</strong> {data.arrivalTime}
                  </p>
                  <p>
                    <strong>Total Appointments:</strong> {data.totCount}
                  </p>
                  <p>
                    <strong>Available Appointments:</strong>
                    {data.totCount - data.filledCount}
                  </p>
                  <button
                    className="book-btn"
                    onClick={(e) => makeReservation(data, e)}
                  >
                    Book
                  </button>
                </div>
              </MDBCol>
            ))}
          </MDBRow>
        </div>
      </div>
    </>
  );
};

export default Reservation;
