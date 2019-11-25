const BASE_URL = 'http://localhost:5000';

export default {
  getAllExercises: (token) => {
    return fetchRequestGet('getExercises', token);
  },
  postExercise: (token, exercise) => {
    return fetchRequestPost('createExercise', token, exercise);
  }
};

// GET EXERCISES FROM THE DB WITH TOKEN 
const fetchRequestGet = (url, token) => {
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
// POST EXERCISE TO DB WITH TOKEN
const fetchRequestPost = (url, token, exercise) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: 'POST',
    headers:{
      'Authorization': `BEARER ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(exercise)
  })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(`${error} while fetching /${url}`);
    });
};