import ApiService from '../services/exerciseService';

// CONSTANTS
const GET_EXERCISE = 'GET_EXERCISE';

// INITAL STATE

const INITIAL_STATE = {
  exercises: null
};

// ACTION
export const getExercises = () => async (dispatch) => {
  // getting the token to access exercises from DB
  const token = localStorage.getItem('jwtToken');
  const exercisesData = await ApiService.getAllExercises(token);
  dispatch({
    type: GET_EXERCISE,
    payload: exercisesData
  });
};

// REDUCER
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_EXERCISE:
    return {
      ...state,
      exercises: action.payload
    };
  default:
    return state;
  }
};