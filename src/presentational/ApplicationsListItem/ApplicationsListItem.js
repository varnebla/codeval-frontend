import React, { useState } from 'react';

import {Alert, Card, Form, Button, ListGroup, Toast, Modal } from 'react-bootstrap';

import {addReviewToDb, updateStatus, deleteApplication} from '../../redux/applications';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

function ApplicationsListItem ( { application }) {
  
  const dispatch = useDispatch();
  
  const exercise = useSelector(store => store.exercises.listOfExercises).filter(el => el._id === application.exercise)[0];
  const user = useSelector(store => store.user.user);
  
  // SORTING REVIEWS BY THE TIME NEWEST AT THE TOP
  const sortedReviews = application.report && application.report.reviews.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  
  const status = whichStatus(application.status);

  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  // DELETE STATES
  const [deleteModal, setDeleteModal] = useState(false);
  const [noDeleteModal, setNoDeleteModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  

  // REPORT MODALS
  const handleShowReport = () => setShowReport(true);
  const handleCloseReport = () => {
    setShowReport(false);
    setReviewed(false);
  };

  // DELETE MODAL
  const handleCloseDelete = () => setDeleteModal(false);
  const handleShowDelete = () => setDeleteModal(true);
  // NO DELETE MODAL
  const handleCloseNoDelete = () => setNoDeleteModal(false);
  const handleShowNoDelete = () => setNoDeleteModal(true);
  
  // ADDING REVIEW TO DB
  function addReview (e) {
    e.preventDefault();
    const error = [];
    if (reviewComment === '') {
      error.push('Please write your review.');
      setReviewError(error);
    } else {
      const fullReview = {
        review: reviewComment,
        reviewerName: user.name
      };
      const reportId = application.report && application.report._id; 
      dispatch(addReviewToDb(fullReview, reportId));
      setReviewComment('');
      setReviewError([]);
    }
  }

  function handleReviewsInput (e) {
    e.preventDefault();
    let input = reviewComment;
    input = e.target.value;
    setReviewComment(input);
  }

  function handleReview () {
    const error = [];
    if (!sortedReviews.length) {
      error.push('You cannot mark this report as reviewed without leaving a review.');
      setReviewError(error);
    } else {
      const applicationId = application._id;
      dispatch(updateStatus(applicationId));
      setReviewError([]);
      setReviewed(true);
    }
  }
  // REMOVING THE APPLICATION
  function removeApplication () {
    setDeleteSuccess(true);
    dispatch(deleteApplication(application._id));
  }
  // CHECKING WHICH MODAL TO DISPLAY
  function handleDelete () {
    if (application.status === 'issued' || application.status === 'activated') {
      handleShowNoDelete();
    } else {
      handleShowDelete();
    }
  }

  return (
    <div style={{margin: '20px'}}>
      <Card >
        <ListGroup variant="flush">
          <ListGroup.Item variant={status}>
            <div style={{display: 'inline-flex', width: '75%', justifyContent: 'space-between'}}>
              <h5>Status: {application.status}</h5>
              <h6>Created by: {application.created_by.name}</h6>
              <h6>Created at: {moment(application.created_at).format('LLL')}</h6>
            </div>
          </ListGroup.Item>
          <ListGroup.Item variant={status}>
            <div style={{display: 'flex', width: '75%', justifyContent: 'space-between'}}>
              <h5>Applicant: {application.applicantName && application.applicantName}</h5>
              <h6>Email: {application.applicantEmail}</h6>
            </div>
          </ListGroup.Item >
          <ListGroup.Item variant={status}>
            <div style={{display: 'flex', flexDirection: 'row' , justifyContent: 'flex-end'}}>
              <Button variant='secondary' style={{marginRight: '5%'}} onClick={handleShowReport}>Report</Button>
              <Button onClick={handleDelete} variant='danger'>Delete</Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      {/* MODAL */}
      <Modal 
        show={showReport}
        onHide={handleCloseReport}
        size="lg"
      >
        <Modal.Header style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <h4 >{application.report && application.report.applicantName}</h4>
            <h4>{application.passed ? 'Passed' : 'Failed'}</h4>
            <h4>Score: {application.report && application.report.finalScore}</h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          {/* SUBMITTED CODE AND DURATION */}
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <h5>Submitted code</h5>
              <textarea 
                readOnly 
                rows={!!application.report && application.report.submittedCode.split('\n').length}
                style={{border: 'none', outline: 'none', resize: 'none'}}
                value={application.report && application.report.submittedCode}>
              </textarea>
            </div>
            <div>
              <h5>{exercise && exercise.title}</h5>
              <p>Duration: {exercise && moment.utc(exercise.duration).format('HH:mm')}</p>
              <p>Exercise has started at: {moment(application.startingTime).format('HH:mm')}</p>
              <p>Exercise has been submitted at: {moment(application.completionTime).format('HH:mm')} </p>
            </div>
          </div>
          {/* HINTS USED */}
          <div>
            <h5>Hints</h5>
            {application.report && application.report.hints.map(hint => (
              <div key={Math.floor(Math.random() * 10000)} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <p>{hint.title}</p>
                </div>
                <div>
                  <p>Used: {hint.used ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p>Used At: {hint.used ? moment(hint.time).format('HH:mm') : 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
          {/* TESTS PASSED / FAILED */}
          <div>
            <h5>Tests</h5>
            {application.report && application.report.tests.map(test => (
              <div key={test._id} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <p>{test.title}</p>
                </div>
                <div>
                  <p>{test.passed ? 'Passed' : 'Failed'}</p>
                </div>
              </div>
            ))}
          </div>
          {/* PASTED CODE */}
          <div>
            <h5>Code pasted into code editor</h5>
            {application.report && application.report.copyPaste.map(pasted => (
              <div key={pasted.content} style={{display: 'flex', justifyContent: 'space-between'}}>
                <textarea 
                  readOnly 
                  rows={ pasted.content.split('\n').length <= 3 ? 3 : pasted.content.split('\n').length}
                  style={{border: 'none', outline: 'none', resize: 'none'}}
                  value={pasted.content}>
                </textarea>
                <div>
                  <p>Pasted at: {moment(pasted.time).format('HH:mm')}</p>
                </div>
              </div>
            ))}
          </div>
          {/* TEST BUTTON CLICKED WITH CONTENT */}
          <div>
            <h5>Code when test button was clicked</h5>
            {application.report && application.report.testClicked.map(clicked => (
              <div key={clicked._id} style={{display: 'flex', justifyContent: 'space-between'}}>
                <textarea 
                  readOnly 
                  rows={ clicked.currentCode.split('\n').length}
                  style={{border: 'none', outline: 'none', resize: 'none'}}
                  value={clicked.currentCode}>
                </textarea>
                <div>
                  <p>Clicked at: {moment(clicked.time).format('HH:mm')}</p>
                </div>
              </div>
            ))}
          </div>
          {/* FORM FOR REVIEW INPUT */}
          <div>
            <Form>
              <Form.Group style={{marginLeft: '20px'}} controlId="examples">
                <Form.Label>Leave a review about the applicant</Form.Label>
                <span style={{display: 'flex'}}>
                  <Form.Control value={reviewComment} type="text" placeholder="Review" onChange={handleReviewsInput}/>
                  <button onClick={addReview}>Add</button>
                </span>
              </Form.Group>
            </Form>
          </div>
          {/* REVIEWS  */}
          <div>
            <h4>Reviews</h4>
            {!!sortedReviews && sortedReviews.map(review=> (
              <Toast key={Math.floor(Math.random() * 10000)} style={{maxWidth:'100%'}}>
                <Toast.Header closeButton={false}>
                  <strong className="mr-auto">Created by: {review.created_by}</strong>
                  <small>Created at: {moment(review.created_at).format('HH:mm')}</small>
                </Toast.Header>
                <Toast.Body>{review.content}</Toast.Body>
              </Toast>
            ))}
          </div>
          {/* MODAL BUTTONS */}
        </Modal.Body>
        { reviewed && <Alert style={{marginLeft: '15px', marginRight: '15px'}} variant="success">Application has been marked as reviewed!</Alert>}
        { !!reviewError.length && <Alert style={{marginLeft: '15px', marginRight: '15px'}} variant="danger">{reviewError[0]}</Alert>}
        <Modal.Footer>
          { application.status === 'reviewed'
            ?
            <Button variant="secondary" onClick={handleCloseReport}>Close</Button>
            :
            <Button variant="success" onClick={handleReview}>Reviewed</Button>
          }
        </Modal.Footer>
      </Modal>
      {/* MODAL FOR CANNOT CANNOT DELETE */}
      <Modal show={noDeleteModal} onHide={handleCloseNoDelete}>
        <Modal.Body>Oops, you cannot delete issued or active application!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNoDelete} >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* MODAL DELETE */}
      <Modal show={deleteModal} onHide={handleCloseDelete}>
        <Modal.Body>Are you sure you would like to delete this application?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={removeApplication}>
            Delete
          </Button>
        </Modal.Footer>
        { deleteSuccess && <Alert style={{marginLeft: '15px', marginRight: '15px'}} variant="success">Application has been deleted!</Alert>}
      </Modal>
    </div>
  );
}

export default ApplicationsListItem;

// FUNCTION FOR STATUS COLORS
function whichStatus (status) {
  if (status === 'issued') return 'warning';
  if (status === 'activated') return 'success';
  if (status === 'expired') return 'danger';
}