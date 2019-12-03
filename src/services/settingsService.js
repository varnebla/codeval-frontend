require('dotenv').config();


//const BASE_URL = process.env.DEVELOPING_BASE_URL;
const BASE_URL = 'http://localhost:5000';

export const getUserInfo = () => {
  const options = {
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `BEARER ${localStorage.getItem('jwtToken')}`
    }
  };
  return fetch(`${BASE_URL}/getProfile`, options)
    .then(response => {
      return response.json();
    })
    .catch(error => console.error(error)); //eslint-disable-line no-console
};
export const updateUserInfo = (updatedUser) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(updatedUser),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `BEARER ${localStorage.getItem('jwtToken')}`
    }
  };
  return fetch(`${BASE_URL}/updateProfile`, options)
    .then(response => response.json())
    .catch(error => console.error(error)); //eslint-disable-line no-console
};