import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Item from "./components/Item";
import NavBar from "./components/NavBar";
import Displayer from "./components/Displayer";
import StudentForm from "./components/StudentForm";
import Loader from "./components/Loader";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loader: true
    };
  }
  componentDidMount = () => {
    fetch("/data")
      .then(res => res.json())
      .then(res =>
        setTimeout(() => {
          this.setState({
            data: res,
            loader: false
          });
        }, 2000)
      );
  };

  getDataFromName = name => {
    const data = this.state.data;

    return data.find(e => {
      const fullName = e.firstName + e.lastName;
      return name === fullName;
    });
  };

  getNewItem = (index, step) => {
    const data = this.state.data;
    let newItemIndex;

    if (step === 1) {
      newItemIndex = index === data.length - 1 ? 0 : index + 1;
    } else {
      newItemIndex = index === 0 ? data.length - 1 : index - 1;
    }

    return {
      data: data[newItemIndex],
      index: newItemIndex
    };
  };

  render() {
    const { loader, data } = this.state;

    const ItemArray = data.map((e, i) => <Item data={e} index={i} key={i} />);
    const ItemList = <div className="itemList">{ItemArray}</div>;

    const PageContent = (
      <Router>
        <div>
          <Route path="/" render={props => <NavBar {...props} />} />
          <Route path="/" exact={true} render={() => ItemList} />

          <Route path="/new" component={StudentForm} />

          <Route
            path="/view/:name/:index"
            render={props => (
              <Displayer
                {...props}
                getDataFromName={this.getDataFromName}
                getNewItem={this.getNewItem}
              />
            )}
          />
        </div>
      </Router>
    );

    return loader ? <Loader /> : PageContent;
  }
}

export default App;
