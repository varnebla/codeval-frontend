import React, { useEffect } from 'react';
import { getExercises } from '../../redux/exercises';
import { useDispatch, useSelector } from 'react-redux';
import ExercisesList from '../../presentational/ExcercisesList/ExcercisesList';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import './Exercises.css';


function Exercises () {

  const dispatch = useDispatch();

  const exercises = useSelector(store => store.exercises.listOfExercises); 

  useEffect(() => {
    dispatch(getExercises());
  }, []);

  return ( 
    <div className="body-container exercises-body">
      <div className="exercises-background"/>
      <Container className="top-bar-padding">

        <div className="top-bar exercises-top-bar">
          
          <DropdownButton
            title="Filter Exercises"
            variant="info"
            id="dropdown-variants-Info"
            key="Info"
          >
            <Dropdown.Item eventKey="1">Date</Dropdown.Item>
            <Dropdown.Item eventKey="2">Interviewer</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>Exercise</Dropdown.Item>
          </DropdownButton>
          <Button href="/dashboard/createExercise" variant="primary" className="btn-create-exercise">Create</Button>
        </div>
        <ExercisesList exercises={exercises}/>
      </Container>
    </div>

  );
}

export default Exercises;