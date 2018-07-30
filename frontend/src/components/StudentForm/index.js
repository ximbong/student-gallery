import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./index.css";

class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      title: "",
      nationality: "",
      skills: "",
      image: null,
      whySofterDeveloper: "",
      longTermVision: "",
      motivatesMe: "",
      favoriteQuote: "",
      joinedOn: "",
      imagePreviewer: null,
      redirect: false
    };
  }

  imagePreviewer = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ imagePreviewer: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  fileChangedHandler = event => {
    this.setState({ image: event.target.files[0] });
  };

  handle = (event, name) => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { skills, redirect, ...data } = this.state;
    const url = "https://student-gallery.herokuapp.com/new";

    const formData = new FormData();
    for (let name in data) {
      formData.append(name, data[name]);
    }

    const skillsArray = JSON.stringify(skills.split(","));

    formData.append("skills", skillsArray);

    fetch(url, {
      method: "POST",
      body: formData
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          redirect: true
        });
      }
    });
  };

  render() {
    const {
      firstName,
      lastName,
      title,
      nationality,
      skills,
      whySofterDeveloper,
      longTermVision,
      motivatesMe,
      favoriteQuote,
      joinedOn,
      imagePreviewer,
      redirect
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {redirect && <Redirect to="/" />}
        <div className="form">
          <div className="textFields">
            <div className="input-effect">
              <label htmlFor="firstName"> First name </label>
              <br />
              <input
                className="effect"
                id="firstName"
                type="text"
                value={firstName}
                onChange={e => this.handle(e, "firstName")}
              />
              <span className="focus-border" />
            </div>

            <div className="input-effect">
              <label htmlFor="lastName"> Last name </label>
              <br />
              <input
                className="effect"
                id="lastName"
                type="text"
                value={lastName}
                onChange={e => this.handle(e, "lastName")}
              />
              <span className="focus-border" />
            </div>

            <div className="input-effect">
              <label htmlFor="title"> Position </label>
              <br />
              <input
                className="effect"
                id="title"
                type="text"
                value={title}
                onChange={e => this.handle(e, "title")}
              />
              <span className="focus-border" />
            </div>

            <div className="input-effect">
              <label htmlFor="nationality"> Nationality </label>
              <br />
              <input
                className="effect"
                id="nationality"
                type="text"
                value={nationality}
                onChange={e => this.handle(e, "nationality")}
              />
              <span className="focus-border" />
            </div>

            <div className="input-effect">
              <label htmlFor="skills"> Skills </label>
              <br />
              <input
                className="effect"
                id="skills"
                type="text"
                value={skills}
                onChange={e => this.handle(e, "skills")}
              />
              <span className="focus-border" />
            </div>

            <div className="input-effect">
              <label htmlFor="longTermVision"> Long term vision </label>
              <br />
              <input
                className="effect"
                id="longTermVision"
                type="text"
                value={longTermVision}
                onChange={e => this.handle(e, "longTermVision")}
              />
              <span className="focus-border" />
            </div>

            <div className="input-effect">
              <label htmlFor="whySofterDeveloper">Why software developer</label>
              <br />
              <input
                className="effect"
                id="whySofterDeveloper"
                type="text"
                value={whySofterDeveloper}
                onChange={e => this.handle(e, "whySofterDeveloper")}
              />
              <span className="focus-border" />
            </div>

            <div className="input-effect">
              <label htmlFor="motivatesMe"> What motivates you </label>
              <br />
              <input
                className="effect"
                id="motivatesMe"
                type="text"
                value={motivatesMe}
                onChange={e => this.handle(e, "motivatesMe")}
              />
              <span className="focus-border" />
            </div>

            <div className="input-effect">
              <label htmlFor="favoriteQuote"> Favorite quote </label>
              <br />
              <input
                className="effect"
                id="favoriteQuote"
                type="text"
                value={favoriteQuote}
                onChange={e => this.handle(e, "favoriteQuote")}
              />
              <span className="focus-border" />
            </div>

            <div className="input-effect">
              <label htmlFor="joinedOn"> Join date </label>
              <br />
              <input
                className="effect"
                id="joinedOn"
                type="text"
                value={joinedOn}
                onChange={e => this.handle(e, "joinedOn")}
              />
              <span className="focus-border" />
            </div>
          </div>

          <div className="imageField">
            <label>Upload an image</label>
            <input
              type="file"
              onChange={e => {
                this.fileChangedHandler(e);
                this.imagePreviewer(e);
              }}
            />
            <img id="target" src={imagePreviewer} alt="" />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default StudentForm;
