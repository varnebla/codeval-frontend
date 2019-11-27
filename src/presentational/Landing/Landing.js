import React, {useState} from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import history from '../../history';
import Login from '../../containers/LogIn/LogIn';
import Register from '../../containers/Register/Register';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Landing () {

  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  console.log(loginModal);

  return (
    <div>
      <Navbar bg="light" variant="light" sticky="top">
        <Navbar.Brand href="/landing">AppName</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={()=> setLoginModal(true)}>Log In</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Navbar>
  
      <Login
        show={loginModal}
        onHide={()=>{setLoginModal(false)}}
      ></Login>
    </div>

  );
}

export default Landing;