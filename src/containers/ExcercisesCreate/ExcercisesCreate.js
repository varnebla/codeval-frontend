import React, { useState } from 'react';

import {Form, Button } from 'react-bootstrap';

import { createExercise } from '../../redux/createExercise';

import { useDispatch } from 'react-redux';

function ExercisesCreate () {

  const dispatch = useDispatch();
  
  const initialForm = {
    title: '',
    difficulty: 0,
    placeholderCode: '',
    tests: '',
  };

  const [exerciseData, setExerciseData] = useState(initialForm);
  
  function handleExerciseForm (e) {
    e.preventDefault();
    const updatingExerciseForm = {...exerciseData};
    updatingExerciseForm[e.target.id] = e.target.value;
    setExerciseData(updatingExerciseForm);
    console.log(exerciseData,'data');
  }

  function handleSubmit (e) {
    e.preventDefault();
    dispatch(createExercise(exerciseData));
  }
  
  return (
    <Form onSubmit={handleSubmit} style ={{margin: '20px'}}>
      <Form.Group controlId="title">
        <Form.Label>Name of the exercise</Form.Label>
        <Form.Control value={exerciseData.exerciseName} type="text" placeholder="Name of the exercise" onChange={handleExerciseForm}/>
      </Form.Group>
      <Form.Group controlId="difficulty">
        <Form.Label>Please select difficulty of your exercise</Form.Label>
        <Form.Control as="select" onChange={handleExerciseForm}>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="placeholderCode">
        <Form.Label>Please create your function here</Form.Label>
        <Form.Control value={exerciseData.exerciseFunc} as="textarea" rows="5" onChange={handleExerciseForm}/>
      </Form.Group>
      <Form.Group controlId="tests">
        <Form.Label>Please create your tests here</Form.Label>
        <Form.Control value={exerciseData.exerciseTest} as="textarea" rows="5" onChange={handleExerciseForm}/>
      </Form.Group>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Button variant="primary" type="submit" >
            Submit Exercise
        </Button>
        <Button variant="danger" type="submit" >
            Delete Exercise
        </Button>
      </div>
    </Form>
  );
}

export default ExercisesCreate;