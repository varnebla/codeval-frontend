import {sendLoginUser} from '../services/LoginService';
import jwtDecode from 'jwt-decode';


// CONSTANTS
const LOGIN = 'LOG_IN';
const ERROR = 'ERROR';
const CLEAR_LOGIN = 'CLEAR_LOGIN';
const CLEAR_ERROR = 'CLEAR_ERROR';
const LOGOUT = 'LOG_OUT';
const REFRESH = 'REFRESH';
// INITIAL STATE

const INITIAL_STATE = {
  token: localStorage.getItem('jwtToken'),
  isAuthenticated: false,
  user:{
    email: '',
    password: ''
  } ,
  error: null
};

// ACTION 

export const sendLogin = (loginObject) => 
  async (dispatch,getState, history) =>{
    dispatch({type: CLEAR_ERROR});
    const user = await sendLoginUser(loginObject);
    //SEND USER AND GET BACK THE TOKEN GENERATED IN THE SERVER
    if (user.token) {
      localStorage.setItem('jwtToken', user.token);
      const userData =jwtDecode(user.token);
      //SEND USER INFORMATION AND TOKEN TO REDUX STATE
      dispatch({
        type: LOGIN,
        isAuthenticated: true,
        user: userData
      });

      history.push('/dashboard');
    } else {
      //SEND ERROR FROM SERVER TO SHOW IN THE FORM
      dispatch({
        type: ERROR,
        error: user.error
      });
    } 
  };

export const sendLogout = () => 
  async (dispatch, getState, history) =>{
    //CHECK IF WE HAVE TOKEN
    if (localStorage.getItem('jwtToken')) { 
      localStorage.removeItem('jwtToken');
      dispatch({
        type: LOGOUT,
        token: null,
        isAuthenticated: false
      });
      history.push('/landing');
    }  
  };


//FUNCTION TO VERIFY AUTHENTICATION ANY TIME WE LOAD A PAGE
export const verifyToken = () => 
  (dispatch) =>{
    const token = localStorage.getItem('jwtToken');
    const decodedToken = token && jwtDecode(token);
    if (decodedToken && decodedToken.exp * 1000 > Date.now()) { //IS TOKEN EXPIRED?
      //SEND USER AND TOKEN TO STATE, SO REDUX WON'T LOOSE INFO WHEN LOADING ANY PAGE
      dispatch({
        type: REFRESH,
        token: localStorage.getItem('jwtToken'),
        user: decodedToken,
        isAuthenticated: true
      });
    } else {
      //NO TOKEN OR EXPIRED, AUTHENTICATION FAILED
      token && localStorage.removeItem('jwtToken');
      dispatch({
        type: REFRESH,
        token: null,
        user: INITIAL_STATE.user,
        isAuthenticated: false
      });
    } 
  };



// REDUCER

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      user: action.user,
      isAuthenticated: action.isAuthenticated
    };
  case LOGOUT:
    return {
      ...state,
      token: action.token,
      user: INITIAL_STATE.user,
      isAuthenticated: action.isAuthenticated
    };
  case REFRESH:
    return {
      ...state,
      token: action.token,
      user: action.user,
      isAuthenticated: action.isAuthenticated
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

