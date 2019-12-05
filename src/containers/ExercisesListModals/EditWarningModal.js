import React from 'react'; 

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function EditWarningModal (props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Body>Please be informed that this exercise is being used in report and/or completed/expired applications. Editing this exercise might cause...</Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={props.handleContinue}>Continue</Button>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditWarningModal;

