import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import history from '../../history';
import Login from '../../containers/LogIn/LogIn';
import Register from '../../containers/Register/Register';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Landing () {
  return (
    <Router history={history}>
      <Navbar bg="light" variant="light" sticky="top">
        <Navbar.Brand href="/landing">AppName</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/login">Log In</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path='/landing' component={Landing}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Switch>
    </Router>
  );
}

export default Landing;