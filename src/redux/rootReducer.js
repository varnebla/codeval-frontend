import { combineReducers } from 'redux';

import stateButton from './tesing';
import registerCompany from './register';

export default combineReducers({
  logged: stateButton,
  registerCompany
}  
);