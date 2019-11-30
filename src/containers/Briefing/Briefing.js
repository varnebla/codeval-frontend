import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { startApplication } from '../../redux/applicant';

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

  return (
    <div className="briefing-page">
      <Container>
        <Row className= "justify-content-md-center">
          <div className="briefing-info">
            <h1>About the exercise</h1>
            <h2>Instructions</h2>
            <p>{applicant.exercise.instructions}</p>
            <h2>Examples</h2>
            <div>{applicant.exercise.hints.map((item, i) => <p key={i}>{item}</p>)}</div>
            <h2>Duration</h2>
            <p>{applicant.exercise.duration/60000} min</p>
          </div>
          <Form onSubmit={setModalSub}>
            <Form.Group controlId="name" as={Col} sm="10">
              <Form.Label>Name</Form.Label>
              <Form.Control value={name} type="text" placeholder="Enter name" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form> 
        </Row>
      </Container>
      <Modal show={showSub} onHide={setModalSub}>
        <p>Once you click the clock will start and you will have {applicant.exercise.duration/60000} min to solve it</p>
        <button onClick={setModalSub}>No</button>
        <button onClick={handleSubmit}>Yes</button>
      </Modal>
    </div>
  );
}

export default Briefing;