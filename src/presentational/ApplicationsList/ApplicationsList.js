import React from 'react';

import ApplicationsListItem from '../ApplicationsListItem/ApplicationsListItem';

import './ApplicationsList.css';

function ApplicationsList ( { allApplications }) {

  return (
    <div className="applicationsList-container">
      {allApplications && allApplications.map(oneApplication => (
        <ApplicationsListItem key={oneApplication._id} application={oneApplication}/>
      ))}
    </div>
  );
}

export default ApplicationsList;