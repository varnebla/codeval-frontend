const BASE_URL = 'http://localhost:5000';

// /register

export default {
  postCompany: (company) => {
    return fetchRequest('register', company);
  }
};

// POST COMPANY THEN GET USER AND TOKEN
const fetchRequest = (url, company) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(company)
  })
    .then(res => res.json())
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(`${error} while fetching /${url}`);
    });
};

