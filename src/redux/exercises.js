import ApiService from '../services/exerciseService';

// CONSTANTS
const FILL_IN_EXERCISE = 'FILL_IN_EXERCISE';
const GET_EXERCISE = 'GET_EXERCISE';
const EDIT_EXERCISE = 'EDIT_EXERCISE';


// INITIAL STATE
const INITIAL_STATE = {
  exerciseCreate: {
    title: '',
    difficulty: 0,
    placeholderCode: '',
    tests: '',
    solution: '',
    hints: [],
    instructions: '',
    duration: '',
    examples: []
  },
  listOfExercises: null
};

// ACTIONS
// CREATING AN EXERCISE
export const createExercise = (exercise) => async (dispatch, getState, history) => {
  const token = localStorage.getItem('jwtToken');
  // CONVERTING DURATION TO NR AND TO MILLISECONDS
  const exerciseToPost = Object.assign({}, exercise);
  exerciseToPost.duration = Number(exerciseToPost.duration) * 60000; 
  await ApiService.postExercise(token, exerciseToPost);
  history.push('/dashboard/exercises');
};

// FILLING THE EXERCISE WITH THE DATA
export const fillInExercise = (exercise) => {
  return {
    type: FILL_IN_EXERCISE,
    payload: exercise
  };
};

// GETTING ALL EXERCISES
export const getExercises = () => async (dispatch) => {
  // getting the token to access exercises from DB
  const token = localStorage.getItem('jwtToken');
  const exercisesData = await ApiService.getAllExercises(token);
  dispatch({
    type: GET_EXERCISE,
    payload: exercisesData
  });
};

// DELETING EXERCISE AND UPDATING STATE
export const deleteExercise = (exerciseId) => async (dispatch) =>{
  const token = localStorage.getItem('jwtToken');
  await ApiService.deleteExerciseFromDb(token, exerciseId);
  const exercisesData = await ApiService.getAllExercises(token);
  dispatch({
    type: GET_EXERCISE,
    payload: exercisesData
  });
};

// GETTING EXERCISE TO UPDATE
export const getExerciseToEdit = (exerciseId) => async (dispatch, getState, history) => {
  const token = localStorage.getItem('jwtToken');
  const oneExercise = await ApiService.getOneExercise(token, exerciseId);
  // CONVERTING DURATION BACK TO STRING AND MINUTES
  oneExercise.duration = String(oneExercise.duration / 60000);
  dispatch({
    type: EDIT_EXERCISE,
    payload: oneExercise
  });
  history.push(`/dashboard/editExercise/${exerciseId}`);
};

// SENDING UPDATED EXERCISE
export const updateExercise = (exercise) => async (dispatch, getState, history) => {
  const token = localStorage.getItem('jwtToken');
  const exerciseToUpdate = Object.assign({}, exercise);
  exerciseToUpdate.duration = Number(exerciseToUpdate.duration) * 60000;
  ApiService.updateExercise(token, exerciseToUpdate);
  history.push('/dashboard/exercises');
};

// REDUCER
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FILL_IN_EXERCISE:
    return {
      ...state,
      exerciseCreate: action.payload
    };
  case GET_EXERCISE:
    return {
      ...state,
      listOfExercises: action.payload
    };
  case EDIT_EXERCISE:
    return {
      ...state,
      exerciseCreate: action.payload
    };
  default:
    return state;
  }
};