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
  hints: [],
  instructions: '',
  duration: '',
};

// ACTIONS
export const createExercise = (exercise) => async (dispatch, getState, history) => {
  const token = localStorage.getItem('jwtToken');
  // CONVERTING DURATION TO NR AND TO MILLISECONDS
  const exerciseToPost = Object.assign({}, exercise);
  exerciseToPost.duration = Number(exerciseToPost.duration) * 60000; 
  const newExercise = await ApiService.postExercise(token, exerciseToPost);
  dispatch({
    type: CREATE_EXERCISE,
    payload: newExercise
  });
  history.push('/dashboard/exercises');
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