import React, { useState } from 'react';

import {Alert, Card, Form, Button, ListGroup, Toast, Modal } from 'react-bootstrap';

import moment from 'moment';

function ApplicationsListItem ( { application }) {

  // FOR TESTING****************
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsArray, setReviewsArray] = useState([]);

  function addReview (e) {
    e.preventDefault();
    const comment = reviewsArray;
    comment.push(e.target.parentElement.firstChild.value);
    setReviewsArray(comment);
    setReviewComment('');
  }
  
  function handleReviewsInput (e) {
    e.preventDefault();
    let input = reviewComment;
    input = e.target.value;
    setReviewComment(input);

  }

  // TESTING ENDS HERE************
  const [showReport, setShowReport] = useState(false);
  const [reviewed, setReviewed] = useState(false); 

  const handleShowReport = () => setShowReport(true);
  const handleCloseReport = () => setShowReport(false);

  function handleReview () {
    setReviewed(true);
  }



  const status = whichStatus(application.status);

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
              <Button variant='danger'>Delete</Button>
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
        <Modal.Body>
          {/* FORM FOR REVIEW INPUT */}
          <Form>
            <Form.Group style={{marginLeft: '20px'}} controlId="examples">
              <Form.Label>Leave a review about the applicant</Form.Label>
              <span style={{display: 'flex'}}>
                <Form.Control value={reviewComment} type="text" placeholder="Review" onChange={handleReviewsInput}/>
                <button onClick={addReview}>Add</button>
              </span>
            </Form.Group>
          </Form>
          {/* ONCE SERVER IS SET UP FUN THIS FROM THE SERVER */}
          <h4>Reviews</h4>
          {!!reviewsArray.length && reviewsArray.map(review=> (
            <Toast key={Math.floor(Math.random() * 10000)} style={{maxWidth:'100%'}}>
              <Toast.Header closeButton={false}>
                <strong className="mr-auto">Created by:</strong>
                <small>Created at: </small>
              </Toast.Header>
              <Toast.Body>{review}</Toast.Body>
            </Toast>
          ))}
        </Modal.Body>
        <Modal.Footer>
          { reviewed
            ?
            <Button variant="secondary" onClick={handleCloseReport}>Close</Button>
            :
            <Button variant="success" onClick={handleReview}>Reviewed</Button>
          }
        </Modal.Footer>
        { reviewed && <Alert style={{marginLeft: '15px', marginRight: '15px'}} variant="success">Application has been marked as reviewed!</Alert>}
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