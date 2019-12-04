import React from 'react';

import ExercisesListItem from '../ExcercisesListItem/ExcercisesListItem';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ExercisesList.css';

function ExercisesList ( { exercises }) {
  return (
    // <div className="exerciseList-container">
    <Row>
      {exercises && exercises.map(oneExer => (
        <Col xs={12} sm={6} lg={4} key={oneExer._id}>
          <ExercisesListItem  exercise={oneExer}/>
        </Col>
      ))}
    </Row>
    //</div>
  );
}

export default ExercisesList;