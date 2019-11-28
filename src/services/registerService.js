const BASE_URL = 'http://localhost:5000';

export default {
  postCompany: (company) => {
    return fetchRequest('register', company);
  }
};

// POST COMPANY THEN RECEIVE EMAIL
const fetchRequest = (url, company) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(company)
  })
    .then(res => res.json())
    .catch(error => console.error(`${error} while fetching /${url}`));// eslint-disable-line no-console
};

