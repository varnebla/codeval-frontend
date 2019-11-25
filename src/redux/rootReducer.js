import { combineReducers } from 'redux';

import stateButton from './tesing';
import login from './login';
import { connectRouter } from 'connected-react-router';
import registerCompany from './register';
import getExercises from './getExercises';
import createExercise from './createExercise';

export default (history) => combineReducers({
  router: connectRouter(history),
  logged: stateButton,
  registerCompany,
  getExercises,
  createExercise,
  login
});
