// Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const btnRegister = async (event) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        email: registerForm.email,
        password: registerForm.password,
      });

      if (response.data.message === "Registration successful") {
        alert("Registration successful! Check your email for verification.");
        navigate("/");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("An error occurred. Please try again later.");
    }

    setRegisterForm({
      email: "",
      password: "",
    });

    event.preventDefault();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setRegisterForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="container h-50">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Register an Account</p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={handleChange}
                    text={registerForm.email}
                    name="email"
                    id="formRegisterEmail"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                  <label className="form-label" htmlFor="formRegisterEmail">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    value={registerForm.password}
                    onChange={handleChange}
                    text={registerForm.password}
                    name="password"
                    id="formRegisterPassword"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                  <label className="form-label" htmlFor="formRegisterPassword">
                    Password
                  </label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={btnRegister}
                  >
                    Register
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?{" "}
                    <a href="/" className="link-danger">
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
