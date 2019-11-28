import React, {useState, useEffect} from 'react';
import {sendVerificationId} from '../../services/confirmAccountService';
import {useParams} from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


function ConfirmAccount () {
  const verificationId = useParams().id;

  const [verified, setVerified] = useState(false); //RECEIVED RESPONSE
  const [denied, setDenied] = useState(false); //VERIFICATION DENIED
  const [errors, setErrors] = useState([]); //ERRORS OR SUCCESS

  const verifyUser = ()=> {
    let newErrors = [];
    sendVerificationId(verificationId)
      .then(response => {
        if (!response) { //INTERNAL SERVER ERROR
          newErrors.push('Oops! Looks like something is wrong with the validation.');
          setDenied(true);
        } else {
          if (response.error) { //ERROR FROM VALIDATION
            newErrors.push(response.error);
            setDenied(true);
          } 
          else if (response && response.msg) {
            newErrors.push(response.msg); //SUCCESS
            sessionStorage.setItem('validation', JSON.stringify(true));
          }
        }
        setVerified(true);
        setErrors(newErrors);
      })
      .catch(error => console.error(error));//eslint-disable-line no-console
  };   
  useEffect(()=> {
    verifyUser();
  }, []);

  
  return (
    <div>
      {
        !verified
          ? <Spinner animation="border" />
          : denied 
            ? <div>
              <Alert variant="danger">{errors[0]}</Alert>
              <Button variant="primary" href="/landing">Go to Landing</Button>
            </div>
            : <div>
              <Alert variant="success">{errors[0]}</Alert>
              <Button variant="primary" href="/landing">Go to Login</Button>
            </div>
      }
      

    </div>
  );
}

export default ConfirmAccount;