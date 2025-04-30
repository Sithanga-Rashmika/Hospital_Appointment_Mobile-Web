import React, { useState, useEffect } from "react";
import { SignUp } from "../actions/authActions";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    if (loading === true) {
      toast.loading("Loading...", {
        id: "loading",
      });
    } else if (loading === false) {
      toast.dismiss("loading");
    }
  }, [loading]);

  const formSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (name === "") {
      toast.error("Please Provide a Name..!", { id: "nm" });
    } else if (address === "") {
      toast.error("Please Provide a Address..!", { id: "ad" });
    } else if (email === "") {
      toast.error("Please Provide An Email..!", { id: "email" });
    } else if (!emailRegex.test(email)) {
      toast.error("Please Provide A Valid Email..!", { id: "email" });
    } else if (contact === "") {
      toast.error("Please Provide a Mobile Number..!", { id: "contact" });
    } else if (!phoneRegex.test(contact)) {
      toast.error("Please Provide A Valid 10-Digit Mobile Number..!", {
        id: "contact",
      });
    } else if (pwd === "") {
      toast.error("Please Provide the Password..!", {
        id: "'password'",
      });
    } else if (
      name != "" &&
      contact != "" &&
      address != "" &&
      email != "" &&
      pwd != ""
    ) {
      const form = {
        name: name,
        mobileNo: contact,
        address: address,
        email: email,
        password: pwd,
      };

      dispatch(SignUp(form));
      setName("");
      setContact("");
      setAddress("");
      setEmail("");
      setPwd("");
    }
  };

  return (
    <>
      <div className="login">
        <img
          src="http://localhost:5173/images/logo2.png"
          height="50"
          alt="MDB Logo"
          loading="lazy"
          style={{ margin: "10px auto 30px auto", display: "block" }}
        />
        <form onSubmit={formSubmit}>
          <div data-mdb-input-init class="form-outline mb-4">
            <input
              type="text"
              id="form2Example1"
              class="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label class="form-label" for="form2Example1">
              Full Name
            </label>
          </div>
          <div data-mdb-input-init class="form-outline mb-4">
            <input
              type="text"
              id="form2Example1"
              class="form-control"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <label class="form-label" for="form2Example1">
              Contact No
            </label>
          </div>
          <div data-mdb-input-init class="form-outline mb-4">
            <input
              type="text"
              id="form2Example1"
              class="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label class="form-label" for="form2Example1">
              Address
            </label>
          </div>
          <div data-mdb-input-init class="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              class="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label class="form-label" for="form2Example1">
              Email address
            </label>
          </div>

          <div data-mdb-input-init class="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              class="form-control"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <label class="form-label" for="form2Example2">
              Password
            </label>
          </div>

          <div class="row mb-4">
            <div class="col d-flex justify-content-center">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example31"
                  checked
                />
                <label class="form-check-label" for="form2Example31">
                  {" "}
                  Remember me{" "}
                </label>
              </div>
            </div>

            <div class="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            data-mdb-button-init
            data-mdb-ripple-init
            class="btn btn-primary btn-block mb-4"
          >
            Sign Up
          </button>

          <div class="text-center">
            <p>
              Already have an account? <a href="/login">Sign In</a>
            </p>
            <p>or sign up with:</p>
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              class="btn btn-link btn-floating mx-1"
            >
              <i class="fab fa-facebook-f"></i>
            </button>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              class="btn btn-link btn-floating mx-1"
            >
              <i class="fab fa-google"></i>
            </button>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              class="btn btn-link btn-floating mx-1"
            >
              <i class="fab fa-twitter"></i>
            </button>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              class="btn btn-link btn-floating mx-1"
            >
              <i class="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
