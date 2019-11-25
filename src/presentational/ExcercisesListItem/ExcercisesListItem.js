import React from 'react';

import { Card, Button } from 'react-bootstrap';

import moment from 'moment';



function ExercisesListItem ({ exercise }) {

  console.log(exercise, 'oneExercise');
  return (
    <Card className="text-center">
      <Card.Header>{exercise.title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {exercise.created_by.name}</Card.Title>
        <Card.Text>
          {exercise.tests}
        </Card.Text>
        <Button variant="warning">Edit</Button>
      </Card.Body>
      <Card.Footer className="text-muted">Created at: {moment(exercise.created_at).format('LLL')} </Card.Footer>
    </Card>
  );
}

export default ExercisesListItem;