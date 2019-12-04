import React from 'react';
import InterviewersItem from '../../containers/InterviwersItem/InterviewersItem';

import './InterviewersList.css';

function InterviewersList ({interviewers}) {

  const listOfInterviewers = interviewers.map(el => 
    <InterviewersItem key={Math.floor(Math.random() * 10000)} interviewer={el}/>);

  return (
    <div  className='interviewersList' >
      {listOfInterviewers}
    </div>
  );
}

export default InterviewersList;