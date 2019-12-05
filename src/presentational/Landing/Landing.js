import React, {useState, useEffect} from 'react';
import Login from '../../containers/LogIn/LogIn';
import Register from '../../containers/Register/Register';
import Introduction from './Introduction';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Landing.css';

function Landing () {

  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  function handleGetStarted () {
    setRegisterModal(true);
  }

  useEffect(()=>{
    if (sessionStorage.getItem('validation')) {
      setLoginModal(true);
      sessionStorage.removeItem('validation');
    }
  },[]);

  return (
    <div>
      <Navbar className="landing-navbar" sticky="top"> 
        <Nav className="mr-auto">

        </Nav>
        <Nav inline="true">
          <Nav.Link onClick={()=> setLoginModal(true)} style={{color:'white'}}>LOG IN</Nav.Link>
          <Nav.Link onClick={()=> setRegisterModal(true)} style={{color:'white'}}>REGISTER</Nav.Link>
        </Nav>
      </Navbar>
      <Introduction handleGetStarted={handleGetStarted}/>
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