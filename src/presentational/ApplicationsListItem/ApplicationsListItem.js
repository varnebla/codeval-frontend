import React, { useState } from 'react';

import ApiService from '../../services/reportService';

import {Alert, Card, Form, Button, ListGroup, Toast, Modal } from 'react-bootstrap';

// import { useDispatch } from 'react-redux';

import moment from 'moment';

function ApplicationsListItem ( { application }) {

  // FOR TESTING****************
  const fakeReport = {
    submittedCode: 'function multiply(num, num1){return num*num1}',
    exerciseStart: '14:30',
    exerciseName: 'Multply function',
    tests: [
      {
        title: 'return a number',
        passed: true,
      },
      {
        title: 'function accepts only numbers',
        passed: true,
      }
    ],
    hints: [ {
      title: 'check if inpust is a number',
      used: true,
      time: '14:35'
    }, 
    {
      title: 'input is 2 numbers',
      used: false,
      time: ''
    }
    ],
    passed: true,
    duration: '00:15',
    finalScore: 87,
    copyPaste: [
      {
        content: 'num * num1',
        time: '14:37'
      }
    ],
    testClicked: [
      {
        currentCode: 'function multiply(num, num1){console.log(num)}',
        tests: [
          {
            title: 'return a number',
            passed: false,
          },
          {
            title: 'function accepts only numbers',
            passed: false,
          }
        ],
        time: '14:32'
      }
    ],
    applicatntName: 'John Smith',
    reviews: [],
  };

  console.log(fakeReport);
  
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState([]);
  const [reviewsArray, setReviewsArray] = useState([]);

  function addReview (e) {
    e.preventDefault();
    const error = [];
    if (reviewComment === '') {
      error.push('Please write your review.');
      setReviewError(error);
    } else {
      const comment = reviewsArray;
      comment.push(e.target.parentElement.firstChild.value);
      setReviewsArray(comment);
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

  // TESTING ENDS HERE************
  const [showReport, setShowReport] = useState(false);
  const [reviewed, setReviewed] = useState(false); 

  const handleShowReport = () => setShowReport(true);
  const handleCloseReport = () => setShowReport(false);

  function handleReview () {
    const error = [];
    if (reviewComment === '') {
      error.push('You cannot mark this report as reviewed without leaving a review.');
      setReviewError(error);
    } else {
      setReviewError([]);
      setReviewed(true);
    }
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
        <Modal.Header style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <h4 >{fakeReport.applicatntName}</h4>
            <h4>{fakeReport.passed ? 'Passed' : 'Failed'}</h4>
            <h4>Score: {fakeReport.finalScore}</h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          {/* SUBMITTED CODE AND DURATION */}
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <h5>Submitted code</h5>
              <p>{fakeReport.submittedCode}</p>
            </div>
            <div>
              <p>Exercise has started at: {fakeReport.exerciseStart}</p>
              <p>Duration: {fakeReport.duration}</p>
            </div>
          </div>
          {/* HINTS USED */}
          <div>
            <h5>Hints</h5>
            {fakeReport && fakeReport.hints.map(hint => (
              <div key={hint.time} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <p>{hint.title}</p>
                </div>
                <div>
                  <p>Used: {hint.used ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p>Used At: {hint.used ? hint.time : 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
          {/* TESTS PASSED / FAILED */}
          <div>
            <h5>Tests</h5>
            {fakeReport && fakeReport.tests.map(test => (
              <div key={test.title} style={{display: 'flex', justifyContent: 'space-between'}}>
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
            {fakeReport && fakeReport.copyPaste.map(pasted => (
              <div key={pasted.content} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <p>{pasted.content}</p>
                </div>
                <div>
                  <p>{pasted.time}</p>
                </div>
              </div>
            ))}
          </div>
          {/* TEST BUTTON CLICKED WITH CONTENT */}
          <div>
            <h5>Code when test button was clicked</h5>
            {fakeReport && fakeReport.testClicked.map(clicked => (
              <div key={clicked.currentCode} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <p>{clicked.currentCode}</p>
                </div>
                <div>
                  <p>Clicked at: {clicked.time}</p>
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
          {/* ONCE SERVER IS SET UP FUN THIS FROM THE SERVER */}
          <div>
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

          </div>
        </Modal.Body>
        { reviewed && <Alert style={{marginLeft: '15px', marginRight: '15px'}} variant="success">Application has been marked as reviewed!</Alert>}
        { !!reviewError.length && <Alert style={{marginLeft: '15px', marginRight: '15px'}} variant="danger">{reviewError[0]}</Alert>}
        <Modal.Footer>
          { reviewed
            ?
            <Button variant="secondary" onClick={handleCloseReport}>Close</Button>
            :
            <Button variant="success" onClick={handleReview}>Reviewed</Button>
          }
        </Modal.Footer>
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