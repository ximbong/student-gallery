import React from "react";

import importAll from "../../handler";
import defaultImage from "../../assets/integrify-cartoon.png";

import "./index.css";

const images = importAll(
  require.context("../../../../src/assets/img-small", false, /.jpg/)
);

const Item = props => {
  const { firstName, lastName, src, alt } = props.data;

  const fullName = firstName + lastName;

  return (
    <div className="item">
      <img src={src ? images[src] : defaultImage} alt={alt} />
      <div className="caption">{fullName}</div>
    </div>
  );
};

export default Item;
