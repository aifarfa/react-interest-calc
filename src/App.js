import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { SimpleFormComponent } from "./modules/simple/SimpleForm";
import { CompoundFormComponent } from "./modules/compound/CompoundForm";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Task 1. interest calculator</h1>
        </header>

        <Navbar>
          <Nav bsStyle="pills" stacked activeKey={1}>
            <NavItem href="/simple">Simple Interest</NavItem>
            <NavItem href="/compound">Compound Interest</NavItem>
          </Nav>
        </Navbar>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => <h1>Home</h1>} />
            <Route path="/simple" component={SimpleFormComponent} />
            <Route path="/compound" component={CompoundFormComponent} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
