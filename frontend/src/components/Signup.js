import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault(); // it will control default behavior
    const data = {
      username,
      email,
      password,
      confirmpassword,
    };
    axios
      .post("http://localhost:5001/signup", data)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container mt-3">
      <div className="row">
        <h2 className="text-center">Sign Up</h2>
        <div className="col-4 m-auto my-4 bg-secondary px-4 py-3 text-white fs-5 rounded">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                User name
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">
                confirm password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                value={confirmpassword}
                onChange={(e) => {
                  setConfirmpassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 fs-5 fw-medium mt-3"
            >
              Register
            </button>
          </form>
          <p className="pt-3">
            Have already account ? &nbsp;
            <Link to="/login" className="text-warning fs-5 fw-medium">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
