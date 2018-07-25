import React from "react";
import { Link } from "react-router-dom";

import importAll from "../../handler";
import defaultImage from "../../assets/integrify-cartoon.png";

import "./index.css";

const images = importAll(
  require.context(
    "../../../../src/assets/img-small",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const Item = props => {
  const { firstName, lastName, src, alt } = props.data;

  const fullName = firstName + lastName;
  const displayName = `${firstName} ${lastName}`;

  return (
    <Link to={`/view/${fullName}`}>
      <div className="item">
        <img src={src ? images[src] : defaultImage} alt={alt} />
        <div className="caption">{displayName}</div>
      </div>
    </Link>
  );
};

export default Item;
