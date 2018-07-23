import React, { Component } from "react";

import importAll from "../../handler";
import defaultImage from "../../assets/integrify-cartoon.png";

import "./index.css";

const images = importAll(
  require.context("../../../../src/assets/img", false, /.jpg/)
);

class Displayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false
    };
  }
  render() {
    const {
      firstname,
      lastName,
      title,
      nationality,
      src,
      alt,
      skills,
      whySofterDeveloper,
      longTermVision,
      motivatesMe,
      favoriteQuote,
      joinedOn
    } = this.props.data;

    return (
      <div className="displayer">
        <img src={src ? images[src] : defaultImage} alt={alt} />
      </div>
    );
  }
}

export default Displayer;
