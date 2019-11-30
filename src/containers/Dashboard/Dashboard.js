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

function Dashboard () {

  function gotoSettings () {
    history.push('/dashboard/settings');
  }

  return (
    <Router history={history}>
      <Navbar bg="light" variant="light" sticky="top">
        {/* ONCE LOGO IS READY IT SHOULD GO HERE INSTEAD OF DASHBOARD */}
        <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand> 
        <Nav className="mr-auto">

        </Nav>
        <Nav inline="true">
          <Nav.Link href="/dashboard/interviewers">Interviewers</Nav.Link>
          <Nav.Link href="/dashboard/exercises">Exercises</Nav.Link>
          <Nav.Link onClick={gotoSettings}><i className="fas fa-user-cog"></i></Nav.Link>
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