import ApiService from '../services/applicationService';

// CONSTANTS
const GET_APPLICATIONS = 'GET_APPLICATIONS';

// INITIAL STATE
const INITIAL_STATE = {
  applications: null
};


// ACTIONS
export const getApplications = () => async (dispatch) => {
  const token = localStorage.getItem('jwtToken');
  const allApplications = await ApiService.getAllApplication(token);
  dispatch({
    type: GET_APPLICATIONS,
    payload: allApplications
  });
};

// CREATING APPLICATION AND UPDATING CURRENT STATE
export const createApplication = (application) => async (dispatch) => {
  const token = localStorage.getItem('jwtToken');
  // CONVERTING TOKEN DURATION TO MILLISECONDS
  const convertedApplication = converToMillisec(application);
  await ApiService.postApplication(token, convertedApplication);
  const allApplications = await ApiService.getAllApplication(token);
  dispatch({
    type: GET_APPLICATIONS,
    payload: allApplications
  }); 
};

// UPDATING STATUS OF APPLICATION TO REVIEWS AND UPDATING THE LIST
export const updateStatus = (applicationId) => async (dispatch) => {
  const token = localStorage.getItem('jwtToken');
  await ApiService.reviewApplication(token, applicationId);
  const allApplications = await ApiService.getAllApplication(token);
  dispatch({
    type: GET_APPLICATIONS,
    payload: allApplications
  });
};

// REDUCER
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_APPLICATIONS:
    return {
      ...state,
      applications: action.payload
    };
  default:
    return state;
  }
};

// HELPER FUNCTION TO CONVERT DAYS TO MILISECONDS
function converToMillisec (appObj) {
  const newObj = {...appObj};
  if (appObj.token_duration === 'One Day') newObj.token_duration = 86400000;
  if (appObj.token_duration === 'Three Days') newObj.token_duration = 259200000;
  if (appObj.token_duration === 'One Week') newObj.token_duration = 604800000;
  return newObj;
}