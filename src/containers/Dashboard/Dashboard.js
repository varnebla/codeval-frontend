import React from 'react';

import { Router, Switch, Route} from 'react-router-dom';
<<<<<<< HEAD
import {useDispatch} from 'react-redux';
import {sendLogout} from '../../redux/authentication';
import Summary from '../Summary/Summary';
import Interviwers from '../Interviewers/Interviewers';
=======

import Settings from '../Settings/Settings';
import Employees from '../Employees/Employees';
>>>>>>> origin/develop
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
<<<<<<< HEAD
          <Nav.Link href="/dashboard">Summary</Nav.Link>
          <Nav.Link href="/dashboard/interviewers">Interviewers</Nav.Link>
          <Nav.Link href="/dashboard/exercises">Exercises</Nav.Link>
          <Nav.Link href="/dashboard/applications">Applications</Nav.Link>
=======
>>>>>>> origin/develop
        </Nav>
        <Nav inline="true">
          <Nav.Link href="/dashboard/employees">Employees</Nav.Link>
          <Nav.Link href="/dashboard/exercises">Exercises</Nav.Link>
          <Nav.Link onClick={gotoSettings}><i className="fas fa-user-cog"></i></Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
<<<<<<< HEAD
        <Route exact path='/dashboard' component={Summary}/>
        <Route path='/dashboard/interviewers' component={Interviwers}/>
=======
        <Route exact path='/dashboard' component={Applications}/>
        <Route path='/dashboard/employees' component={Employees}/>
>>>>>>> origin/develop
        <Route path='/dashboard/exercises' component={Exercises}/>
        <Route path='/dashboard/createExercise' component={ExcercisesCreate}/>
        <Route path='/dashboard/editExercise/:id' component={ExcercisesCreate}/>
        <Route path='/dashboard/settings' component={Settings}/>
      </Switch>
    </Router>
  );
}

export default Dashboard;