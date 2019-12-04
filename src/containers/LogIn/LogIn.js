import React, {useState} from 'react';

import {sendLogin} from '../../redux/authentication';
import { useSelector, useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

function LogIn (props) {

  const initialState = useSelector(store => store.user.user);
  const serverErrors = useSelector(store => store.user.error);

  //STATE FOR THE INPUT VALUES, SO WE CONTROL THE CHANGES AND SUBMIT
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  function handleSubmit (event) {
    event.preventDefault();
    const inputErrors = checkForm(user);   
    if (inputErrors.length === 0)
      dispatch(sendLogin(user));    
    setErrors(inputErrors);
  }


  function handleChange (event) {
    event.preventDefault();
    const newUser = {...user}; //SAME AS Object.assign{{}, login}
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
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            Log in
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form.Group controlId="email" as={Col} >
              <Form.Label>Email adress</Form.Label>
              <Form.Control value={user.email} type="text" placeholder="Enter email" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="password" as={Col}>
              <Form.Label>Password</Form.Label>
              <Form.Control value={user.password} type="password" placeholder="Password" onChange={handleChange} />
            </Form.Group>
            {
              (errors.length >0 || serverErrors) && <Alert variant="danger">{errors[0] || serverErrors}</Alert>
            }

          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">Submit</Button>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>          
        </Modal.Footer>
      </Form> 
    </Modal>
  );
}

export default (LogIn);