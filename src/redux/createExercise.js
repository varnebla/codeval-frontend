import ApiService from '../services/exerciseService';

// CONSTANTS
const CREATE_EXERCISE = 'CREATE_EXERCISE';
const FILL_IN_EXERCISE = 'FILL_IN_EXERCISE';

// INITIAL STATE
const INITIAL_STATE = {
  title: '',
  difficulty: 0,
  placeholderCode: '',
  tests: '',
  solution: '',
  hints: '',
  instructions: '',
  duration: ''
};

// ACTIONS
export const createExercise = (exercise) => async (dispatch) => {
  const token = localStorage.getItem('jwtToken');
  const newExercise = await ApiService.postExercise(token, exercise);
  dispatch({
    type: CREATE_EXERCISE,
    payload: newExercise
  });
};

export const fillInExercise = (exercise) => {
  return {
    type: FILL_IN_EXERCISE,
    payload: exercise
  };
};

// REDUCER
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_EXERCISE:
    return {
      ...state,
      ...action.payload
    };
  case FILL_IN_EXERCISE:
    return {
      ...state,
      ...action.payload
    };
  default:
    return state;
  }
};