import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

const Home = () => {
  return (
    <>
      <div className="hero-container">
        <img
          src="http://localhost:5173/assets/images/hero.jpg"
          alt="MediConnect Hero"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>WELCOME TO MediConnect</h1>
          <p>Your Health, Our Priority</p>
        </div>
      </div>

      <MDBContainer className="text-center my-5">
        <h2 className="mb-4" style={{ color: "#0F2E02" }}>
          Our Services
        </h2>
        <br />
        <MDBRow>
          <MDBCol md="3">
            <a href="/appointments">
              <div className="service-card">
                <img
                  src="http://localhost:5173/assets/images/calander.png"
                  alt="Appointments"
                  className="service-icon"
                />
                <h5 className="mt-3">Appointments</h5>
              </div>
            </a>
          </MDBCol>

          <MDBCol md="3">
            <div className="service-card">
              <img
                src="http://localhost:5173/assets/images/doc.png"
                alt="Medical History"
                className="service-icon"
              />
              <h5 className="mt-3">Medical History</h5>
            </div>
          </MDBCol>

          <MDBCol md="3">
            <div className="service-card">
              <img
                src="http://localhost:5173/assets/images/card.png"
                alt="Health Card"
                className="service-icon"
              />
              <h5 className="mt-3">Health Card</h5>
            </div>
          </MDBCol>

          <MDBCol md="3">
            <div className="service-card">
              <img
                src="http://localhost:5173/assets/images/paid.png"
                alt="Payments"
                className="service-icon"
              />
              <h5 className="mt-3">Payments</h5>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Home;
