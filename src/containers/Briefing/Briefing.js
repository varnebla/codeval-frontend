import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
    if (name.length) setShowSub(!showSub);
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

  const string = 'Hi, welcome to Codeval!';
  const string2 = 'You\'ve been invited to participate on this exercise. Before submitting your name, we would like to introduce you to our code editor. At first sight you will find instructions and examples of the exercise. Be sure you understand them before start coding.';
  const string3 = 'At the top right you have hints, which will help you in case you get stuck. We all need help sometimes!';
  const string4 = 'If you need to test or log your code, simply click test button. Once you feel that your code is ready (or you are running out of the time) click submit button.';
  const string5 = `Once you submit your name, the exercise will start. You have ${applicant.exercise.duration/60000} min. Good luck with your assessment! `;

  return (
    <div className="briefing-page">
      <div className="briefing-container">
        <div className="briefing-info">
          <h1 className="briefing-title">How to proceed</h1>
          <p className="briefing-text">{string}</p>
          <p className="briefing-text">{string2}</p>
          <p className="briefing-text">{string3}</p>
          <p className="briefing-text">{string4}</p>
          <p className="briefing-text">{string5}</p>
        </div>
        <Form className="briefing-form" onSubmit={setModalSub}>
          <Form.Group className="briefing-form-group" controlId="name">
            {/* <Form.Label className="briefing-form-label">Name</Form.Label> */}
            <Form.Control value={name} type="text" placeholder="Enter your name" onChange={handleChange} className="briefing-form-control"/>
          </Form.Group>
          <Button type="submit" className="briefing-button">Start</Button>
        </Form> 
        <Modal  show={showSub} onHide={setModalSub} centered>
          <div className="briefing-modal">
            <p className="briefing-modal-text">Once you click the clock will start and you will have {applicant.exercise.duration/60000} min to solve it</p>
            <div className="briefing-modal-btn-container">
              <button onClick={setModalSub} className="briefing-modal-btn no">No</button>
              <button onClick={handleSubmit} className="briefing-modal-btn yes">Yes</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Briefing;