import ApiService from '../services/exerciseService';

// CONSTANTS
const CREATE_EXERCISE = 'CREATE_EXERCISE';

// INITIAL STATE
const INITIAL_STATE = {
  exercise: {}
};

// ACTION
export const createExercise = (exercise) => async (dispatch) => {
  const token = localStorage.getItem('jwtToken');
  const newExercise = await ApiService.postExercise(token, exercise);
  dispatch({
    type: CREATE_EXERCISE,
    payload: newExercise
  });
};

// REDUCER
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_EXERCISE:
    return {
      ...state,
      exercise: action.payload
    };
  default:
    return state;
  }
};