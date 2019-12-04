import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { startApplication } from '../../redux/applicant';
import './Briefing.css';

function Briefing () {

  const dispatch = useDispatch();
  const applicant = useSelector(store => store.applicant);

  const [ name, setName ] = useState('');
  const [ showSub, setShowSub ] = useState(false);

  const setModalSub = (e) => {
    if (e) e.preventDefault();
    setShowSub(!showSub);
  };

  const handleChange = event => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name.length) {
      dispatch(startApplication(applicant._id, name));
    }
  };

  const string = `Hello, you've been invited to participate on this exercise, the first thing you need to do is enter your name. Once you submit the name the exercise will start. You have ${applicant.exercise.duration/60000} min to do it so be ready once you click to start. At the top you will have three buttons, one to get a hint, don't worry about using them, we all need help sometime :). Another will have the instructions of the exercise, be sure to understand everything before you start coding. The last one will be the submit button. Once you submit your assessment the company will recieve an email. At the left you have the code editor where you will code, and at the right you have a console to see which tests you're passing and if you fail them why you're failing them. If you want to test your code just press the test button. Good luck with your assessment!`;

  return (
    <div className="briefing-page">
      <div className="briefing-container">
        <div className="briefing-info">
          <h1 className="briefing-title">How to proceed</h1>
          <p className="briefing-text">{string}</p>
        </div>
        <Form className="briefing-form" onSubmit={setModalSub}>
          <Form.Group className="briefing-form-group" controlId="name">
            {/* <Form.Label className="briefing-form-label">Name</Form.Label> */}
            <Form.Control value={name} type="text" placeholder="Enter name" onChange={handleChange} className="briefing-form-control"/>
          </Form.Group>
          <Button type="submit" className="briefing-button">Submit</Button>
        </Form> 
        <Modal  show={showSub} onHide={setModalSub} centered>
          <div className="briefing-modal">
            <p className="briefing-modal-text">Once you click the clock will start and you will have {applicant.exercise.duration/60000} min to solve it</p>
            <div className="briefing-modal-btn-container">
              <button onClick={setModalSub} className="briefing-modal-btn">No</button>
              <button onClick={handleSubmit} className="briefing-modal-btn">Yes</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Briefing;