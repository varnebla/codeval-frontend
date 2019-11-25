import React, {useState} from 'react';

import {sendLogin} from '../../redux/login';
import { useSelector, useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import history from '../../history';

function LogIn (props) {

  const initialState = useSelector(store => store.login.user);
  const serverErrors = useSelector(store => store.login.error);

  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  function handleSubmit (event) {
    event.preventDefault();
    const inputErrors = checkForm(user);
    if (inputErrors.length === 0) {
      dispatch(sendLogin(user))
        .then(()=> history.push('/dashboard'));
      
      
    } 
    setErrors(inputErrors);
  }

  function handleChange (event) {
    event.preventDefault();
    const newUser = {...user}; //Object.assign{{}, login}
    newUser[event.target.id] = event.target.value;
    setUser(newUser);
  }

  function checkForm (loginObject) {
    const newErrors = [];
    Object.keys(loginObject).forEach(key => {
      if (loginObject[key].trim() === '') newErrors.push(`The ${key} field shouldn't be empty.`);
      else isEmailInvalid(loginObject[key], key) &&
          newErrors.push('Email must be a valid email address');
    });
    return newErrors;
  }

  function isEmailInvalid (el, key) {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    return key === 'email' && !el.match(regEx);
  }
  

  return (
    <Modal {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Title>
        <h3>Log in</h3>
      </Modal.Title>
      <Modal.Body>
        <Container>
          <Row className= "justify-content-md-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" as={Col} sm="10">
                <Form.Label>Email adress</Form.Label>
                <Form.Control value={user.email} type="text" placeholder="Enter email" onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="password" as={Col} sm="10">
                <Form.Label>Password</Form.Label>
                <Form.Control value={user.password} type="password" placeholder="Password" onChange={handleChange} />
              </Form.Group>
              {
                (errors.length >0 || serverErrors) && <Alert variant="danger">{errors[0] || serverErrors}</Alert>
              }
              <Button variant="primary" type="submit">Submit</Button>
            </Form> 

          </Row>

        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default LogIn;