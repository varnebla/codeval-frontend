import ApiService from '../services/registerService';

// CONSTANTS
const REGISTER = 'REGISTER';
const ERROR = 'ERROR';
const CLEAR_COMPANY = 'CLEAR_COMPANY';
const CLEAR_ERROR = 'CLEAR_ERROR';

// INITIAL STATE

const INITIAL_STATE = {
  company: {
    companyName: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  user: null,
  error: null
};

// ACTION 
export const registerCompany = (company) => async (dispatch) => {
  // clearing previous erros from backend
  dispatch({type:CLEAR_ERROR});
  const userData = await ApiService.postCompany(company);
  if (userData.token) {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: REGISTER,
      payload: userData
    });
    // clearing company for company input boxes
    dispatch({
      type:CLEAR_COMPANY
    });
  } else {
    dispatch({
      type: ERROR,
      payload: userData.error
    });
  }
};

// REDUCER 
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REGISTER:
    return {
      ...state,
      user: action.payload
    };
  case ERROR:
    return {
      ...state,
      error: action.payload
    };
  case CLEAR_COMPANY:
    return {
      ...state,
      company: INITIAL_STATE.company
    };
  case CLEAR_ERROR:
    return {
      ...state,
      error: INITIAL_STATE.error
    }
  default:
    return state;
  }
};