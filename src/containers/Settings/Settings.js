import React, { useEffect, useState } from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {sendLogout} from '../../redux/authentication';
import {getUserInfo, updateUserInfo} from '../../services/settingsService';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import './Settings.css';

function Settings () {
  
  const userDefault = useSelector(store => store.user);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);
  const [inputError, setInputError] = useState([]);
  const [serverError, setServerError] = useState([]);

  function handleLogOut () {
    dispatch(sendLogout());
  }

  function handleChange (event) {
    event.preventDefault();
    const updatedUser = {...userInfo};
    updatedUser[event.target.id] = event.target.value;
    setUserInfo(updatedUser);
  }

  function handleSubmit (event) {

  }

  useEffect(()=> {
    getUserInfo(userDefault.user.id)
      .then(response => setUserInfo(response))
      .catch(error => console.error(error));//eslint-disable-line no-console
  }, []);

  function checkForm (user) {
    const newErrors = [];

    Object.keys(user).forEach(key => {
      if (user[key].trim() === '') newErrors.push(`The field ${key} shouldn not be empty`);
    });
    return newErrors;
  }

  return (
    <div className="body-container settings-body">  
      <div className="settings-background"/>  
      <Container className="top-bar-padding">
        <div className="top-bar">
          <h1>Settings</h1>
          <Button variant='danger' onClick={handleLogOut}>Log out</Button>
        </div>
        <Container className="container-box">

          <Form onSubmit={handleSubmit}>
          
            {/* <Form.Group controlId="companyName">
            <Form.Label>Company name</Form.Label>
            <Form.Control value={userInfo.companyName} onChange={handleChange}></Form.Control>
          </Form.Group> */}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control value={userDefault.user.name} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control value={userDefault.user.email} onChange={handleChange}></Form.Control>
            </Form.Group>
            {
              (inputError.length > 0 || serverError.length > 0) &&
            <Alert  variant="danger">
              {inputError[0] || serverError}
            </Alert>
            }
            <Button variant="primary" className="settings-button" type="submit">Submit</Button>

          </Form>
        </Container>
      </Container>
    </div>


  );
}

export default Settings;