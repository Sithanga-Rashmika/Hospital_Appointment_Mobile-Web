import React, { useState, useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../actions/authActions";
const Header = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.authenticated);

  const logOut = () => {
    dispatch(signout());
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#0F2E02" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars text-light"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand text-light mt-2 mt-lg-0" href="#">
              <img
                src="http://localhost:5173/images/logo.png"
                height="35"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link text-light" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/make">
                  Doctors
                </a>
              </li>
              {authenticated ? (
                <li className="nav-item">
                  <a className="nav-link text-light" href="/appointments">
                    Appointments
                  </a>
                </li>
              ) : (
                <></>
              )}

              <li className="nav-item">
                <a className="nav-link text-light" href="about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="/contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            {authenticated ? (
              <a
                className="btn btn-danger me-3"
                style={{ fontSize: "11px" }}
                onClick={logOut}
                role="button"
              >
                <LogoutIcon style={{ marginRight: "8px", fontSize: "11px" }} />
                Logout
              </a>
            ) : (
              <a
                className="btn btn-primary me-3"
                style={{ fontSize: "11px" }}
                href="/login"
                role="button"
              >
                <LoginIcon style={{ marginRight: "8px", fontSize: "11px" }} />
                Login
              </a>
            )}

            <div className="dropdown me-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="25"
                alt="User Avatar"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
