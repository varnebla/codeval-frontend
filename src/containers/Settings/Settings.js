import React, { useEffect, useState } from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {sendLogout, updateUser} from '../../redux/authentication';
import {getUserInfo} from '../../services/settingsService';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import './Settings.css';

function Settings () {
  
  const userDefault = useSelector(store => store.user);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    user: {
      name: '',
      email: '',
    },
    company:{
      name: '',
      email:''      
    }
  });
  const [inputError, setInputError] = useState([]);
  const [serverError, setServerError] = useState([]);
  const [inputFeedback, setInputFeedback] = useState(false);

  function handleLogOut () {
    dispatch(sendLogout());
  }

  function handleChange (event) {
    event.preventDefault();
    const updatedUser = {...userInfo};
    console.log(updatedUser, 'then');
    switch (event.target.id) {
    case 'name':
      updatedUser.user.name = event.target.value;
      break;
    case 'email':
      updatedUser.user.email = event.target.value;
      break;
    case 'companyName':
      updatedUser.company.name = event.target.value;
      break;
    case 'companyEmail':
      updatedUser.company.email = event.target.value;
    }
    console.log(updatedUser, 'now');
    setUserInfo(updatedUser);
  }

  function handleSubmit (event) {
    event.preventDefault();
    const updateObject = {
      name: userInfo.user.name,
      userEmail: userInfo.user.email,
      companyName: userInfo.company.name,
      companyEmail:userInfo.company.email
    };
    const errors = checkForm(updateObject);
    console.log(errors);
    if (errors.length === 0) {
      console.log('gonna dispatch');
      dispatch(updateUser(updateObject)).then(result=> {
        setInputFeedback(true);
        sessionStorage.removeItem('success');
      });
    }
    setInputFeedback(false);
    setInputError(errors);
  }

  useEffect(()=> {
    if (sessionStorage.getItem('success')) {
      sessionStorage.removeItem('success');
      setInputFeedback(true);
    }  
    getUserInfo(userDefault.user.id)
      .then(response => setUserInfo(response))
      .catch(error => console.error(error));//eslint-disable-line no-console
  }, []);

  function checkForm (user) {
    const newErrors = [];
    console.log(user);
    Object.keys(user).forEach(key => {
      console.log(user[key]);
      console.log('controlling: ', user[key]);
      if (user[key].trim() === '') newErrors.push(`The field ${key} should not be empty`);
      else isEmailInvalid(user[key], key) &&
            newErrors.push('Email must be a valid email address');            
    });
    return newErrors;
  }
  console.log(userInfo);
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
          
            {
              userInfo.user.isAdmin &&
              <Form.Group controlId="companyName">
                <Form.Label>Company name</Form.Label>
                <Form.Control value={userInfo.company.name} onChange={handleChange}></Form.Control>
              </Form.Group>
            }
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control value={userInfo.user.name} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control value={userInfo.user.isAdmin ? userInfo.company.email : userInfo.user.email} onChange={handleChange}></Form.Control>
            </Form.Group>
            {
              (inputError.length > 0 || serverError.length > 0) &&
            <Alert  variant="danger">
              {inputError[0] || serverError}
            </Alert>
            }
            {
              inputFeedback &&
              <Alert variant="success">
                Successfully updated.
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

function isEmailInvalid (el, key) {
  const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  return (key === 'email' || key==='companyEmail') && !el.match(regEx);
}