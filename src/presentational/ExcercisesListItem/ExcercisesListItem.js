import React, { useState, useEffect } from 'react';

import { getApplications } from '../../redux/applications';
import { deleteExercise, getExerciseToEdit } from '../../redux/exercises';
import DeleteModal from '../../containers/ExercisesListModals/DeleteModal';
import EditNotAllowedModal from '../../containers/ExercisesListModals/EditNotAllowedModal';
import EditWarningModal from '../../containers/ExercisesListModals/EditWarningModal';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ExercisesListItem.css';

function ExercisesListItem ({ exercise }) {

  const dispatch = useDispatch();

  const allApplications = useSelector(store => store.applications.applications);
  
  const [showEditWarning, setEditWarning] = useState(false);
  const [showNoEditModal, setNoEditModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [deleteWarn, setDeleteWarn] = useState(false);
  const [successAlert, setSuccesssAlert] = useState(false);
  // STATE FOR MARKER LINES
  const [random, setRandom]= useState('');

  useEffect(() => {
    if (!random) {
      setRandom(randomMarker());
    }
  }, []);

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
    <>
      <Card className="text-center exercise-card">
        <Card.Header className="exercise-header">
          <div className="highlighted-text">
            {exercise.title.length > 26 ? exercise.title.slice(0, 26) + '...' : exercise.title}
          </div>
          <div className={'highlight-report' + ' ' + random} style={{marginTop: '-24px', background: '#f9e124'}}></div>
        </Card.Header>
        <Card.Body className="exercise-body">
          <Row className="exercise-firstRow">
            <Col sm={6}>Level {exercise.difficulty}</Col>
            <Col sm={6}>{exercise.duration/60000} min</Col>
          </Row>
          <Row>
            <Col sm={12} className="text-left">
              Created at {moment(exercise.created_at).format('LLL')} by { exercise.created_by.name }  
              {/* exercise.created_by.name */}
            </Col>

          </Row>
          <Row>
            <Col sm={12} className="text-left">
              {
                (exercise.updated_at && exercise.updated_by) &&
              `Updated at ${moment(exercise.updated_at).format('LLL')} by ${ exercise.updated_by.name}`
              }
            </Col>
           
          </Row>
        </Card.Body>
        <Card.Footer className="exercise-footer" >
          <div style={{borderRight: '3px solid black', width: '50%'}}>
            <Button className='exerciseEditBtn' onClick={handleEdit} variant="warning">Edit</Button>
          </div>
          <Button className='exerciseDeleteBtn' onClick={handleDelete} variant="danger">Delete</Button>
        </Card.Footer>
      </Card>
      {/* MODAL FOR DELETE */}
      <DeleteModal show={showDeleteModal} onHide={handleCloseDelete} handleDeleteExercise={handleDeleteExercise} deleteWarn={deleteWarn} successAlert={successAlert} exercise={exercise}/>
    
      {/* MODAL FOR CANNOT EDIT CANNOT DELETE */}
      <EditNotAllowedModal show={showNoEditModal} onHide={handleCloseNoEditDelete} exercise={exercise} handleCloseNoEditDelete={handleCloseNoEditDelete} />

      {/* MODAL FOR WARNING MESSAGE THAT EXERCISE IS BEING USED IN REPORT AND COMPLETED/EXPIRED APPLICATION */}
      <EditWarningModal show={showEditWarning} onHide={handleCloseEditWarning} handleContinue={handleContinue}/>
    </>
  );
}

export default ExercisesListItem;

// HELPER FUNCTION TO GET RANDOM POSTION OF THE MARKER AND USE EFFECT TO MAKE IT
function randomMarker () {
  const arr = ['h-r', 'h-r1', 'h-r2', 'h-r3', 'h-r4', 'h-r5', 'h-r6', 'h-r7', 'h-r8' ,'h-r9'];
  return arr[Math.floor(Math.random() * 10)];
}