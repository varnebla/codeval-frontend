import React, { useState, useEffect } from 'react';
import {getInterviewers} from '../../services/interviewersService';
import InterviewersList from '../../presentational/InterviewersList/InterviewersList';
import InterviewersCreate from '../InterviewersCreate/InterviewersCreate';

import Button from 'react-bootstrap/Button';

function Interviewers () {

  const [interviewers, setInterviewers] = useState([]);
  const [createModal, setCreateModal] = useState(false);

  useEffect(()=>{
    getInterviewers()
      .then(results => setInterviewers(results));
  },[]);

  return (
    <div>
      <h2>Interviewers</h2>
      <Button variant="primary" onClick={()=>{setCreateModal(true);}}>Create Interviewer</Button>
      {interviewers && <InterviewersList interviewers={interviewers}/>}
      <InterviewersCreate show={createModal} onHide={()=>{setCreateModal(false);}} />
    </div>
  );
}

export default Interviewers;