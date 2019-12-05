import React, { useState, useEffect } from 'react';
import {getInterviewers} from '../../services/interviewersService';
import InterviewersList from '../../presentational/InterviewersList/InterviewersList';
import InterviewersCreate from '../InterviewersCreate/InterviewersCreate';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import './Interviewers.css';

function Interviewers () {

  const [interviewers, setInterviewers] = useState([]);
  const [createModal, setCreateModal] = useState(false);

  // STATE FOR MARKER LINES AND USE EFFECT TO CALL IT ONLY ONCE
  const [random, setRandom]= useState('');

  useEffect(() => {
    if (!random) {
      setRandom(randomMarker());
    }
  }, []);

  useEffect(()=>{
    getInterviewers()
      .then(results => setInterviewers(results));
  },[]);

  return (
    <div className="interviewersContainer">
      { !interviewers.length
        ?
        <Spinner className="spinnerInterviewers" animation="border" role="status"/>
        :
        <Container className="top-bar-padding ">
          <div className="interviewers-top-bar">
            <div>
              <h1 className="highlighted-text">Interviewers</h1>
              <div className={'highlight-report' + ' '+ random } style={{marginTop: '-42px', background: '#ab8bf7', width: '250px', marginLeft: '-15px'}}></div>
            </div>
            <Button variant="primary" onClick={()=>{setCreateModal(true);}}>Create Interviewer</Button>
          </div>
          {interviewers && <InterviewersList interviewers={interviewers}/>}
          <InterviewersCreate show={createModal} onHide={()=>{setCreateModal(false);}} />
        </Container>

      }
    </div>
  );
}

export default Interviewers;

// HELPER FUNCTION TO GET RANDOM POSTION OF THE MARKER AND USE EFFECT TO MAKE IT
function randomMarker () {
  const arr = ['h-r', 'h-r1', 'h-r2', 'h-r3', 'h-r4', 'h-r5', 'h-r6', 'h-r7', 'h-r8' ,'h-r9'];
  return arr[Math.floor(Math.random() * 10)];
}