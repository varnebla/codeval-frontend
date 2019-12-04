/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';

import {Alert, Container, Card, Col, Form, Button,  Toast, Modal, Row } from 'react-bootstrap';

import {addReviewToDb, updateStatus, deleteApplication} from '../../redux/applications';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import './ApplicationsListItem.css';
import '../../App.css';

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
    setReviewError([]);
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
    <div style={{margin: '1.6%'}}>
      <Card>
        
        <Card.Header variant={status}>
         
          <Row>
            <Col xs={4}>
              <p style={{margin: '0', textAlign: 'left'}}>{application.applicantEmail}</p>
            </Col>
            <Col xs={4}>
              <p style={{margin: '0', textAlign: 'center'}}>{application.status.toUpperCase()}</p>
            </Col>
            <Col xs={4}>
              <p style={{margin: '0', textAlign: 'right'}}>Score: {application.report && application.report.finalScore}</p>
            </Col>
          </Row>

         

        </Card.Header>
        <Card.Body style={{padding: '0 1.25rem'}}  variant={status}>
          <Row >
            <Col style={{borderRight: '3px solid black'}} xs={6}>
              <p style={{textAlign: 'left'}}>Applicant: {application.applicantName && application.applicantName}</p>
            </Col>
            <Col xs={6}>
              <p style={{textAlign: 'right'}}>{exercise && exercise.title}</p>
            </Col>
          </Row>
          <Row >
            <Col style={{borderRight: '3px solid black'}} xs={6}>
              <p style={{textAlign: 'left'}}>
                {!application.report
                  ? 
                  'Application has not been submitted yet'
                  :
                  application.passed ? 'Passed' : 'Failed'}
              </p>
            </Col>
            <Col xs={6}>
              <p style={{textAlign: 'right'}}>
                  Created by {application.created_by.name}, at: {moment(application.created_at).format('LLL')}
              </p>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer style={{padding: '0', display: 'flex'}}>
          <div style={{borderRight: '3px solid black', width: '50%'}}>
            <Button className="applicationReportBtn" variant='secondary' style={{ width: '100%', border: 'none'}} onClick={handleShowReport}>Report</Button>
          </div>  
          <Button className="applicationDeleteBtn" onClick={handleDelete} style={{ width: '50%', border: 'none' }} variant='danger'>Delete</Button> 
        </Card.Footer>
      </Card>

      {/* MODAL */}
      <Modal
        show={showReport}
        onHide={handleCloseReport}
        size="xl"
      > 
        <Container>
          <Modal.Header style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%',  padding: '0 15px'}}>
              <h4 >{application.report && application.report.applicantName}</h4>
              <h4>{application.passed ? 'Passed' : 'Failed'}</h4>
              <h4>Score: {application.report && application.report.finalScore}</h4>
            </div>
          </Modal.Header>
        </Container>
        <Modal.Body>
          {/* SUBMITTED CODE AND DURATION */}
          <Container className="applicationModalSubmittedCode applicationModalContainer" >
            <Row className="applicationModalRow">
              <Col xs={12} lg={8}>                
                <h5 className="highlighted-text">// Submitted code</h5> 
                <div className="highlight-report" style={{width:'220px'}}></div>
                <textarea
                  className='textAreaModal'
                  readOnly 
                  rows={!!application.report && application.report.submittedCode.split('\n').length}
                  value={application.report && application.report.submittedCode}>
                </textarea>
              </Col>
              <Col xs={12} lg={4} className="applicationModalLastCol">
                <h5>// {exercise && exercise.title}</h5>
                <p>Duration: {exercise && moment.utc(exercise.duration).format('HH:mm')}</p>
                <p>Exercise has started at: {moment(application.startingTime).format('HH:mm')}</p>
                <p>Exercise has been submitted at: {moment(application.completionTime).format('HH:mm')} </p>
              </Col>
            </Row>
          </Container>
          {/* HINTS USED */}
          <Container className="applicationModalContainer">
            <h5 className="highlighted-text">// Hints</h5>
            <div className="highlight-report" style={{width:'100px'}}></div>
            {application.report && application.report.hints.map(hint => (
              <Row key={Math.floor(Math.random() * 10000)} className="applicationModalRow" >
                <Col xs={12} lg={6}>
                  <p>{hint.title}</p>
                </Col>
                <Col xs={12} lg={2}>
                  <p>Used: {hint.used ? 'Yes' : 'No'}</p>
                </Col>
                <Col xs={12} lg={4} className="applicationModalLastCol">
                  <p>Used At: {hint.used ? moment(hint.time).format('HH:mm') : 'N/A'}</p>
                </Col>
              </Row>
            ))}
          </Container>
          {/* TESTS PASSED / FAILED */}
          <Container className="applicationModalContainer">
            <h5 className="highlighted-text">// Tests</h5>
            <div className="highlight-report" style={{width:'80px'}}></div>
            {application.report && application.report.tests.map(test => (
              <Row key={test._id} className="applicationModalRow" >
                <Col xs={12} lg={10}>
                  <p>{test.title}</p>
                </Col>
                <Col xs={12} lg={2} className="applicationModalLastCol">
                  <p>{test.passed ? 'Passed' : 'Failed'}</p>
                </Col>
              </Row>
            ))}
          </Container>
          {/* PASTED CODE */}
          <Container className="applicationModalContainer">
            <h5 className="highlighted-text">// Code pasted into code editor</h5>
            <div className="highlight-report"  style={{width:'300px'}}></div>
            {application.report && application.report.copyPaste.map(pasted => (
              <Row key={pasted.content} className="applicationModalRow">
                <Col xs={12} lg={9}>
                  <textarea
                    className='textAreaModal'
                    readOnly 
                    rows={ pasted.content.split('\n').length <= 3 ? 3 : pasted.content.split('\n').length}
                    value={pasted.content}>
                  </textarea>
                </Col>
                <Col xs={12} lg={3} className="applicationModalLastCol">
                  <p>Pasted at: {moment(pasted.time).format('HH:mm')}</p>
                </Col>
              </Row>
            ))}
          </Container>
          {/* TEST BUTTON CLICKED WITH CONTENT */}
          <Container className="applicationModalContainer">
            <h5 className="highlighted-text">// Code when test button was clicked</h5>
            <div className="highlight-report"  style={{width:'360px'}}></div>
            {application.report && application.report.testClicked.map(clicked => (
              <Row key={clicked._id} className="applicationModalRow" >
                <Col xs={12} lg={9}>
                  <textarea
                    className='textAreaModal'
                    readOnly 
                    rows={ clicked.currentCode.split('\n').length}
                    value={clicked.currentCode}>
                  </textarea> 
                </Col>
                <Col xs={12} lg={3} className="applicationModalLastCol">
                  <p>Clicked at: {moment(clicked.time).format('HH:mm')}</p>
                </Col>
              </Row>
            ))}
          </Container>
          {/* FORM FOR REVIEW INPUT */}
          <Container className="applicationModalContainer">
            <Form>
              <Form.Group controlId="examples">
                <h5 className="highlighted-text">// Leave a review about the applicant</h5>
                <div className="highlight-report"  style={{width:'380px'}}></div>
                <span style={{display: 'flex', marginTop:'10px'}}>
                  <Form.Control value={reviewComment} type="text" placeholder="Review" onChange={handleReviewsInput}/>
                  <button className='addBtnsApplicationExercise' variant="secondary" onClick={addReview}>Add</button>
                </span>
              </Form.Group>
            </Form>
          </Container>
          {/* REVIEWS  */}
          <Container className="applicationModalContainer">
            <h5 className="highlighted-text">// Reviews</h5>
            <div className="highlight-report"  style={{width:'100px', marginBottom:'10px'}}></div>
            {!!sortedReviews && sortedReviews.map(review=> (
              <Toast key={Math.floor(Math.random() * 10000)} className="appplicationModalToast" >
                <Toast.Header className="appplicationModalToastHeader" closeButton={false}>
                  <strong className="mr-auto">Created by: {review.created_by}</strong>
                  <small>Created at: {moment(review.created_at).format('HH:mm')}</small>
                </Toast.Header>
                <Toast.Body className="appplicationModalToastBody">{review.content}</Toast.Body>
              </Toast>
            ))}
          </Container>
          {/* MODAL BUTTONS */}
        </Modal.Body>
        { reviewed && <Alert className="reportAlert"  variant="success">Application has been marked as reviewed!</Alert>}
        { !!reviewError.length && <Alert className="reportAlert" variant="danger">{reviewError[0]}</Alert>}
        <Modal.Footer>
          { application.status === 'reviewed'
            ?
            <Button className="reportBtnCloseReviewed" variant="secondary" onClick={handleCloseReport}>Close</Button>
            :
            <Button className="reportBtnCloseReviewed" variant="success" onClick={handleReview}>Reviewed</Button>
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