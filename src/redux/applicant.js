import ApiService from '../services/applicantService';

// CONSTANTS
const GET_APPLICATION = 'GET_APPLICATION';
const UPDATE_TEST = 'UPDATE_TEST';

// INITIAL STATE
const INITIAL_STATE = {
  situation: {}
};

// ACTION CREATORS
const getApplicationCreator = exercise => {
  return {
    type: GET_APPLICATION,
    exercise
  };
};

export const updateTestCreator = situation => {
  return {
    type: UPDATE_TEST,
    situation
  };
};

// ACTIONS THUNKS
export const getApplication = id => async (dispatch) => {
  const applicationData = await ApiService.getApplication(id);
  dispatch(getApplicationCreator(applicationData));
};

export const startApplication = (id, applicantName) => async (dispatch) => {
  const result = await ApiService.updateApplication(id, { applicantName });
  if (result.message) {
    const applicationData = await ApiService.getApplication(id);
    dispatch(getApplicationCreator(applicationData));
  }
};

export const submitApplication = (id, report) => async (dispatch) => {
  const result = await ApiService.submitApplication(id, report);
  if (result.message) {
    const applicationData = await ApiService.getApplication(id);
    dispatch(getApplicationCreator(applicationData));
  }
};

// REDUCERS
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_APPLICATION:
    return Object.assign({}, state, action.exercise);
  case UPDATE_TEST:
    return Object.assign({}, state, {
      situation: action.situation
    });
  default:
    return state;
  }
};