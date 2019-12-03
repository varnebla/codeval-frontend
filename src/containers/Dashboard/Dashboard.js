import React from 'react';

import { Router, Switch, Route} from 'react-router-dom';
import Settings from '../Settings/Settings';
import Interviewers from '../Interviewers/Interviewers';
import Exercises from '../Exercises/Exercises';
import ExcercisesCreate from '../ExcercisesCreate/ExcercisesCreate';
import Applications from '../Applications/Applications';

import history from '../../history';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Dashboard.css';

function Dashboard () {

  return (
    <Router history={history}>
      <Navbar className="navbar" sticky="top">
        {/* ONCE LOGO IS READY IT SHOULD GO HERE INSTEAD OF DASHBOARD */}
        <Navbar.Brand className="nav" href="/dashboard">CODEVAL</Navbar.Brand> 
        <Nav className="mr-auto">

        </Nav>
        <Nav inline="true" className="nav">
          <Nav.Link href="/dashboard/interviewers">INTERVIEWERS</Nav.Link>
          <Nav.Link href="/dashboard/exercises">EXERCISES</Nav.Link>
          <Nav.Link href="/dashboard/settings">SETTINGS</Nav.Link>
        </Nav>
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

export default Dashboard;