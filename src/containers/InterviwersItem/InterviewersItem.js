import React from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import './InterviewersItem.css';

function InterviewersItem ({interviewer}) {

  return (
    <Card className="interviewerCard">
      <Card.Header className="interviewerCardHeader">
        <Image className="interviewerCardImage" src={interviewer.profileImage && interviewer.profileImage} roundedCircle/>
      </Card.Header>
      <Card.Body>
        <Container style={{textAlign: 'center'}}>
          <Row>
            <Col xs={12}>{interviewer.name}</Col>
          </Row>
          <Row>
            <Col xs={12}>{interviewer.email}</Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default InterviewersItem;