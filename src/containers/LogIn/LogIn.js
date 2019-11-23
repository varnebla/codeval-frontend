import React, {useState} from 'react';


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
// import {Form, Button, Col} from 'react-bootstrap'

function LogIn () {

  const initialState= {
    email: '',
    password: ''
  };

  const [login, setLogin] = useState(initialState);
  const [errors, setErrors] = useState([]);

  function handleSubmit (event) {
    event.preventDefault();
    console.log('HEY');
  }

  function handleChange (event) {
    event.preventDefault();
    const newLogin = {...login}; //Object.assign{{}, login}
    newLogin[event.target.id] = event.target.value;
    setLogin(newLogin);
    console.log(newLogin);
  }

  function checkForm (loginObject) {
    loginObject.forEach(el => {
      
    });
  }
  

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email" as={Col} sm="4">
        <Form.Label>Email adress</Form.Label>
        <Form.Control value={login.email} type="email" placeholder="Enter email" onChange={handleChange} required/>
      </Form.Group>
      <Form.Group controlId="password" as={Col} sm="4">
        <Form.Label>Password</Form.Label>
        <Form.Control value={login.password} type="password" placeholder="Password" onChange={handleChange} required/>
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>


    
  );
}

export default LogIn;