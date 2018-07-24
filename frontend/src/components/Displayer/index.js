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
      showImage: false
    };
  }

  handleshowImage = () => {
    this.setState({
      showImage: !this.state.showImage
    });
  };

  render() {
    const showImage = this.state.showImage;

    const nameParam = this.props.match.params.name;
    const personData = this.props.getDataFromName(nameParam);

    const {
      firstName,
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
    } =
      personData || {};

    const toggleInfo = !showImage
      ? "Click here to show info"
      : "Click here to show image";

    const skillList =
      skills &&
      skills.map((e, i) => (
        <li className="skill" key={i}>
          {e}
        </li>
      ));

    const Details = (
      <div className="details">
        <div className="name">
          Name:
          <span>
            {firstName} {lastName}
          </span>
        </div>
        <div className="title">
          Position: <span>{title} </span>
        </div>
        <div className="nationality">
          Nationality: <span>{nationality}</span>
        </div>
        <div>Skills</div>
        <ul className="skills">{skillList}</ul>
        <div className="story">
          Why SW developer: <span>{whySofterDeveloper}</span>
        </div>
        <div className="vision">
          Long term vision: <span>{longTermVision}</span>
        </div>
        <div className="motivation">
          What motivates me: <span>{motivatesMe}</span>
        </div>
        <div className="quote">
          Favorite quote: <span>{favoriteQuote}</span>
        </div>
        <div className="date">
          Join date: <span>{joinedOn}</span>
        </div>
      </div>
    );

    return (
      <div className="displayer">
        {!showImage ? (
          <img src={src ? images[src] : defaultImage} alt={alt} />
        ) : (
          Details
        )}
        <div className="showImage" onClick={this.handleshowImage}>
          {toggleInfo}
        </div>
      </div>
    );
  }
}

export default Displayer;
