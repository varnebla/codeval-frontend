import {sendLoginUser} from '../services/LoginService';
import history from '../history';
import { push } from 'connected-react-router';

// CONSTANTS
const LOGIN = 'LOG_IN';
const ERROR = 'ERROR';
const CLEAR_LOGIN = 'CLEAR_LOGIN';
const CLEAR_ERROR = 'CLEAR_ERROR';
// INITIAL STATE

const INITIAL_STATE = {
  user:{
    email: '',
    password: ''
  } ,
  error: null
};

// ACTION 

export const sendLogin = (loginObject) => async (dispatch) =>{
  dispatch({type: CLEAR_ERROR});
  const user = await sendLoginUser(loginObject);
  if (user.token) {
    localStorage.setItem('jwtToken', user.token);

    dispatch({
      type: LOGIN,
      user: user
    });
    // console.log('LETS GO')
    // dispatch(push('/dashboard'));
  } else {
    dispatch({
      type: ERROR,
      error: user.error
    });
  } 
};


// REDUCER

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      user: action.user
    };
  case ERROR:
    return {
      ...state,
      error: action.error
    };
  case CLEAR_LOGIN: 
    return {
      ...state,
      user: INITIAL_STATE.user
    };
  case CLEAR_ERROR:
    return {
      ...state,
      error: INITIAL_STATE.error
    };
  default:
    return state;   
  }
};

