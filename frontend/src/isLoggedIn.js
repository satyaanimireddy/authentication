// import React from "react";

const isLoggedIn = () => {
  let token = localStorage.getItem("jwt-token");

  if (token) {
    return true;
  } else {
    return false;
  }
  //   return <div>isLoggedIn</div>;
};

export default isLoggedIn;
