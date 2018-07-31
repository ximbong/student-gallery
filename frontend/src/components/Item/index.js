import React from "react";
import { Link } from "react-router-dom";

import defaultImage from "../../assets/integrify-cartoon.png";

import "./index.css";

const Item = props => {
  const { index, data: { firstName, lastName, src, alt } } = props;

  const fullName = firstName + lastName;
  const displayName = `${firstName} ${lastName}`;

  return (
    <Link to={`/view/${fullName}/${index}`}>
      <div className="item">
        <img src={src ? src : defaultImage} alt={alt} />
        <div className="caption">{displayName}</div>
      </div>
    </Link>
  );
};

export default Item;
