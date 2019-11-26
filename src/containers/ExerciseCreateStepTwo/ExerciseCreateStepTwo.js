import React from 'react';

import {Form } from 'react-bootstrap';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

import { fillInExercise } from '../../redux/createExercise';
import { useDispatch, useSelector } from 'react-redux';


function ExerciseCreateStepTwo () {

  const dispatch = useDispatch();
  const initialForm = useSelector(store => store.createExercise);


  // YOU CAN ONLY TARGET EVENT WHICH IS VALUE IN CODE EDITOR DIRECTLY SEPARATE FUNCTIONS NEEDED
  // FOR FUNCTION EDITOR
  function handleFunctionEditor (e) {
    const updatingExerciseForm = {...initialForm};
    updatingExerciseForm.placeholderCode = e;
    dispatch(fillInExercise(updatingExerciseForm));
  }
  // FOR TESTS EDITOR
  function handleTestsEditor (e) {
    const updatingExerciseForm = {...initialForm};
    updatingExerciseForm.tests = e;
    dispatch(fillInExercise(updatingExerciseForm));
  }



  return (
    <div>
      <h1>ExerciseCreateStepTwo</h1>
      <Form style ={{margin: '20px'}}>
        <Form.Row style={{display: 'flex', justifyContent: 'space-between', margin: '20px'}}>
          <Form.Group  controlId="placeholderCode" >
            <Form.Label>Please create your function here</Form.Label>
            <AceEditor
              mode='javascript'
              theme='monokai'
              fontSize='20px'
              tabSize={2}
              onChange={handleFunctionEditor}
              value={initialForm.placeholderCode}
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
              tabSize={2}
              onChange={handleTestsEditor}
              value={initialForm.tests}
              name='testsCode'
              editorProps={{ $blockScrolling: true }}
            />  
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
}

export default ExerciseCreateStepTwo;