import React from 'react';
import InterviewersItem from '../../containers/InterviwersItem/InterviewersItem';

function InterviewersList ({interviewers}) {

  const listOfInterviewers = interviewers.map(el => 
    <InterviewersItem key={el.id} interviewer={el}/>);

  return (
    <div style={{margin: '20px'}}>
      {listOfInterviewers}
    </div>
  );
}

export default InterviewersList;