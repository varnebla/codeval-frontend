const BASE_URL = 'http://localhost:5000';

export default {
  postApplication: (token, application) => {
    return fetchRequestCreate('createApplication', token, application);
  },
  getAllApplication: (token) => {
    return fetctRequestGet('getApplications', token);
  },
  reviewApplication: (token, applicationId) => {
    return fetchRequesUpdateStatus(`setReviewed/${applicationId}`, token);
  },
  addReview: (token, reportId, review) => {
    return fetchRequestUpdate(`addReview/${reportId}`, token, review);
  },
  deleteApplicationFromDb: (token, applicationId) => {
    return fetchRequesDelete(`deleteApplication/${applicationId}`, token);
  }
};

// POST APPLICATION TO DB
const fetchRequestCreate = (url, token, application) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: 'POST',
    headers:{
      'Authorization': `BEARER ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(application)
  })
    .catch(error => {
    // eslint-disable-next-line no-console
      console.log(`${error} while fetching /${url}`);
    });
};

//GET ALL APPLICATIONS
const fetctRequestGet = (url, token) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: 'GET',
    headers:{
      'Authorization': `BEARER ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(error => {
    // eslint-disable-next-line no-console
      console.log(`${error} while fetching /${url}`);
    });
}; 

// UPDATE APPLICATION TO REVIEWED
const fetchRequesUpdateStatus = (url, token) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: 'POST',
    headers:{
      'Authorization': `BEARER ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .catch(error => {
    // eslint-disable-next-line no-console
      console.log(`${error} while fetching /${url}`);
    });
};
// UPDATE REPORT WITH REVIEW/COMMENTS
const fetchRequestUpdate = (url, token, review) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: 'POST',
    headers:{
      'Authorization': `BEARER ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  })
    .catch(error => {
    // eslint-disable-next-line no-console
      console.log(`${error} while fetching /${url}`);
    });
};
// DELETE APPLICATION 
const fetchRequesDelete = (url, token) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: 'DELETE',
    headers:{
      'Authorization': `BEARER ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .catch(error => {
    // eslint-disable-next-line no-console
      console.log(`${error} while fetching /${url}`);
    });
};