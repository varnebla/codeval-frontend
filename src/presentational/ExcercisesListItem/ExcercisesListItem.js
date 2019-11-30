import React, { useState, useEffect } from 'react';

import {Alert, Card, Button, Modal } from 'react-bootstrap';

import { getApplications } from '../../redux/applications';
import { deleteExercise, getExerciseToEdit } from '../../redux/exercises';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

function ExercisesListItem ({ exercise }) {

  const dispatch = useDispatch();

  const allApplications = useSelector(store => store.applications.applications);
  
  const [showEditWarning, setEditWarning] = useState(false);
  const [showNoEditModal, setNoEditModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [deleteWarn, setDeleteWarn] = useState(false);
  const [successAlert, setSuccesssAlert] = useState(false);

  // DELETE MODAL
  const handleCloseDelete = () => setDeleteModal(false);
  const handleShowDelete = () => setDeleteModal(true);
  // NO EDIT/ DELETE MODAL
  const handleCloseNoEditDelete = () => setNoEditModal(false);
  const handleShowNoEditDelete = () => setNoEditModal(true);
  // EDIT WARNING MODAL
  const handleCloseEditWarning = () => setEditWarning(false);
  const handleShowEditWarning = () => setEditWarning(true);
  
  // EDITING FUCNTIONS
  function handleContinue () {
    dispatch(getExerciseToEdit(exercise._id));
  }
  
  function handleEdit () {
    const applications = allApplications.filter(application => application.exercise === exercise._id);
    const applicStatus = applications.filter(application => application.status === 'issued' || application.status === 'activated');
    if (applicStatus.length) {
      handleShowNoEditDelete ();
    } else if (applications.length && !applicStatus.length) {
      handleShowEditWarning();
    } else {
      dispatch(getExerciseToEdit(exercise._id));
    }
  }

  // DELETE FUNCTIONS
  function handleDeleteExercise () {
    dispatch(deleteExercise(exercise._id));
    setSuccesssAlert(true);
  }

  function handleDelete () {
    const applications = allApplications.filter(application => application.exercise === exercise._id);
    const applicStatus = applications.filter(application => application.status === 'issued' || application.status === 'activated');
    if (applicStatus.length) {
      handleShowNoEditDelete();
    } else if (applications.length && !applicStatus.length) {
      setDeleteWarn(true);
      handleShowDelete();
    } else {
      handleShowDelete();
    }
  }

  useEffect(()=> {
    dispatch(getApplications());
  }, []);

  return (
    <div>
      <Card className="text-center">
        <Card.Header>{exercise.title}</Card.Header>
        <Card.Body>
          <Card.Title>By: {exercise.created_by.name}</Card.Title>
          {/* CANT USE CARD BODY BECAUSE IT IS CREATED WITH <p> TAG AND P TAG CANNOT HAVE DECENDANTS */}
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <h6>
              {exercise.updated_by && `Updated by: ${exercise.updated_by.name}`}
            </h6>
            <p>
              {exercise.tests}
            </p>
          </div>
          <Button onClick={handleEdit} variant="warning">Edit</Button>
          <Button onClick={handleDelete} variant="danger">Delete</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div>
            Created at: {moment(exercise.created_at).format('LLL')} 
          </div>
          <div>
            {exercise.updated_at && `Updated at: ${moment(exercise.updated_at).format('LLL')}`}
          </div>
        </Card.Footer>
      </Card>
      {/* MODAL FOR DELETE */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete}>
        { deleteWarn
          ?
          <Modal.Body>Please be informed that this exercise is being used in report and/or completed/expired applications. Editing this exercise might cause...</Modal.Body>
          :
          <Modal.Body>Are you sure you would like to delete {exercise.title}?</Modal.Body>
        }
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteExercise}>
            Delete
          </Button>
        </Modal.Footer>
        { successAlert && <Alert style={{marginLeft: '15px', marginRight: '15px'}} variant="success">Exercise has been deleted!</Alert>}
      </Modal>
      {/* MODAL FOR CANNOT EDIT CANNOT DELETE */}
      <Modal show={showNoEditModal} onHide={handleCloseNoEditDelete}>
        <Modal.Body>Oops, you cannot edit or delete {exercise.title}, because it is being used in an issued or active application!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNoEditDelete} >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* MODAL FOR WARNING MESSAGE THAT EXERCISE IS BEING USED IN REPORT AND COMPLETED/EXPIRED APPLICATION */}
      <Modal show={showEditWarning} onHide={handleCloseEditWarning}>
        <Modal.Body>Please be informed that this exercise is being used in report and/or completed/expired applications. Editing this exercise might cause...</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditWarning}>Close</Button>
          <Button variant="warning" onClick={handleContinue}>Continue</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ExercisesListItem;