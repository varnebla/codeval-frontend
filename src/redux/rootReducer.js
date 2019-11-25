import { combineReducers } from 'redux';

import stateButton from './tesing';
import login from './login';
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
  router: connectRouter(history),
  logged: stateButton,
  login
}  
);