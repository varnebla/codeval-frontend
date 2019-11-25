import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import { getExercises } from '../../redux/getExercises';
import { useDispatch, useSelector } from 'react-redux';

import ExercisesList from '../../presentational/ExcercisesList/ExcercisesList';
import ExcercisesCreate from '../ExcercisesCreate/ExcercisesCreate';


function Exercises () {

  const dispatch = useDispatch();

  const exercises = useSelector(store => store.getExercises.exercises); 

  useEffect(() => {
    dispatch(getExercises());
  }, []);

  return (
    <Router>
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
          <Button variant="success"><Link to="/dashboard/exercises/create">Create</Link></Button>
        </div>
        <ExercisesList exercises={exercises}/>
      </div>
      <Switch>
        <Route path='/dashboard/exercises/create' component={ExcercisesCreate}/>
      </Switch>
    </Router>

  );
}

export default Exercises;