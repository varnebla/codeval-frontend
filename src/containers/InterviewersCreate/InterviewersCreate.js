import React, { useState } from 'react';
import { sendInvitation } from '../../services/interviewersService';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function InterviewersCreate (props) {

  const [interviewer, setInterviewer] = useState({
    email: '',
    confirmEmail: ''
  });
  const [inputError, setInputError] = useState([]);
  const [serverError, setServerError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputFeedback, setInputFeedback] = useState([]); 

  function handleSubmit (event) {
    event.preventDefault();
    setIsLoading(true);
    const errors = checkForm(interviewer);
    if (errors.length === 0) {
      sendInvitation(interviewer.email)
        .then(response => {
          if (!response) errors.push('Oops! Looks like something went wrong with the invitation');
          else {            
            if (response.error) { //ERRORS RELATED TO REGISTRATION
              errors.push(response.error); 
              setServerError(errors);
            } 
            else setInputFeedback(response.message); //SUCCESS
          }
          setIsLoading(false);
        })
        .catch(error => console.log(error));//eslint-disable-line no-console
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
    //if (interviewer.length === 0) newErrors.push('No fields should be empty');
    Object.keys(interviewer).forEach(key => {
      if (interviewer[key].trim() === '') newErrors.push('No fields should be empty');
      else isEmailInvalid(interviewer[key], key) &&
          newErrors.push('Email fields must have a valid email address');
    });
    if (newErrors.length === 0 && interviewer.email !== interviewer.confirmEmail) //IF STILL NO ERRORS, CHECK IF BOTH FIELDS HAVE THE SAME VALUE
      newErrors.push('Emails should match');
    return newErrors;
  }

  return (
    <Modal {...props}
      size="md"
      aria-labelledby="contained-moda-title-vcenter"
      centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Invite interviewer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="email">
            <Form.Label>Interviewer email</Form.Label>
            <Form.Control placeholder="Enter the email" value={interviewer.email} onChange={handleChange}></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmEmail">
            <Form.Label>Confirm email</Form.Label>
            <Form.Control placeholder="Confirm the email" value={interviewer.confirmEmail} onChange={handleChange}></Form.Control>
          </Form.Group>
          { inputFeedback.length >0 
            ? <Alert  variant="success">
              {inputFeedback}. An email has been sent out to {interviewer.email}
            </Alert>
            : (inputError.length > 0 || serverError.length > 0) &&
              <Alert  variant="danger">
                {inputError[0] || serverError}
              </Alert>
          }   
        </Modal.Body>
        <Modal.Footer>
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
              : !inputFeedback.length &&
              <Button variant="primary" type="submit">Send invitation</Button>
          }
          <Button variant="secondary" onClick={props.onHide}>Close</Button>          
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default InterviewersCreate;

//  HELPER FUNCTIONS
const isEmailInvalid = (el) => {
  const regEx = /^[^@]+@[^.]+[.][a-zA-z]{2,}$/;
  return !el.match(regEx);
};