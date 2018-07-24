import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Item from "./components/Item";
import NavBar from "./components/NavBar";
import Displayer from "./components/Displayer";
import StudentForm from "./components/StudentForm";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount = () => {
    const baseUrl = "http://localhost:3000";
    fetch(baseUrl)
      .then(res => res.json())
      .then(res =>
        this.setState({
          data: res
        })
      );
  };
  getDataFromName = name => {
    const data = this.state.data;

    return data.find(e => {
      const fullName = e.firstName + e.lastName;
      return name === fullName;
    });
  };

  render() {
    const data = this.state.data;

    const ItemArray = data.map((e, i) => <Item data={e} key={i} />);
    const ItemList = <div className="itemList">{ItemArray}</div>;

    return (
      <Router>
        <div>
          <Route path="/" render={props => <NavBar {...props} />} />
          <Route path="/" exact={true} render={() => ItemList} />

          <Route path="/new" component={StudentForm} />

          <Route
            path="/view/:name"
            render={props => (
              <Displayer {...props} getDataFromName={this.getDataFromName} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
