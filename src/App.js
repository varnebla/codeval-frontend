import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Landing from './presentational/Landing/Landing';
import Register from './containers/Register/Register';
import LogIn from './containers/LogIn/LogIn';
import Dashboard from './containers/Dashboard/Dashboard';

import './App.css';

function App () {
  return (
    <Router>
      <h1>NavBar</h1>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={LogIn}/>
        <Route path='/dashboard' component={Dashboard}/>
      </Switch>
    </Router>
  );
}

export default App;
