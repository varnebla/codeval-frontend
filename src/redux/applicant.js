import ApiService from '../services/applicantService';

// CONSTANTS
const GET_APPLICATION = 'GET_APPLICATION';

// INITIAL STATE
const INITIAL_STATE = {
  application: null
};

// ACTION CREATORS
const getApplicationCreator = exercise => {
  return {
    type: GET_APPLICATION,
    exercise
  };
};

// ACTIONS
export const getApplication = id => async (dispatch) => {
  const applicationData = await ApiService.getApplication(id);
  dispatch(getApplicationCreator(applicationData));
};

// REDUCERS
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_APPLICATION:
    return Object.assign({}, state, {
      application: action.exercise
    });
  default:
    return state;
  }
};