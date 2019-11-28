import React, { useState } from 'react';

import {Alert, Card, Button, Modal } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

function Applications () {
 
  const dispatch = useDispatch();
  const exercisesList = useSelector(store => store.getExercises.exercises);

  const [showCreateModal, setCreateModal] = useState(false);
  const [successAlert, setSuccesssAlert] = useState(false);

  function handleCreateApplication () {
    
    setSuccesssAlert(true);
  }

  const handleClose = () => setCreateModal(false);
  const handleShow = () => setCreateModal(true);

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1>Applications</h1>
        <h2>Filter Needed</h2>
        <Button onClick={handleShow} variant="success">Create Application</Button>
      </div>
      <Modal
        size="lg"
        show={showCreateModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Please fill in application details below</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleCreateApplication}>
            Create
          </Button>
        </Modal.Footer>
        { successAlert && <Alert style={{marginLeft: '15px', marginRight: '15px'}} variant="success">Exercise has been deleted!</Alert>}
      </Modal>
    </div>
  );
}

export default Applications;