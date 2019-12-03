import React, { useState, useEffect } from 'react';

import ApplicationsList from '../../presentational/ApplicationsList/ApplicationsList';

import {Alert, Button, Modal, Form, Dropdown, DropdownButton  } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';


import Select from 'react-dropdown-select';
// FIXING DROPDOWN SEARCH IN MODAL
import './Applications.css';

import { getExercises } from '../../redux/exercises';
import { getApplications, createApplication } from '../../redux/applications';
import { useDispatch, useSelector } from 'react-redux';

function Applications () {
 
  const dispatch = useDispatch();
  const exercisesList = useSelector(store => store.exercises.listOfExercises);
  const allApplications = useSelector(store => store.applications.applications);

  const initialApplication = {
    applicationTitle: '',
    exercise: '',
    applicantEmail: '',
    token_duration: 'One Day'
  };

  const [ applications, setApplications ] = useState([]);
  const [ loading, setLoading ] = useState(true);
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
  
  // GETTING EXERCISES FOR SEARCH DROPDOWN AND ALL APPLICATIONS
  useEffect(()=> {
    dispatch(getExercises());
    dispatch(getApplications());
  }, []);

  useEffect(() => {
    if (allApplications && exercisesList) {
      setApplications(allApplications);
      setLoading(false);
    }
  }, [allApplications, exercisesList]);

  const handleDateLow = () => {
    const newOrder = applications.sort((a,b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    setApplications([...newOrder]);
  }; 
  const handleDateHigh = () => {
    const newOrder = applications.sort((a,b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
    setApplications([...newOrder]);
  }; 

  const handleStatusLow = () => {
    const statuses = ['issued', 'activated', 'completed', 'reviewed', 'expired'];
    const newOrder = applications.sort((a,b) => {
      return statuses.indexOf(b.status) - statuses.indexOf(a.status);
    });
    setApplications([...newOrder]);
  };
  const handleStatusHigh = () => {
    const statuses = ['issued', 'activated', 'completed', 'reviewed', 'expired'];
    const newOrder = applications.sort((a,b) => {
      return statuses.indexOf(a.status) - statuses.indexOf(b.status);
    });
    setApplications([...newOrder]);
  };

  const handleScoreLow = () => {
    const newOrder = applications.sort((a,b) => {
      if (!a.report || !a.report.finalScore) return -1;
      else if (!b.report || !b.report.finalScore) return 1;
      else return b.report.finalScore - a.report.finalScore;
    });
    setApplications([...newOrder]);
  };
  const handleScoreHigh = () => {
    const newOrder = applications.sort((a,b) => {
      if (!b.report || !b.report.finalScore) return -1;
      else if (!a.report || !a.report.finalScore) return 1;
      else return a.report.finalScore - b.report.finalScore;
    });
    setApplications([...newOrder]);
  };

  return (
    <div>
      {
        loading
          ? <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          :<div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h1>Applications</h1>
              <DropdownButton
                title="Order applications by"
                variant="info"
                id="dropdown-variants-Info"
                key="Info"
              >
                <Dropdown.Item eventKey="1" onClick={handleDateLow}>Most recent</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={handleDateHigh}>Oldest</Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={handleStatusLow}>Lowest status</Dropdown.Item>
                <Dropdown.Item eventKey="4" onClick={handleStatusHigh}>Highest status</Dropdown.Item>
                <Dropdown.Item eventKey="5" onClick={handleScoreLow}>Lowest final score</Dropdown.Item>
                <Dropdown.Item eventKey="6" onClick={handleScoreHigh}>Highest final score</Dropdown.Item>
              </DropdownButton>
              <Button onClick={handleShow} variant="success">Create Application</Button>
            </div>
            <ApplicationsList allApplications={applications}/>
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
      } 
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