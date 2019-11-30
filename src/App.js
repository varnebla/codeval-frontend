
import { Router, Switch, Route, Redirect} from 'react-router-dom';
import React, { useEffect } from 'react';
import Landing from './presentational/Landing/Landing';
import Dashboard from './containers/Dashboard/Dashboard';
import ConfirmAccount from './containers/ConfirmAccount/ConfirmAccount';
import Briefing from './containers/Briefing/Briefing';
import Applicant from './containers/Applicant/Applicant';
import ConfirmInterviewer from './containers/ConfirmInterviewer/ConfirmInterviewer';
import history from './history';
import {useSelector, useDispatch} from 'react-redux';
import {verifyToken} from './redux/authentication';


import './App.css';

function App () {

  const dispatch = useDispatch();
  const logged = useSelector(store => store.user.isAuthenticated);

  //CHECK IF AUTHENTICATED
  useEffect(()=> { 
    dispatch(verifyToken());
  }, []);


  //AUTHENTICATED
  const appDashBoard =
  <Switch>
    <Route exact path='/'  >
      {(logged && localStorage.getItem('jwtToken')) && <Redirect to="/dashboard"/> }
    </Route>
    <Route path="/landing">
      {(logged && localStorage.getItem('jwtToken')) && <Redirect to="/dashboard"/> }
    </Route>    
    <Route path='/dashboard' component={Dashboard}/>
  </Switch>; 

  //NOT AUTHENTICATED
  const appLanding = 
    <Switch>
      <Route exact path='/'>
        {(!logged && !localStorage.getItem('jwtToken')) && <Redirect to="/landing"/> }
      </Route>
      <Route path='/dashboard'>
        {(!logged && !localStorage.getItem('jwtToken')) && <Redirect to="/landing"/> }
      </Route>
      <Route path="/landing" component={Landing}/>
      <Route path="/confirm/:id" component={ConfirmAccount}/>
      <Route path="/interviewer/:id" component={ConfirmInterviewer}/>
      <Route path="/assessment/briefing/:id" component={Briefing}/>
      <Route path="/assessment/applicant/:id" component={Applicant}/>
    </Switch>;
    
  return (
    <Router history={history}>
      {logged
        ? appDashBoard
        : appLanding}
    </Router>
  );
}

export default App;
