import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { createExercise, updateExercise, getExerciseToEdit } from '../../redux/exercises';
import { useSelector, useDispatch } from 'react-redux';

import ExercisesCreateStepOne from '../ExerciseCreateStepOne/ExerciseCreateStepOne';
import ExercisesCreateStepTwo from '../ExerciseCreateStepTwo/ExerciseCreateStepTwo';
import ExercisesCreateStepThree from '../ExerciseCreateStepThree/ExerciseCreateStepThree';

function ExercisesCreate () {
  
  // ID FROM PARAMS TO DEFINE IF ITS EDIT OR CREATION OF NEW EXERCISE
  const exerciseId = useParams().id;

  const dispatch = useDispatch();

  const initialForm = useSelector(store => store.exercises.exerciseCreate);
  const solution = useSelector(store => store.exercises.exerciseCreate.solution);
  const tests = useSelector(store => store.exercises.exerciseCreate.tests);
  
  const initSteps = {
    one: true,
    two: false,
    three: false
  };
  
  const [stepsState, setStepsState] = useState(initSteps);
  const [buttonState, setButtonState] = useState(1);
  const [inputErrors, setInputError] = useState([]);
  const [secondStep, setSecondStep] = useState(false);
  const [testBtn, setTestBtn] = useState('');
  const [testSuccess, setTestSuccess] = useState('');

  // THIS HANDLES CHANGE FROM 2ND STEP TO 3RD CHECKING TESTS
  useEffect(() => {
    if (secondStep) {
      const steps = {...stepsState};
      let buttons;
      if (!inputErrors.length && testBtn !== 'Tests') {
        steps.two = false;
        steps.three = true;
        buttons = 3;
        setTestSuccess('');
        setStepsState(steps);
        setButtonState(buttons);
      }
      setSecondStep(false);
    }
  }, [secondStep]);
  
  // HANDLES STEPS OF FORM WITH BUTTONS AT BOTTOM
  function handleSteps (e) {
    const errors = [];
    const steps = {...stepsState};
    let buttons;
    if (e.target.innerText=== 'Next' && stepsState.one) {
      inputsCheckStepOne(initialForm, errors);
      if (errors.length) {
        setInputError(errors);
      } else {
        setInputError(errors);
        steps.two = true;
        steps.one = false;
        buttons = 2;
        setStepsState(steps);
        setButtonState(buttons);
      }
    } 
    if (e.target.innerText=== 'Next' && stepsState.two) {
      inputCheckStepTwo(initialForm, errors);
      if (errors.length) {
        setInputError(errors);
      } else {
        handleTest();
      }
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
    const errors = [];
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
      inputsCheckStepOne(initialForm, errors);
      if (errors.length) {
        setInputError(errors);
      } else {
        setInputError(errors);
        steps.two = true;
        steps.one = steps.three = false;
        buttons = 2;
        setStepsState(steps);
        setButtonState(buttons);
      }
    }
    if (e.target.value === '3') {
      inputsCheckStepOne(initialForm, errors);
      inputCheckStepTwo(initialForm, errors);
      if (errors.length) {
        setInputError(errors);
      } else {
        steps.three = true;
        steps.one = steps.two = false;
        buttons = 3;
        setStepsState(steps);
        setButtonState(buttons);
      } 
    }
  }
  // HANDLE TEST, CHECK IF FUNCTION AND TEST ARE WORKING
  const handleTest = (e) => {
    if (e) {
      setTestBtn('Tests');
    } else {
      setTestBtn('Next');
    }
    const final = solution + '\n' + tests;
    const frame = document.getElementById('sandboxed');
    frame.contentWindow.postMessage(final, '*');
  };

  // HANDLING SUBMISSION OF THE TEST AND SENDING IT TO THE BACKEND
  function handleExerciseSubmit (e) {
    e.preventDefault();
    const errors = [];
    inputCheckStepThree(initialForm, errors);
    if (errors.length) {
      setInputError(errors);
    } else {
      if (e.target.innerText === 'Submit') {
        dispatch(createExercise(initialForm));
      } else if (e.target.innerText === 'Update') {
        dispatch(updateExercise(initialForm));
      }
      setInputError([]);
      setTestSuccess(`${initialForm.title} has been successfully created!`);
    }
  }

  // HANDLE TESTS FOR IFRAME BLOCKING NEXT STEP IF THEY ARE FAILING
  useEffect(() => {
    window.addEventListener('message', e => {
      const frame = document.getElementById('sandboxed');
      if (e.origin === 'null' && e.source === frame.contentWindow) {
        const errors = [];
        setInputError([]);
        isTestValid(e.data, errors);
        if (errors.length) {
          setInputError(errors);
          setSecondStep(true);
        } else {
          setTestSuccess('All tests have passed!');
          setInputError([]);
          setSecondStep(true);
        }
      }
    });
  }, []);

  // FETCHING EDIT EXERCISE DATA TO MAKE IT PERSISTANT ON RELOADS
  useEffect(()=> {
    if (exerciseId) {
      dispatch(getExerciseToEdit(exerciseId));
    }
  }, []);
  
  return (
    <div style={{width: '60vw', height: '55vh'}}>
      <ToggleButtonGroup type="checkbox" value={buttonState}>
        <ToggleButton onChange={handleStepsTop} variant="info" value={1}>Step One</ToggleButton>
        <ToggleButton onChange={handleStepsTop} variant="info" value={2}>Step Two</ToggleButton>
        <ToggleButton onChange={handleStepsTop} variant="info" value={3}>Step Three</ToggleButton>
      </ToggleButtonGroup>
      { (!initialForm.title && exerciseId)
        ?
        <Spinner style={{position: 'fixed', top: '50%', left: '50%'}} animation="border" role="status"/>
        :
        <div>
          <div style={{display: 'flex'}}>
            {stepsState.one && <ExercisesCreateStepOne/>}
            {stepsState.two && <ExercisesCreateStepTwo/> }
            {stepsState.three && <ExercisesCreateStepThree/>}
            <div>
              { stepsState.two && <Button onClick={handleTest} variant="warning">Tests</Button>}

            </div>
          </div>
          {!!inputErrors.length && <Alert  variant='danger'>{inputErrors[0]}</Alert>}
          {!inputErrors.length && testSuccess ? <Alert  variant='success'>{testSuccess}</Alert> : null}
          <div style={{padding: '20px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            {(stepsState.two || stepsState.three) && <Button onClick={handleSteps} variant="success">Previous</Button>}
            { stepsState.three ?
              <Button onClick={handleExerciseSubmit} variant="warning">{exerciseId ? 'Update' : 'Submit'}</Button>
              :
              <Button variant="success" onClick={handleSteps}>Next</Button>
            }
          </div>
          <iframe style={{display: 'none'}} sandbox='allow-scripts' title='dontknow' id='sandboxed' src={process.env.PUBLIC_URL + '/test.html'}></iframe>

        </div>}
    </div>
  );
}

export default ExercisesCreate;

// HELPER FUNCTION TO CHECK INPUTS ON 3 STAGES OF STEPS
const inputsCheckStepOne = (exercise, err) => {
  if (exercise.title === '') {
    err.push('Please enter exercise name.');
  }
  if (exercise.difficulty === 0) {
    err.push('Please enter exercise difficulty.');
  }
  if (!exercise.duration.match(/[0-9]/gi) || exercise.duration  === '' ) {
    err.push('Please enter duration of the exercise as a number.');
  }
};

const inputCheckStepTwo = (exercise, err) => {
  if (exercise.solution === '') {
    err.push('Please create function for the exercise.');  
  }
  if (exercise.tests === '') {
    err.push('Please enter tests for the exercise.');  
  }
};

const inputCheckStepThree = (exercise, err) => {
  if (exercise.placeholderCode === '') {
    err.push('Please enter placeholder function.');
  }
  if (!exercise.hints.length) {
    err.push('Please create hints for the exercise.');  
  }
  if (exercise.instructions === '') {
    err.push('Please enter exercise instructions.');  
  }
  if (!exercise.examples.length) {
    err.push('Please create hints for the exercise.');
  }
};
// HELPER FUNCTION TO CHECK TESTS

const isTestValid = (test, err) => {
  if (!test.stats) {
    err.push('Please create correct function and tests');
  } else {
    if (test.stats.failures > 0) {
      err.push('Tests are failing. Please check your function and/or tests');
    }
  }
};
