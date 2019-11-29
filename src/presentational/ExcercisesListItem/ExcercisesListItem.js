import React, { useState } from 'react';

import {Alert, Card, Button, Modal } from 'react-bootstrap';

import { deleteExercise, getExerciseToEdit } from '../../redux/exercises';
import { useDispatch } from 'react-redux';

import moment from 'moment';

function ExercisesListItem ({ exercise }) {

  const dispatch = useDispatch();

  const [showDeleteModal, setDeleteModal] = useState(false);
  const [successAlert, setSuccesssAlert] = useState(false);

  function handleDeleteExercise () {
    dispatch(deleteExercise(exercise._id));
    setSuccesssAlert(true);
  }

  const handleClose = () => setDeleteModal(false);
  const handleShow = () => setDeleteModal(true);

  function handleEdit () {
    dispatch(getExerciseToEdit(exercise._id));
  }

  return (
    <div>
      <Card className="text-center">
        <Card.Header>{exercise.title}</Card.Header>
        <Card.Body>
          <Card.Title>By: {exercise.created_by.name}</Card.Title>
          <Card.Text>
            {exercise.tests}
          </Card.Text>
          <Button onClick={handleEdit} variant="warning">Edit</Button>
          <Button onClick={handleShow} variant="danger">Delete</Button>
        </Card.Body>
        <Card.Footer className="text-muted">Created at: {moment(exercise.created_at).format('LLL')} </Card.Footer>
      </Card>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Body>Are you sure you would like to delete {exercise.title}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteExercise}>
            Delete
          </Button>
        </Modal.Footer>
        { successAlert && <Alert style={{marginLeft: '15px', marginRight: '15px'}} variant="success">Exercise has been deleted!</Alert>}
      </Modal>
    </div>
  );
}

export default ExercisesListItem;