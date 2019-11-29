import React from 'react';

import ApplicationsListItem from '../ApplicationsListItem/ApplicationsListItem';

function ApplicationsList ( { allApplications }) {

  return (
    <div style={{margin: '20px'}}>
      {allApplications && allApplications.map(oneApplication => (
        <ApplicationsListItem key={oneApplication._id} application={oneApplication}/>
      ))}
    </div>
  );
}

export default ApplicationsList;