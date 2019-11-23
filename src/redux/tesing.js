// CONSTANTS
const LOGIN = 'LOG_IN';
const LOGOUT = 'LOG_OUT';

// INITIAL STATE

const INITIAL_STATE = false;

// ACTION 

export const logIn = () => {
  return {
    type: LOGIN
  };
};

export const logOut = () => {
  return {
    type: LOGOUT
  }
};

// REDUCER

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return state = true;
  case LOGOUT:
    return state = false;
  default:
    return state;   
  }
};

