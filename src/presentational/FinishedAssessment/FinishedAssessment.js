import React from 'react';

function FinishedAssessment ({ status }) {

  return (
    <div>
      {
        status === 'completed'
          ? <p>Application submitted</p>
          : <p>Application expired</p>
      }
    </div>
  );

}

export default FinishedAssessment;