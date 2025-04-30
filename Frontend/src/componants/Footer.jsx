import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <>
      <MDBFooter
        style={{ backgroundColor: "#0F2E02" }} // Set dark green background color for the entire footer
        className="text-center text-lg-start text-muted"
      >
        {/* Get connected section */}
        <section
          className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
          style={{ color: "white" }} // Set white font color
        >
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="#" className="me-4 text-reset">
              <FacebookIcon fontSize="large" style={{ color: "white" }} />
            </a>
            <a href="#" className="me-4 text-reset">
              <TwitterIcon fontSize="large" style={{ color: "white" }} />
            </a>
            <a href="#" className="me-4 text-reset">
              <GoogleIcon fontSize="large" style={{ color: "white" }} />
            </a>
            <a href="#" className="me-4 text-reset">
              <LinkedInIcon fontSize="large" style={{ color: "white" }} />
            </a>
          </div>
        </section>

        {/* Middle section */}
        <section>
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              {/* Company column */}
              <MDBCol
                md="3"
                lg="4"
                xl="3"
                className="mx-auto mb-4"
                style={{ color: "white" }} // Set dark grey and white text for the middle part
              >
                <img
                  src="http://localhost:5173/images/logo.png"
                  height="35"
                  alt="MDB Logo"
                  loading="lazy"
                  style={{marginBottom:"30px"}}
                />
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </MDBCol>

              {/* Useful Links column */}
              <MDBCol
                md="3"
                lg="2"
                xl="2"
                className="mx-auto mb-4"
                style={{ color: "white" }} // Set dark grey and white text
              >
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </MDBCol>

              {/* Contact column */}
              <MDBCol
                md="4"
                lg="3"
                xl="3"
                className="mx-auto mb-md-0 mb-4"
                style={{ color: "white" }} // Set dark grey and white text
              >
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  New York, NY 10012, US
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  info@example.com
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
                </p>
                <p>
                  <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        {/* Copyright section */}
        <div
          className="text-center p-4"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            color: "white",
            borderTop: "1px solid white",
          }}
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </MDBFooter>
    </>
  );
};

export default Footer;
