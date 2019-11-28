import { combineReducers } from 'redux';

import authentication from './authentication';
import { connectRouter } from 'connected-react-router';
import getExercises from './getExercises';
import createExercise from './createExercise';

export default (history) => combineReducers({
  router: connectRouter(history),
  user: authentication,
  getExercises,
  createExercise
});
