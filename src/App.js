import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import SimpleCalculator from './modules/simple/components/SimpleCalculator';
import CompoundCalculator from './modules/compound/containers/CompoundCalculator';
import HomePage from './modules/home';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Task 1. interest calculator</h1>
          </header>
          <Navbar>
            <Nav bsStyle="pills" stacked activeKey={1}>
              <LinkContainer to="/simple">
                <NavItem>Simple interest</NavItem>
              </LinkContainer>
              <LinkContainer to="/compound">
                <NavItem>Compound interest</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar>
          <Grid>
            <Row>
              <Col xs={12} md={10}>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/simple" component={SimpleCalculator} />
                  <Route path="/compound" component={CompoundCalculator} />
                  <Route render={() => <h1>Page not found</h1>} />
                </Switch>
              </Col>
            </Row>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
