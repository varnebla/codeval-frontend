import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, Redirect } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';

import Applicant from '../Applicant/Applicant';

import { instructions, examples, instruccions } from './text';

function Briefing () {

  const [ loading, setLoading ] = useState(true);

  // const dispatch = useDispatch();
  const { token } = useParams();

  const setLoad = () => setLoading(false);
  const [ name, setName ] = useState('');
  const [ result, setResult ] = useState('');
  const [ submitted, setSubmitted ] = useState(false);

  const handleChange = event => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('hello');
    setSubmitted(true);
    if (name.length) {
      setResult(name);
    }
  };

  useEffect(() => {
    console.log(token);
    setTimeout(setLoad, 2000);
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
                  <p>{instructions}</p>
                  <h2>Examples</h2>
                  <div>{examples.split('\n').map((item, i) => <p key={i}>{item}</p>)}</div>
                  <h2>Duration</h2>
                  <p>10 min</p>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name" as={Col} sm="10">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} type="text" placeholder="Enter name" onChange={handleChange} />
                  </Form.Group>
                  {/* {
                    (name.length === 0 && submitted) && <Alert variant="danger">The name field shouldnt be empty.</Alert>
                  } */}
                  {
                    name.length
                      ? <Button variant="primary" type="submit"><Link to={`/${token}/exercise`}>Submit</Link></Button>
                      : <Button variant="primary" type="submit" disabled>Submit</Button>
                  }
                </Form> 
              </Row>
            </Container>
        }
      </div>
      
    </Router>

  );
}

export default Briefing;