import React, { useState } from 'react';

import { Form, Button, Alert } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

// Password Validator
import passwordValidator from 'password-validator';

// schema for password
const pwSchema = new passwordValidator();

// adding properties to it which checks if password is valid

pwSchema
  .is().min(8)
  .is().max(20)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces();


function Register () {

  const initialStateCompany = {
    companyName: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [companyDetails, setCompanyDetails] = useState(initialStateCompany);
  const [inputFeedback, setInputFeedback] = useState(false);
  const [inputError, setInputError] = useState([]);

  function handleCompanyForm (e) {
    e.preventDefault();
    const updatingCompanyDetails = {...companyDetails}; // Object.assign({}, companyDetails)
    updatingCompanyDetails[e.target.id] = e.target.value;
    setCompanyDetails(updatingCompanyDetails);
  }

  function handleSubmit (e) {
    e.preventDefault();
    const errors = [];
    // return an array of what is not matching
    setInputFeedback(true);
    const pwCheck = pwSchema.validate(companyDetails.password, {list: true});
    if (companyDetails.companyName === '') {
      errors.push('Company name has to be provided');
    }
    if (companyDetails.name === '') {
      errors.push('Full name has to be provided');
    }
    if (!isValidEmail(companyDetails.email)) {
      errors.push('Please enter a valid email');
    }
    if (companyDetails.password !== companyDetails.confirmPassword) {
      errors.push('Passwords have to be matching');  
    }
    if (pwCheck.length) {
      errors.push('Password has to be between 8 and 20 characters, it has to contain at least one lowercase and uppercase character and a digit');
    }
    setInputError(errors);
  }


  return (
    <div>
      <h1>Register</h1>
      <div style={{maxWidth: '50vw', margin: '3%'}}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="companyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control value={companyDetails.companyName} type="text" placeholder="Enter your company name" onChange={handleCompanyForm} />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control value={companyDetails.name} type="text" placeholder="Enter your full name" onChange={handleCompanyForm} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={companyDetails.email} type="text" placeholder="Enter email" onChange={handleCompanyForm} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control value={companyDetails.password} type="password" placeholder="Password" onChange={handleCompanyForm}/>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control value={companyDetails.confirmPassword} type="password" placeholder="Confirm password" onChange={handleCompanyForm} />
          </Form.Group>
          { inputFeedback && 
            <div>
              {
                inputError.length
                  ?
                  <Alert  variant="danger">
                    {inputError[0]}
                  </Alert>
                  :
                  <Alert  variant="success">
                     Email has been sent out to...
                  </Alert>
              }
            </div> 
          }  
          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </Form>
      </div> 
    </div>
  );
}

export default Register;



//  Helper function
const isValidEmail = (email) => {
  const re = /^[^@]+@[^.]+[.][a-zA-z]{2,}$/;
  return re.test(email);
};