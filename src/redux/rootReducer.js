import { combineReducers } from 'redux';

import authentication from './authentication';
import { connectRouter } from 'connected-react-router';
import exercises from './exercises';
import applicant from './applicant';
import applications from './applications';

export default (history) => combineReducers({
  router: connectRouter(history),
  user: authentication,
  exercises,
  applications,
  applicant
});
