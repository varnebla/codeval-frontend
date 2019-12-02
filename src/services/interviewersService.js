require('dotenv').config();


//const BASE_URL = process.env.DEVELOPING_BASE_URL;
const BASE_URL = 'http://localhost:5000';

export const getInterviewers = () => {
  const options = {
    method: 'GET',
    headers:{
      'Authorization': `BEARER ${localStorage.getItem('jwtToken')}`,
      'Content-Type': 'application/json'      
    }
  };
  return fetch(`${BASE_URL}/getInterviewers`, options)
    .then(response => response.json())
    .catch(error=> console.error(error)); //eslint-disable-line no-console
};

export const sendInvitation = (interviewer) => {
  const options = {
    method: 'POST', 
    body: JSON.stringify({interviewerEmail: interviewer}), // data can be `string` or {object}!
    headers:{
      'Authorization': `BEARER ${localStorage.getItem('jwtToken')}`,
      'Content-Type': 'application/json'      
    }
  };
  return fetch(`${BASE_URL}/inviteInterviewer`, options)
    .then(response => response.json())
    .catch(error=> console.error(error)); //eslint-disable-line no-console
};

export const updateInterviewer = (id, interviewerData) => {
  const options = {
    method: 'POST', 
    body: JSON.stringify(interviewerData), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  };
  return fetch(`${BASE_URL}/registerInterviewer/${id}`, options)
    .then(response => response.json())
    .catch(error=> console.error(error)); //eslint-disable-line no-console
};