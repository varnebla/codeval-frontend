import React, { useEffect } from 'react';


import Button from 'react-bootstrap/Button';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import { getExercises } from '../../redux/exercises';
import { useDispatch, useSelector } from 'react-redux';

import ExercisesList from '../../presentational/ExcercisesList/ExcercisesList';



function Exercises () {

  const dispatch = useDispatch();

  const exercises = useSelector(store => store.exercises.listOfExercises); 

  useEffect(() => {
    dispatch(getExercises());
  }, []);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1>Exercises</h1>
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
        <Button href="/dashboard/createExercise" variant="success">Create</Button>
      </div>
      <ExercisesList exercises={exercises}/>
    </div>

  );
}

export default Exercises;