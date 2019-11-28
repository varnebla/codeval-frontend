import React from 'react';

import {Card, Button, ListGroup} from 'react-bootstrap';

import moment from 'moment';

function ApplicationsListItem ( { application }) {

  const status = whichStatus(application.status);

  return (
    <div style={{margin: '20px'}}>
      <Card >
        <ListGroup variant="flush">
          <ListGroup.Item variant={status}>
            <div style={{display: 'inline-flex', width: '75%', justifyContent: 'space-between'}}>
              <h5>Status: {application.status}</h5>
              <h6>Created by: {application.created_by.name}</h6>
              <h6>Created at: {moment(application.created_at).format('LLL')}</h6>
            </div>
          </ListGroup.Item>
          <ListGroup.Item variant={status}>
            <div style={{display: 'flex', width: '75%', justifyContent: 'space-between'}}>
              <h5>Applicant: {application.applicantName && application.applicantName}</h5>
              <h6>Email: {application.applicantEmail}</h6>
            </div>
          </ListGroup.Item >
          <ListGroup.Item variant={status}>
            <div style={{display: 'flex', flexDirection: 'row' , justifyContent: 'flex-end'}}>
              <Button variant='secondary' style={{marginRight: '5%'}}>Report</Button>
              <Button variant='danger'>Delete</Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default ApplicationsListItem;

// FUNCTION FOR STATUS COLORS
function whichStatus (status) {
  if (status === 'issued') return 'warning';
  if (status === 'activated') return 'success';
  if (status === 'expired') return 'danger';
}