import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

import { registerCompany } from '../../redux/register';
import { useDispatch, useSelector } from 'react-redux';
import passwordValidator from 'password-validator';

const pwSchema = new passwordValidator();
// adding properties to it which checks if password is valid
pwSchema
  .is().min(8)
  .is().max(20);
  
// WILL DECIDE ON PASSWORD DIFFICULTY
// .has().uppercase()
// .has().lowercase()
// .has().digits()
// .has().not().spaces();

function Register (props) {

  const dispatch = useDispatch();

  const serverError = useSelector(store => store.registerCompany.error);
  const company = useSelector(store => store.registerCompany.company);

  const [companyDetails, setCompanyDetails] = useState(company);
  const [inputFeedback, setInputFeedback] = useState(false);
  const [inputError, setInputError] = useState([]);

  function handleCompanyForm (e) {
    e.preventDefault();
    const updatingCompanyDetails = {...companyDetails}; // Object.assign({}, companyDetails)
    updatingCompanyDetails[e.target.id] = e.target.value;
    setCompanyDetails(updatingCompanyDetails);
  }

  async function handleSubmit (e) {
    e.preventDefault();
    const errors = [];
    // return an array of what is not matching
    const pwCheck = pwSchema.validate(companyDetails.password, {list: true});
    // helper function for errors
    areInputsValid(companyDetails, errors);
    if (pwCheck.length) {
      errors.push('Password has to be between 8 and 20 characters, it has to contain at least one lowercase and uppercase character and a digit');
    }
    if (!errors.length) {
      await dispatch(registerCompany(companyDetails));
    } 
    setInputError(errors);
    setInputFeedback(true);
  }


  return (
    <Modal {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Title>
        <h3>Register</h3>
      </Modal.Title>
      <Modal.Body>
        <Container>
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
                    inputError.length || serverError
                      ?
                      <Alert  variant="danger">
                        {inputError[0] || serverError}
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
        </Container>
      </Modal.Body>

    </Modal>
    // <div>
    //   <h1>Register</h1>
    //   <div style={{maxWidth: '50vw', margin: '3%'}}>
    //   </div> 
    // </div>
  );
}

export default Register;

//  HELPER FUNCTIONS
const isValidEmail = (email) => {
  const re = /^[^@]+@[^.]+[.][a-zA-z]{2,}$/;
  return re.test(email);
};

const areInputsValid = (company, err) => {
  if (company.companyName === '') {
    err.push('Company name has to be provided');
  }
  if (company.name === '') {
    err.push('Full name has to be provided');
  }
  if (!isValidEmail(company.email)) {
    err.push('Please enter a valid email');
  }
  if (company.password !== company.confirmPassword) {
    err.push('Passwords have to be matching');  
  }
};

