import React from "react";

import defaultImage from "../../assets/integrify-cartoon.png";

import "./index.css";

const Loader = () => {
  return (
    <div className="loader">
      <img src={defaultImage} alt="Loader" />
    </div>
  );
};

export default Loader;
