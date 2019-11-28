const BASE_URL = 'http://localhost:5000';

export default {
  getApplication: (id) => {
    return fetchRequestGet('getApplication', id);
  },
  updateApplication: (id, applicant) => {
    return fetchRequestPost('startApplication', id, applicant);
  }
};

// GET APPLICATION FROM DB BY THE ID
const fetchRequestGet = (url, id) => {
  return fetch(`${BASE_URL}/${url}/${id}`, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(error => {
    // eslint-disable-next-line no-console
      console.log(`${error} while fetching /${url}`);
    });
};

// UPDATING THE APPLICATION FROM DB BY THE ID
const fetchRequestPost = (url, id, applicant) => {
  return fetch(`${BASE_URL}/${url}/${id}`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(applicant)
  })
    .then(res => res.json())
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(`${error} while fetching /${url}/${id}`);
    });
};