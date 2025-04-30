import React, { useState, useEffect } from "react";
import { Logins } from "../actions/authActions";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const authenticated = useSelector((state) => state.user.authenticated);

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

    if (email === "") {
      toast.error("Please Provide An Email..!", {
        id: "email",
      });
    } else if (pwd === "") {
      toast.error("Please Provide the Password..!", {
        id: "'password'",
      });
    } else if (email != "" && pwd != "") {
      const form = {
        email: email,
        password: pwd,
      };

      dispatch(Logins(form));
      setEmail("");
      setPwd("");
    }
  };

  if (authenticated) {
    return <Navigate to="/" />;
  }

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
            Sign in
          </button>

          <div class="text-center">
            <p>
              Not a member? <a href="/register">Register</a>
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

export default Login;
