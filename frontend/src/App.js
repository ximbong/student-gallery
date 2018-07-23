import React, { Component } from "react";
import { Router, Route } from "react-router";

import Item from "./components/Item";
import NavBar from "./components/NavBar";
import Displayer from "./components/Displayer";

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
    return this.state.data.find(e => {
      const fullName = e.firstName + e.lastName;
      return name === fullName;
    });
  };

  render() {
    const data = this.state.data;

    const ItemList = data.map((e, i) => <Item data={e} key={i} />);

    return (
      <Router>
        <div>
          <Route path="/" component={NavBar} />
          <Route
            path="/"
            render={() => {
              return <div className="itemList">{ItemList}</div>;
            }}
          />
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
