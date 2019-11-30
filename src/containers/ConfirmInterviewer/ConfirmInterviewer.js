import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateInterviewer } from '../../services/interviewersService';
import { autoLogin } from '../../redux/authentication';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import './ConfirmInterviewer.css';

import passwordValidator from 'password-validator';

const pwSchema = new passwordValidator();
// adding properties to it which checks if password is valid
pwSchema
  .is().min(8)
  .is().max(20);
// .has().uppercase()
// .has().lowercase()
// .has().digits()
// .has().not().spaces();

function ConfirmInterviewer () {

  const interviewerId = useParams().id;
  const dispatch = useDispatch();

  const [interviewer, setInterviewer] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState([]);
  const [serverError, setServerError] = useState([]);

  function handleSubmit (event) {
    event.preventDefault();
    setIsLoading(true);
    const errors = checkForm(interviewer);
    if (errors.length === 0) {
      updateInterviewer(interviewerId, interviewer)
        .then(response => {
          if (!response) errors.push('Oops! Looks like something went wrong with the registration');
          else {
            if (response.error) { //ERRORS RELATED TO REGISTRATION
              errors.push(response.error); 
              setServerError(errors);
            }  
            else dispatch(autoLogin(response));
          }
        })
        .catch(error => console.error(error)); //eslint-disable-line no-console
    } else setIsLoading(false);
    setInputError(errors);
  }

  function handleChange (event) {
    event.preventDefault();
    const updatedInterviewer = {...interviewer};
    updatedInterviewer[event.target.id] = event.target.value;
    setInterviewer(updatedInterviewer);
  }

  function checkForm (interviewer) {
    const newErrors = [];
    const pwCheck = pwSchema.validate(interviewer.password, {list: true});
    if (interviewer.length === 0) newErrors.push('No fields should be empty'); //ANCHOR change it later because redux will give us an empty state
    Object.keys(interviewer).forEach(key => {
      if (interviewer[key].trim() === '') newErrors.push(`The field ${key} shouldn not be empty`);
    });
    if (pwCheck.length) {
      newErrors.push('Password has to be between 8 and 20 characters, it has to contain at least one lowercase and uppercase character and a digit');
    }
    if (interviewer.password !== interviewer.confirmPassword) {
      newErrors.push('Passwords have to be matching');  
    }
    return newErrors;
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Container className="container-box">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter the name" value={interviewer.name} onChange={handleChange}></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter the password" value={interviewer.password} onChange={handleChange}></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Confirm the password" value={interviewer.confirmPassword} onChange={handleChange}></Form.Control>
          </Form.Group>
          {
            (inputError.length > 0 || serverError.length > 0) &&
              <Alert  variant="danger">
                {inputError[0] || serverError}
              </Alert>
          }   
          {
            isLoading 
              ? <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading
              </Button>
              : <Button variant="primary" type="submit">Submit</Button>
          }
        </Container>
      </Form>
    </div>
  );
}

export default ConfirmInterviewer;