import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import history from '../../history';
import { getApplication, startApplication } from '../../redux/applicant';

function Briefing () {

  const dispatch = useDispatch();
  const application = useSelector(store => store.applicant);

  const { id } = useParams();

  const [ loading, setLoading ] = useState(true);
  const [ name, setName ] = useState('');

  const setLoad = () => setLoading(false);

  const handleChange = event => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name.length) {
      dispatch(startApplication(id, name));
      history.push(`/assessment/applicant/${id}`);
    }
  };

  useEffect(() => {
    setTimeout(setLoad, 2000);
    dispatch(getApplication(id));
  }, []);

  return (
    <Router>
      <div className="briefing-page">
        {
          loading
            ? <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            : <Container>
              <Row className= "justify-content-md-center">
                <div className="briefing-info">
                  <h1>About the exercise</h1>
                  <h2>Instructions</h2>
                  <p>{application.exercise.instructions}</p>
                  <h2>Examples</h2>
                  <div>{application.exercise.hints.map((item, i) => <p key={i}>{item}</p>)}</div>
                  <h2>Duration</h2>
                  <p>{application.exercise.duration/60000} min</p>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name" as={Col} sm="10">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} type="text" placeholder="Enter name" onChange={handleChange} />
                  </Form.Group>
                  <Button variant="primary" type="submit">Submit</Button>
                </Form> 
              </Row>
            </Container>
        }
      </div>
    </Router>
  );
}

export default Briefing;