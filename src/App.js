import React from 'react';
import { Router, Switch, Route, Redirect} from 'react-router-dom';
import Landing from './presentational/Landing/Landing';
import Register from './containers/Register/Register';
import LogIn from './containers/LogIn/LogIn';
import Dashboard from './containers/Dashboard/Dashboard';
import history from './history';

import './App.css';

function App () {
  return (
    <Router history={history}>
      <h1>NavBar</h1>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={LogIn}>
          {localStorage.getItem('jwtToken') && <Redirect to='/dashboard'/>}
        </Route>
        <Route path='/dashboard' component={Dashboard}/>
      </Switch>
    </Router>
  );
}

export default App;
