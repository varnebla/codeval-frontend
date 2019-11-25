import { combineReducers } from 'redux';

import stateButton from './tesing';
import registerCompany from './register';
import getExercises from './getExercises';
import createExercise from './createExercise';

export default combineReducers({
  logged: stateButton,
  registerCompany,
  getExercises,
  createExercise
});