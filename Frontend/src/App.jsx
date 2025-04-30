import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "react-hot-toast";
import "../src/assets/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "./actions/authActions";

import Header from "./componants/header";
import Footer from "./componants/Footer";

import Home from "./screens/Home";
import Appointments from "./screens/appointments";
import Reservation from "./screens/reservation";
import Login from "./screens/login";
import Register from "./screens/register";

function App() {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.authenticated);


  useEffect(() => {
    if (!authenticated) {
        dispatch(isLoggedIn());
    }
}, []);
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/make" element={<Reservation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
