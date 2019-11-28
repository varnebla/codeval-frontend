import React, { useState, useEffect } from 'react';

import ApplicationsList from '../../presentational/ApplicationsList/ApplicationsList';


import {Alert, Button, Modal, Form } from 'react-bootstrap';

import Select from 'react-dropdown-select';
// FIXING DROPDOWN SEARCH IN MODAL
import './Applications.css';

import { getExercises } from '../../redux/getExercises';
import { getApplications, createApplication } from '../../redux/applications';
import { useDispatch, useSelector } from 'react-redux';

function Applications () {
 
  const dispatch = useDispatch();
  const exercisesList = useSelector(store => store.getExercises.exercises);
  const allApplications = useSelector(store => store.applications.applications);

  const initialApplication = {
    applicationTitle: '',
    exercise: '',
    applicantEmail: '',
    token_duration: 'One Day'
  };

  const [showCreateModal, setCreateModal] = useState(false);
  const [successAlert, setSuccesssAlert] = useState(false);
  const [applicationInput, setApplicationInput] = useState(initialApplication);
  const [inputErrors, setInputError] = useState([]);

  function handleCreateApplication () {
    const errors = [];
    checkApplicationInput(applicationInput, errors);
    if (errors.length) {
      setInputError(errors);
    } else {
      dispatch(createApplication(applicationInput));
      setSuccesssAlert(true);
    } 
  }
  
  // HANDLING MODAL
  const handleClose = () => {
    setCreateModal(false);
    setInputError([]);
    setSuccesssAlert(false);
  };
  const handleShow = () => setCreateModal(true);
 
  // HANDLING EMAIL AND DURATION INPUTS
  function handleChange (e) {
    const updatingApplication = {...applicationInput};
    updatingApplication[e.target.id] = e.target.value;
    setApplicationInput(updatingApplication);
  }
  // SEPARATE FUNCTION FOR DROPDOWN FOR SIMPLICITY
  function handleChangeDropdown (e) {
    const updatingApplication = {...applicationInput};
    if (!e.target && e.length) {
      updatingApplication.exercise = e[0]._id;
      updatingApplication.applicationTitle = e[0].title;
      setApplicationInput(updatingApplication);
    } if (!e.length) {
      updatingApplication.exercise = '';
      updatingApplication.applicationTitle= '';
      setApplicationInput(updatingApplication);
    }
  }
  
  // GETTING EXERCISES FOR SEARCH DROPDOWN
  useEffect(()=> {
    dispatch(getExercises());
  }, []);

  // GETTING ALL APPLICATIONS
  useEffect(()=>{
    dispatch(getApplications());
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1>Applications</h1>
        <h2>Filter Needed</h2>
        <Button onClick={handleShow} variant="success">Create Application</Button>
      </div>
      <ApplicationsList allApplications={allApplications}/>
      <Modal
        size="lg"
        show={showCreateModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Please fill in application details below</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exercise">
              <Form.Label>Please select an exercise you would like to send to an applicant</Form.Label>
              <Select
                placeholder={'Select exercise...'}
                clearable={true}
                separator={true}
                labelField={'title'}
                searchBy={'title'}
                options={exercisesList}
                onChange={handleChangeDropdown}
              />
            </Form.Group>
            <Form.Group controlId="applicantEmail">
              <Form.Label>Please enter applicants email</Form.Label>
              <Form.Control onChange={handleChange} type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group controlId="token_duration">
              <Form.Label>Please select duration of the test</Form.Label>
              <Form.Control onChange={handleChange} as="select" >
                <option>One Day</option>
                <option>Three Days</option>
                <option>One Week</option>
              </Form.Control>
            </Form.Group>
          </Form>
          {!!inputErrors.length && <Alert  variant='danger'>{inputErrors[0]}</Alert>}
          { successAlert && <Alert style={{marginLeft: '15px', marginRight: '15px'}} variant="success">Application has been sent out to {applicationInput.applicantEmail}!</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!successAlert && <Button variant="success" onClick={handleCreateApplication}>
            Create
          </Button>}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Applications;

// HELPER FUNCTION FOR INPUT CHECKS
function checkApplicationInput (application, err) {
  if (application.applicationTitle === '') {
    err.push('Please select the exercise.');
  }
  if (!isValidEmail(application.applicantEmail)) {
    err.push('Please enter a valid applicants email.');  
  }
}

const isValidEmail = (email) => {
  const re = /^[^@]+@[^.]+[.][a-zA-z]{2,}$/;
  return re.test(email);
};