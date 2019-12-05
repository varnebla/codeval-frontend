import React from 'react';

import { Router, Switch, Route, NavLink} from 'react-router-dom';
import Settings from '../Settings/Settings';
import Interviewers from '../Interviewers/Interviewers';
import Exercises from '../Exercises/Exercises';
import ExcercisesCreate from '../ExcercisesCreate/ExcercisesCreate';
import Applications from '../Applications/Applications';

import history from '../../history';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './Dashboard.css';

function Dashboard () {

  return (
    <Router history={history}>
      <Navbar collapseOnSelect expand="lg" className="navbar" sticky="top">
        {/* ONCE LOGO IS READY IT SHOULD GO HERE INSTEAD OF DASHBOARD */}
        <NavLink className="nav nav-link"  activeClassName="selected" to="/dashboard" style={{fontSize: '1.25em', color: 'white'}}>
          <div className="navbar-logo"/>
        </NavLink> 
        <Navbar.Toggle className="nav-bar-toggle" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav inline="true" className="nav">
            <NavLink className="nav-link" to="/dashboard/interviewers" activeClassName="selected" style={{color: 'white'}} activeStyle={{fontWeight: '1000'}}>INTERVIEWERS</NavLink>
            <NavLink className="nav-link" to="/dashboard/exercises" activeClassName="selected" style={{color: 'white'}} activeStyle={{fontWeight: '1000'}}>EXERCISES</NavLink>
            <NavLink className="nav-link" to="/dashboard/settings" activeClassName="selected" style={{color: 'white'}} activeStyle={{fontWeight: '1000'}}>SETTINGS</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path='/dashboard' component={Applications}/>
        <Route path='/dashboard/interviewers' component={Interviewers}/>
        <Route path='/dashboard/exercises' component={Exercises}/>
        <Route path='/dashboard/createExercise' component={ExcercisesCreate}/>
        <Route path='/dashboard/editExercise/:id' component={ExcercisesCreate}/>
        <Route path='/dashboard/settings' component={Settings}/>
      </Switch>
    </Router>
  );
}

export function ToggleButton () {
  return (
    <Button className="toggle-button" variant="danger"></Button>
  );
}

export default Dashboard;