import React, { useState } from 'react';

import {Form, Button } from 'react-bootstrap';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

import { fillInExercise } from '../../redux/exercises';
import { useDispatch, useSelector } from 'react-redux';


function ExerciseCreateStepThree () {

  const dispatch = useDispatch();
  const initialForm = useSelector(store => store.exercises.exerciseCreate);

  const [hintText, setHintText] = useState('');
  const [exampleText, setExampleText] = useState('');

  // DISPATCHING INFORMATION AND PUSHING HINTS INTO AN ARRAY
  function handleExerciseForm (e) {
    e.preventDefault();
    const updatingExerciseForm = {...initialForm};
    let hint = hintText;
    let example = exampleText;
    if (e.target.id === 'hints') {
      hint = e.target.value;
      setHintText(hint);
    } else if (e.target.id === 'examples') {
      example = e.target.value;
      setExampleText(example);
    } else if (e.target.id !== 'hints' || e.target.id !== 'examples') {
      updatingExerciseForm[e.target.id] = e.target.value;
      dispatch(fillInExercise(updatingExerciseForm));
    }
  }

  // YOU CAN ONLY TARGET EVENT WHICH IS VALUE IN CODE EDITOR DIRECTLY SEPARATE FUNCTIONS NEEDED
  // FOR FUNCTION PLACEHOLDER EDITOR
  function handleFunctionPlaceholder (e) {
    const updatingExerciseForm = {...initialForm};
    updatingExerciseForm.placeholderCode = e;
    dispatch(fillInExercise(updatingExerciseForm));
  }

  // ADDING HINTS TO THE ARRAY IN REDUX STORE
  function addHint (e) {
    e.preventDefault();
    let hint = hintText;
    const updatingExerciseForm = {...initialForm};
    updatingExerciseForm.hints.push(hint.trim());
    dispatch(fillInExercise(updatingExerciseForm));
    setHintText('');
  }

  // ADDING EXAMPLES TO ARRAY IN REDUX STORE
  function addExample (e) {
    e.preventDefault();
    let example = exampleText;
    const updatingExerciseForm = {...initialForm};
    updatingExerciseForm.examples.push(example.trim());
    dispatch(fillInExercise(updatingExerciseForm));
    setExampleText('');
  }

  // REMOVE HINTS AND UPDATE STORE
  function removeHint (e) {
    e.preventDefault();
    const target = e.target.parentElement.firstChild.innerText;
    const updatingExerciseForm = {...initialForm};
    const allHints = initialForm.hints.filter(hint => hint !== target);
    updatingExerciseForm.hints = allHints;
    dispatch(fillInExercise(updatingExerciseForm));
  }

  // REMOVE EXAMPLES AND UPDATE STORE
  function removeExample (e) {
    e.preventDefault();
    const target = e.target.parentElement.firstChild.innerText;
    const updatingExerciseForm = {...initialForm};
    const allExamples = initialForm.examples.filter(example => example !== target);
    updatingExerciseForm.examples = allExamples;
    dispatch(fillInExercise(updatingExerciseForm));
  }

  return (
   
    <div style={{width: '80vw', height: '55vh'}}>
      <Form style ={{margin: '20px', width: '80vw'}}>
        <Form.Row style={{display: 'flex', margin: '20px'}}>
          <Form.Group  controlId="placeholderCode" >
            <Form.Label>Please create placeholder function here</Form.Label>
            <AceEditor
              height='150px'
              width='400px'
              mode='javascript'
              theme='monokai'
              fontSize='20px'
              tabSize={2}
              onChange={handleFunctionPlaceholder}
              value={initialForm.placeholderCode}
              name='placeholderCode'
              editorProps={{ $blockScrolling: true }}
            />  
          </Form.Group>
          <div>
            <Form.Group style={{marginLeft: '20px'}} controlId="hints">
              <Form.Label>Hints for the exercise</Form.Label>
              <span style={{display: 'flex'}}>
                <Form.Control value={hintText} type="text" placeholder="Hints" onChange={handleExerciseForm}/>
                <button onClick={addHint}>Add</button>
              </span>
            </Form.Group>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px', overflowY: 'scroll', maxHeight: '95px'}}>
              {initialForm.hints && initialForm.hints.map(hint => (
                <div key={Math.floor(Math.random() * 10000)} 
                  style={{display: 'flex', justifyContent: 'space-between'}}>
                  <p>{hint}</p>
                  <Button variant='outline-danger' onClick={removeHint}>X</Button>
                </div>
              ))}
            </div> 
          </div>
        </Form.Row>
      </Form>
      <Form style ={{margin: '20px', width: '80vw'}}>
        <Form.Row style={{display: 'flex', margin: '20px'}}>
          <Form.Group controlId="instructions" style={{width: '400px'}}>
            <Form.Label>Please enter instructions for the exercise</Form.Label>
            <Form.Control as="textarea" rows="6" value={initialForm.instructions} type="text" placeholder="Instructions for the exercise" onChange={handleExerciseForm} style={{resize:'none'}}/>
          </Form.Group>
          <div>
            <Form.Group style={{marginLeft: '20px'}} controlId="examples">
              <Form.Label>Please create examples for the exercise</Form.Label>
              <span style={{display: 'flex'}}>
                <Form.Control value={exampleText} type="text" placeholder="Examples" onChange={handleExerciseForm}/>
                <button onClick={addExample}>Add</button>
              </span>
            </Form.Group>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px', overflowY: 'scroll', maxHeight: '95px'}}>
              {initialForm.examples && initialForm.examples.map(example => (
                <div key={Math.floor(Math.random() * 10000)} 
                  style={{display: 'flex', justifyContent: 'space-between'}}>
                  <p>{example}</p>
                  <Button variant='outline-danger' onClick={removeExample}>X</Button>
                </div>
              ))}
            </div> 
          </div>
        </Form.Row>
      </Form>
    </div>
  );
}

export default ExerciseCreateStepThree;