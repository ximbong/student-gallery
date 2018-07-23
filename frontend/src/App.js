import React, { Component } from "react";

import Item from "./components/Item";
import NavBar from "./components/NavBar";

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
  render() {
    const data = this.state.data;

    const ItemList = data.map((e, i) => <Item data={e} key={i} />);

    return (
      <div>
        <NavBar />
        <div className="itemList">{ItemList}</div>
      </div>
    );
  }
}

export default App;
