
import { Router, Switch, Route, Redirect} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Landing from './presentational/Landing/Landing';
import Register from './containers/Register/Register';
import LogIn from './containers/LogIn/LogIn';
import Dashboard from './containers/Dashboard/Dashboard';
import history from './history';

import './App.css';

function App () {

  const [isToken, setToken] = useState(false);

  useEffect(() => {
    checkingToken();
  }, []);

  function checkingToken () {
    if (localStorage.getItem('jwtToken')) {
      setToken(true);
    }
  }

  return (
    <Router history={history}>
      <Switch>
        {/* redirection to dashboard or landing if user and token matching */}
        <Route exact path='/'>
          { isToken ? <Redirect to="/dashboard"/> : <Landing/>}
        </Route>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={LogIn}>
          {isToken && <Redirect to='/dashboard'/>}
        </Route>
        {/* add dashboard to protected route */}
        <Route path='/dashboard' component={Dashboard}/>
      </Switch>
    </Router>
  );
}

export default App;
