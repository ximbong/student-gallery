import React from "react";

import { Link } from "react-router-dom";

import logo from "../../assets/big-logo.png";
import "./index.css";

const NavBar = () => {
  return (
    <div className="navBar">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
    </div>
  );
};

export default NavBar;
