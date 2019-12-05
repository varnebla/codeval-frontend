import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function DeleteModal (props) {

  return (
    <Modal show={props.show} onHide={props.onHide}>
      { props.deleteWarn
        ?
        <Modal.Body>Please be informed that this exercise is being used in report and/or completed/expired applications. Editing this exercise might cause...</Modal.Body>
        :
        <Modal.Body>Are you sure you would like to delete {props.exercise.title}?</Modal.Body>
      }
      <Modal.Footer>
        <Button variant="danger" onClick={props.handleDeleteExercise}>
            Delete
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
            Close
        </Button>
      </Modal.Footer>
      { props.successAlert && <Alert style={{marginLeft: '15px', marginRight: '15px'}} variant="success">Exercise has been deleted!</Alert>}
    </Modal>
  );
}

export default DeleteModal;

