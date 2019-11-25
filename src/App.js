import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Landing from './presentational/Landing/Landing';
import Register from './containers/Register/Register';
import LogIn from './containers/LogIn/LogIn';
import Dashboard from './containers/Dashboard/Dashboard';

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
    <Router>
      <h1>NavBar</h1>
      <Switch>
        {/* redirection to dashboard or landing if user and token matching */}
        <Route exact path='/'>
          { isToken ? <Redirect to="/dashboard"/> : <Landing/>}
        </Route>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={LogIn}/>
        {/* add dashboard to protected route */}
        <Route path='/dashboard' component={Dashboard}/>
      </Switch>
    </Router>
  );
}

export default App;
