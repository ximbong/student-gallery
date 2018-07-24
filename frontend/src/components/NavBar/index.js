import React from "react";

import { Link } from "react-router-dom";

import logo from "../../assets/big-logo.png";
import "./index.css";

const NavBar = props => {
  const pathName = props.location.pathname;

  const rightSideButton =
    pathName !== "/new" ? (
      <Link to="/new">
        <button>Add new student</button>
      </Link>
    ) : (
      <Link to="/">
        <button>Back to homepage</button>
      </Link>
    );

  return (
    <div className="navBar">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      {rightSideButton}
    </div>
  );
};

export default NavBar;
