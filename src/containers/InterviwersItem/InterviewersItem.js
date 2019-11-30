import React from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function InterviewersItem ({interviewer}) {

  return (
    <Card>
      <Card.Body>
        <Container>
          <Row>
            <Col xs={6}>{interviewer.name}</Col>
            <Col xs={6}>{interviewer.email}</Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default InterviewersItem;