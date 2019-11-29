import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {sendLogout} from '../../redux/authentication';
import Summary from '../Summary/Summary';
import Employees from '../Employees/Employees';
import Exercises from '../Exercises/Exercises';
import ExcercisesCreate from '../ExcercisesCreate/ExcercisesCreate';
import Applications from '../Applications/Applications';
import history from '../../history';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Dashboard () {

  const dispatch = useDispatch();

  function handleLogOut () {
    dispatch(sendLogout());
  }

  return (
    <Router history={history}>
      <Navbar bg="light" variant="light" sticky="top">
        <Navbar.Brand href="/dashboard">Dasboard</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Summary</Nav.Link>
          <Nav.Link href="/dashboard/employees">Employees</Nav.Link>
          <Nav.Link href="/dashboard/exercises">Exercises</Nav.Link>
          <Nav.Link href="/dashboard/applications">Applications</Nav.Link>
        </Nav>
        <Nav inline="true">
          <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path='/dashboard' component={Summary}/>
        <Route path='/dashboard/employees' component={Employees}/>
        <Route path='/dashboard/exercises' component={Exercises}/>
        <Route path='/dashboard/createExercise' component={ExcercisesCreate}/>
        <Route path='/dashboard/editExercise/:id' component={ExcercisesCreate}/>
        <Route path='/dashboard/applications' component={Applications}/>
      </Switch>
    </Router>
  );
}

export default Dashboard;