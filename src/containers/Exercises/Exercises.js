import React, { useEffect, useState } from 'react';


import { getExercises } from '../../redux/exercises';
import { useDispatch, useSelector } from 'react-redux';
import ExercisesList from '../../presentational/ExcercisesList/ExcercisesList';

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import './Exercises.css';


function Exercises () {
  const dispatch = useDispatch();

  let exercisesStore = useSelector(store => store.exercises.listOfExercises);

  const [ exercises, setExercises ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    dispatch(getExercises());
  }, []);

  useEffect(() => {
    if (exercisesStore) {
      setExercises(exercisesStore);
      setLoading(false);
    }
  }, [exercisesStore]);


  const handleDateLow = () => {
    const newOrder = exercises.sort((a,b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    setExercises([...newOrder]);
  }; 
  const handleDateHigh = () => {
    const newOrder = exercises.sort((a,b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
    setExercises([...newOrder]);
  }; 

  const handleDifficultyLow = () => {
    const newOrder = exercises.sort((a,b) => {
      return new Date(b.difficulty) - new Date(a.difficulty);
    });
    setExercises([...newOrder]);
  };
  const handleDifficultyHigh = () => {
    const newOrder = exercises.sort((a,b) => {
      return new Date(a.difficulty) - new Date(b.difficulty);
    });
    setExercises([...newOrder]);
  };

  return (
    <div className="body-container exercises-body">
      <div className="exercises-background"/>
      {
        loading
          ? <Spinner animation="border" className="spinner-exercises" role="status">
          </Spinner>
          : <Container className="top-bar-padding">
            <div className="top-bar exercises-top-bar">
              <DropdownButton
                title="Order exercises by"
                variant="info"
                id="dropdown-variants-Info"
                key="Info"
              >
                <Dropdown.Item eventKey="1" onClick={handleDateLow}>Most recent</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={handleDateHigh}>Oldest</Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={handleDifficultyLow}>Lowest difficulty</Dropdown.Item>
                <Dropdown.Item eventKey="4" onClick={handleDifficultyHigh}>Highest difficulty</Dropdown.Item>
              </DropdownButton>
              <Button href="/dashboard/createExercise" variant="primary" className="btn-create-exercise">Create</Button>
            </div>
            <ExercisesList exercises={exercises}/>
          </Container>
      }
      
    </div>

  );
}

export default Exercises;