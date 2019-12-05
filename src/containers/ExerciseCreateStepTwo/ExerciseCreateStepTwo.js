import React from 'react';

import Form  from 'react-bootstrap/Form';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import './ExerciseCreateStepTwo.css';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';

import { fillInExercise } from '../../redux/exercises';
import { useDispatch, useSelector } from 'react-redux';


function ExerciseCreateStepTwo () {

  const dispatch = useDispatch();
  const initialForm = useSelector(store => store.exercises.exerciseCreate);


  // YOU CAN ONLY TARGET EVENT WHICH IS VALUE IN CODE EDITOR DIRECTLY SEPARATE FUNCTIONS NEEDED
  // FOR FUNCTION EDITOR
  function handleFunctionEditor (e) {
    const updatingExerciseForm = {...initialForm};
    updatingExerciseForm.solution = e;
    dispatch(fillInExercise(updatingExerciseForm));
  }
  // FOR TESTS EDITOR
  function handleTestsEditor (e) {
    const updatingExerciseForm = {...initialForm};
    updatingExerciseForm.tests = e;
    dispatch(fillInExercise(updatingExerciseForm));
  }



  return (
    // style={{width: '60vw', height: '55vh'}}
    <>
      <Form className="form-create-tests">
        {/* <Form.Row style={{display: 'flex', justifyContent: 'space-between', margin: '20px'}}> */}
        <Row>
          <Col sm={6}>
            <Form.Group  controlId="placeholderCode" className="code-editor">
              <Form.Label>Please create your function here</Form.Label>
              <AceEditor
                height='100%'
                width='100%'
                mode='javascript'
                theme='tomorrow'
                fontSize='16px'
                tabSize={2}
                onChange={handleFunctionEditor}
                value={initialForm.solution}
                name='functionCode'
                editorProps={{ $blockScrolling: true }}
                style={{fontFamily: 'Roboto Mono', border:'3px solid black'}}
                highlightActiveLine={false}
              />  
            </Form.Group>

          </Col>
          <Col sm={6}>
            <Form.Group  controlId="testsCode" className="code-editor" >
              <Form.Label>Please create your tests here</Form.Label>
              <AceEditor
                height='100%'
                width='100%'
                mode='javascript'
                theme='tomorrow'
                fontSize='16px'
                tabSize={2}
                onChange={handleTestsEditor}
                value={initialForm.tests}
                name='testsCode'
                editorProps={{ $blockScrolling: true }}
                style={{fontFamily: 'Roboto Mono', border:'3px solid black'}}
              />  
            </Form.Group>

          </Col>
        </Row>
        {/* </Form.Row> */}
      </Form>
    </>
  );
}

export default ExerciseCreateStepTwo;