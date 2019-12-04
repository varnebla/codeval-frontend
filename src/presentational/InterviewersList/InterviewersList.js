import React from 'react';
import InterviewersItem from '../../containers/InterviwersItem/InterviewersItem';

import './InterviewersList.css';

function InterviewersList ({interviewers}) {

  const listOfInterviewers = interviewers.map(el => 
    <InterviewersItem key={el.name} interviewer={el}/>);

  return (
    <div  className='interviewersList' >
      {listOfInterviewers}
    </div>
  );
}

export default InterviewersList;