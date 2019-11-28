import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { useSelector } from 'react-redux';

import ExercisesCreateStepOne from '../ExerciseCreateStepOne/ExerciseCreateStepOne';
import ExercisesCreateStepTwo from '../ExerciseCreateStepTwo/ExerciseCreateStepTwo';
import ExercisesCreateStepThree from '../ExerciseCreateStepThree/ExerciseCreateStepThree';

function ExercisesCreate () {

  const initialForm = useSelector(store => store.createExercise);

  const initSteps = {
    one: true,
    two: false,
    three: false
  };
   
  const [stepsState, setStepsState] = useState(initSteps);
  const [buttonState, setButtonState] = useState(1);
  const [inputErrors, setInputError] = useState([]);
  
  // HANDLES STEPS OF FORM WITH BUTTONS AT BOTTOM
  function handleSteps (e) {
    console.log(e.target.innerText);
    const steps = {...stepsState};
    let buttons;
    if (e.target.innerText=== 'Next' && stepsState.one) {
      steps.two = true;
      steps.one = false;
      buttons = 2;
      setStepsState(steps);
      setButtonState(buttons);
    } 
    if (e.target.innerText=== 'Next' && stepsState.two) {
      steps.two = false;
      steps.three = true;
      buttons = 3;
      setStepsState(steps);
      setButtonState(buttons);
    }
    if (e.target.innerText=== 'Previous' && stepsState.two) {
      steps.two = false;
      steps.one = true;
      buttons = 1;
      setStepsState(steps);
      setButtonState(buttons);
    }
    if (e.target.innerText=== 'Previous' && stepsState.three) {
      steps.two = true;
      steps.three = false;
      buttons = 2;
      setStepsState(steps);
      setButtonState(buttons);
    }
  }
  // HANDLES STEPS OF FORM WITH BUTTOMS TO THE TOP
  function handleStepsTop (e) {
    console.log(e.target.value);
    const steps = {...stepsState};
    let buttons;
    if (e.target.value === '1') {
      steps.one = true;
      steps.two = steps.three = false;
      buttons = 1;
      setStepsState(steps);
      setButtonState(buttons);
    }
    if (e.target.value === '2') {
      steps.two = true;
      steps.one = steps.three = false;
      buttons = 2;
      setStepsState(steps);
      setButtonState(buttons);
    }
    if (e.target.value === '3') {
      steps.three = true;
      steps.one = steps.two = false;
      buttons = 3;
      setStepsState(steps);
      setButtonState(buttons);
    }
  }
  
  return (
    <div>
      <ToggleButtonGroup type="checkbox" value={buttonState}>
        <ToggleButton onChange={handleStepsTop} variant="info" value={1}>Step One</ToggleButton>
        <ToggleButton onChange={handleStepsTop} variant="info" value={2}>Step Two</ToggleButton>
        <ToggleButton onChange={handleStepsTop} variant="info" value={3}>Step Three</ToggleButton>
      </ToggleButtonGroup>
      <div>
        {stepsState.one && <ExercisesCreateStepOne/>}
        {stepsState.two && <ExercisesCreateStepTwo/>}
        {stepsState.three && <ExercisesCreateStepThree/>}
      </div>
      {!!inputErrors.length && <Alert  variant='danger'>{inputErrors[0]}</Alert>}
      <div style={{padding: '20px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        {(stepsState.two || stepsState.three) && <Button onClick={handleSteps} variant="success">Previous</Button>}
        { stepsState.two && <Button variant="success">Test</Button>}
        { stepsState.three ?
          <Button variant="success" >Submit</Button>
          :
          <Button variant="success" onClick={handleSteps}>Next</Button>
        }
      </div>
    </div>
  );
}

export default ExercisesCreate;

// HELPER FUNCTIONS

const areInputsValid = (exercise, err) => {
  if (exercise.title === '') {
    err.push('Please enter exercise name.');
  }
  if (exercise.difficulty === 0) {
    err.push('Please enter exercise difficulty.');
  }
  if (exercise.placeholderCode === '') {
    err.push('Please enter placeholder function.');
  }
  if (exercise.tests === '') {
    err.push('Please enter tests for the exercise.');  
  }
  if (exercise.hints === '') {
    err.push('Please create hints for the exercise.');  
  }
  if (exercise.solution === '') {
    err.push('Please enter solution for the exercise.');  
  }
  if (exercise.instructions === '') {
    err.push('Please enter exercise instructions.');  
  }
};


{/* <Form onSubmit={handleSubmit} style ={{margin: '20px'}}>
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
<Form.Row style={{display: 'flex', justifyContent: 'space-between', margin: '20px'}}>
  <Form.Group  controlId="placeholderCode" >
    <Form.Label>Please create your function here</Form.Label>
    <AceEditor
      mode='javascript'
      theme='monokai'
      fontSize='20px'
      tabSize='2'
      onChange={handlePlaceHolderEditor}
      value={exerciseData.placeholderCode}
      name='placeholderCode'
      editorProps={{ $blockScrolling: true }}
    />  
  </Form.Group>
  <Form.Group  controlId="testsCode" >
    <Form.Label>Please create your tests here</Form.Label>
    <AceEditor
      mode='javascript'
      theme='monokai'
      fontSize='20px'
      tabSize='2'
      onChange={handleTestsEditor}
      value={exerciseData.tests}
      name='testsCode'
      editorProps={{ $blockScrolling: true }}
    />  
  </Form.Group>
  <Form.Group  controlId="solutionCode" >
    <Form.Label>Please enter your solution here</Form.Label>
    <AceEditor
      mode='javascript'
      theme='monokai'
      fontSize='20px'
      tabSize='2'
      onChange={handleSolutionEditor}
      value={exerciseData.solution}
      name='solutionCode'
      editorProps={{ $blockScrolling: true }}
    />  
  </Form.Group>
</Form.Row>
<Form.Group controlId="tests">
  <Form.Label>Please enter instructions to your test here</Form.Label>
  <Form.Control value={exerciseData.instructions} as="textarea" rows="5" onChange={handleExerciseForm}/>
</Form.Group>
{ inputFeedback && 
  <div>
    {
      inputError.length
        ?
        <Alert  variant="danger">
          {inputError[0] }
        </Alert>
        :
        <Alert  variant="success">
            Exercise has been created!
        </Alert>
    }
  </div> 
}
<div style={{display: 'flex', justifyContent: 'space-between'}}>
  <Button variant="primary" type="submit" >
      Submit Exercise
  </Button>
  <Button variant="danger" type="submit" >
      Delete Exercise
  </Button>
</div>
</Form> */}



// function handleExerciseForm (e) {
//   e.preventDefault();
//   const updatingExerciseForm = {...exerciseData};
//   updatingExerciseForm[e.target.id] = e.target.value;
//   setExerciseData(updatingExerciseForm);
// }
// // YOU CAN ONLY TARGET EVENT WHICH IS VALUE IN CODE EDITOR DIRECTLY SEPARATE FUNCTIONS NEEDED
// // FOR PLACEHOLDER EDITOR
// function handlePlaceHolderEditor (e) {
//   const updatingExerciseForm = {...exerciseData};
//   updatingExerciseForm.placeholderCode = e;
//   setExerciseData(updatingExerciseForm);
// }
// // FOR TESTS EDITOR
// function handleTestsEditor (e) {
//   const updatingExerciseForm = {...exerciseData};
//   updatingExerciseForm.tests = e;
//   setExerciseData(updatingExerciseForm);
// }
// // FOR SOLUTION EDITOR
// function handleSolutionEditor (e) {
//   const updatingExerciseForm = {...exerciseData};
//   updatingExerciseForm.solution = e;
//   setExerciseData(updatingExerciseForm);
// }

// function handleSubmit (e) {
//   e.preventDefault();
//   const errors = [];
//   areInputsValid(exerciseData, errors);
//   if (!errors.length) {
//     dispatch(createExercise(exerciseData));
//   }
//   setInputError(errors);
//   setInputFeedback(true);
// }