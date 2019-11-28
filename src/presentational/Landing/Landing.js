import React, {useState, useEffect} from 'react';
import Login from '../../containers/LogIn/LogIn';
import Register from '../../containers/Register/Register';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Landing () {

  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  useEffect(()=>{
    if (sessionStorage.getItem('validation')) {
      setLoginModal(true);
      sessionStorage.removeItem('validation');
    }
  },[]);

  return (
    <div>
      <Navbar bg="light" variant="light" sticky="top">
        <Navbar.Brand href="/landing">AppName</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={()=> setLoginModal(true)}>Log In</Nav.Link>
          <Nav.Link onClick={()=> setRegisterModal(true)}>Register</Nav.Link>
        </Nav>
      </Navbar>
  
      <Login
        show={loginModal}
        onHide={()=>{setLoginModal(false);}}
      ></Login>
      <Register
        show={registerModal}
        onHide={()=>{setRegisterModal(false);}}
      ></Register>
    </div>

  );
}

export default Landing;