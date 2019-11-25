import { combineReducers } from 'redux';

import stateButton from './tesing';
import login from './login';
import { connectRouter } from 'connected-react-router';
import registerCompany from './register';

export default (history) => combineReducers({
  router: connectRouter(history),
  logged: stateButton,
  registerCompany,
  login
}  
);