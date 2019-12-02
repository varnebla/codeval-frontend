import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function EditNotAllowedModal (props) {

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Body>Oops, you cannot edit or delete {props.exercise.title}, because it is being used in an issued or active application!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseNoEditDelete} >
            Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditNotAllowedModal;

