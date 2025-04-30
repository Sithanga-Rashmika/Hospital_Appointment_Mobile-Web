import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBTypography,
  MDBInputGroup,
  MDBInput,
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { TextField, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchAppointment,
  deleteAppointment,
} from "../actions/appointmentAction";

const Appointments = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.appointment.loading);
  const user = useSelector((state) => state.user.user);
  const appointments = useSelector((state) => state.appointment.appointments);

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
    if (user && user.email) {
      const form = {
        email: user.email,
      };
      dispatch(fetchAppointment(form));
    }
  }, [user, dispatch]);

  const Appointmentdelete = (data) => {
    const form = {
      AID: data.AID,
      AddID: data.AddID,
      email: user.email,
    };
    Swal.fire({
      title: "Are you sure want to Delete this Appointment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteAppointment(form));
      }
    });
  };

  return (
    <>
      <div className="main-container">
        <MDBTypography tag="div" className="display-6 pb-3 mb-3 border-bottom">
          My Appointments
        </MDBTypography>

        <div className="top-container">
          <div className="search">
            <MDBInputGroup>
              <MDBInput label="Search" />
              <MDBBtn rippleColor="dark">
                <MDBIcon icon="search" />
              </MDBBtn>
            </MDBInputGroup>
          </div>
          <div className="button-container">
            <div></div>
            <a href="/make">
              <div className="add-btn">
                <AddIcon />
                Make New Appointment
              </div>
            </a>
          </div>
        </div>
        <div className="table-container">
          <MDBTable hover>
            <MDBTableHead style={{ backgroundColor: "#2e2e2e" }}>
              <tr>
                <th scope="col" style={{ color: "white" }}>
                  #
                </th>
                <th scope="col" style={{ color: "white" }}>
                  AID
                </th>
                <th scope="col" style={{ color: "white" }}>
                  Name
                </th>
                <th scope="col" style={{ color: "white" }}>
                  Mobile No
                </th>

                <th scope="col" style={{ color: "white" }}>
                  Doctor Name
                </th>

                <th scope="col" style={{ color: "white" }}>
                  Hospital
                </th>
                <th scope="col" style={{ color: "white" }}>
                  Date
                </th>
                <th scope="col" style={{ color: "white" }}>
                  Number
                </th>
                <th scope="col" style={{ color: "white", textAlign: "center" }}>
                  Actions
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {appointments.length > 0 ? (
                appointments.map((data, index) => (
                  <tr
                    style={{ height: "40px", verticalAlign: "middle" }}
                    key={index}
                  >
                    <th scope="row">{index + 1}</th>
                    <td>{data.AID}</td>
                    <td>{data.userName}</td>
                    <td>{data.mobileNo}</td>
                    <td>{data.doctorName}</td>
                    <td>{data.hospital}</td>
                    <td>{new Date(data.date).toLocaleDateString("en-GB")}</td>
                    <td>{data.number}</td>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip title="Delete Appointment">
                        <DeleteIcon
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => Appointmentdelete(data)}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    No appointments available.
                  </td>
                </tr>
              )}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </>
  );
};

export default Appointments;
