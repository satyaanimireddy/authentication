import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div
      style={{
        background: "black",
        height: "50px",
        textAlign: "right",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Link
        to="/signup"
        style={{
          margin: "20px",
          textDecoration: "none",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Signup
      </Link>
      <Link
        to="/login"
        style={{
          margin: "20px",
          textDecoration: "none",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Login
      </Link>
    </div>
  );
};

export default Nav;
