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