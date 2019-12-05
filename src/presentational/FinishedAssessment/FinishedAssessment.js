import React from 'react';

import './FinishedAssessment.css';

function FinishedAssessment ({ status }) {

  return (
    <div className="finished-container">
      <div className="finished-border">
        {
          status === 'completed' || status === 'reviewed'
            ? <p className="finished-text">Application has been submitted</p>
            : <p className="finished-text">Application has expired</p>
        }
      </div>
    </div>
  );

}

export default FinishedAssessment;