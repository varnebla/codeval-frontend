import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import Summary from '../Summary/Summary';
import Employees from '../Employees/Employees';
import Exercises from '../Exercises/Exercises';
import Applications from '../Applications/Applications';

import history from '../../history';

function Dashboard () {
  return (
    <Router history={history}>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <Link to='/dashboard'>Summary</Link>
        </li>
        <li>
          <Link to='/dashboard/employees'>Employees</Link>
        </li>
        <li>
          <Link to='/dashboard/exercises'>Exercises</Link>
        </li>
        <li>
          <Link to='/dashboard/applications'>Applications</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path='/dashboard' component={Summary}/>
        <Route path='/dashboard/employees' component={Employees}/>
        <Route path='/dashboard/exercises' component={Exercises}/>
        <Route path='/dashboard/applications' component={Applications}/>
      </Switch>
    </Router>
  );
}

export default Dashboard;