import React, { useState } from 'react';

import { fillInExercise } from '../../redux/createExercise';
import { useDispatch, useSelector } from 'react-redux';

import {Form } from 'react-bootstrap';

function ExerciseCreateStepOne () {

  const dispatch = useDispatch();
  const initialForm = useSelector(store => store.createExercise);
 
  function handleExerciseForm (e) {
    e.preventDefault();
    const updatingExerciseForm = {...initialForm};
    updatingExerciseForm[e.target.id] = e.target.value;
    dispatch(fillInExercise(updatingExerciseForm));
  }

  
  return (
    <div>
      <h1>ExerciseCreateStepOne</h1>
      <Form style ={{margin: '20px'}}>
        <Form.Group controlId="title">
          <Form.Label>Name of the exercise</Form.Label>
          <Form.Control value={initialForm.title} type="text" placeholder="Name of the exercise" onChange={handleExerciseForm}/>
        </Form.Group>
        <Form.Group controlId="difficulty">
          <Form.Label>Please select difficulty of your exercise</Form.Label>
          <Form.Control value={initialForm.difficulty} as="select" onChange={handleExerciseForm} >
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
        <Form.Group controlId="duration">
          <Form.Label>Expected duration of the exercise in minutes</Form.Label>
          <Form.Control value={initialForm.duration} type="text" placeholder="Duration of the exercise" onChange={handleExerciseForm}/>
        </Form.Group>
      </Form>
    </div>
  );
}

export default ExerciseCreateStepOne;
