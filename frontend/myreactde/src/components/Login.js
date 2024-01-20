// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login(props) {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  function btnlogin(event) {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logintoken",
      data: {
        email: loginForm.email,
        password: loginForm.password
      }
    })
      .then((response) => {
        console.log(response);
        props.setToken(response.data.access_token);
        alert("Successfully Login");
        localStorage.setItem('email', loginForm.email);
        navigate('/profile');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        }
      });

    setloginForm({
      email: "",
      password: ""
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setloginForm((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
  }

  let imgs = [
    'https://static.wixstatic.com/media/85c200_6a8d1536dfb74604b5e839845c9795ff~mv2.png/v1/crop/x_4,y_0,w_229,h_62/fill/w_163,h_44,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Group%2031.png',
  ];

  return (
    <div>
      <div className="container h-50">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={imgs[0]} className="img-fluid"/>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={handleChange}
                    text={loginForm.email}
                    name="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                  <label className="form-label" htmlFor="form3Example3">Email address</label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={handleChange}
                    text={loginForm.password}
                    name="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                  <label className="form-label" htmlFor="form3Example4">Password</label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <Link to="/register" className="text-body">Forgot password?</Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="button" className="btn btn-primary btn-lg" onClick={btnlogin} >Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
