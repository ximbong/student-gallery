import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

import defaultImage from "../../assets/integrify-cartoon.png";

import "./index.css";

class Displayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage: false,
      nextPersonFullName: "",
      nextPersonIndex: ""
    };
  }

  componentDidUpdate() {
    if (this.state.nextPersonFullName) {
      this.setState({
        nextPersonFullName: "",
        nextPersonIndex: ""
      });
    }
  }

  handleshowImage = () => {
    this.setState({
      showImage: !this.state.showImage
    });
  };

  showNewPerson = (currentIndex, step) => {
    const { data, index } = this.props.getNewItem(currentIndex, step);

    const fullName = data.firstName + data.lastName;

    this.setState({
      nextPersonFullName: fullName,
      nextPersonIndex: index
    });
  };
  render() {
    const { nextPersonFullName, nextPersonIndex, showImage } = this.state;

    const nameParam = this.props.match.params.name;
    const personData = this.props.getDataFromName(nameParam);
    const currentIndex = parseInt(this.props.match.params.index, 10);

    const showNextPerson = !!nextPersonFullName; //redirect condition

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
          Name:{" "}
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
        {showNextPerson && (
          <Redirect to={`/view/${nextPersonFullName}/${nextPersonIndex}`} />
        )}
        <div className="details-div">
          <i
            className="fa fa-arrow-left arrow-left"
            onClick={() => this.showNewPerson(currentIndex, -1)}
          />
          {!showImage ? (
            <img src={src ? src : defaultImage} alt={alt} />
          ) : (
            Details
          )}
          <i
            className="fa fa-arrow-right arrow-right"
            onClick={() => this.showNewPerson(currentIndex, 1)}
          />
        </div>
        <div className="showImage" onClick={this.handleshowImage}>
          {toggleInfo}
        </div>
      </div>
    );
  }
}

export default Displayer;
