import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SimpleCalculator from './modules/simple/components/SimpleCalculator';
import CompoundCalculator from './modules/compound/containers/CompoundCalculator';
import logo from './logo.svg';
import './App.css';

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
          <Grid>
            <Row>
              <Col xs={12} md={8}>
                <Switch>
                  <Route exact path="/" component={() => <h1>Home</h1>} />
                  <Route path="/simple" component={SimpleCalculator} />
                  <Route path="/compound" component={CompoundCalculator} />
                  <Route render={() => <h1>Page not found</h1>} />
                </Switch>
              </Col>
            </Row>
          </Grid>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
