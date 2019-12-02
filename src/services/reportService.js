const BASE_URL = 'http://localhost:5000';

export default {
  // REPORT ID FROM APPLICATIONS, REVIEW IS AN OBJECT WIHT REVIEW AND NAME
  addReview: (token, reportId, review) => {
    return fetchRequestUpdate(`addReview/${reportId}`, token, review);
  }
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