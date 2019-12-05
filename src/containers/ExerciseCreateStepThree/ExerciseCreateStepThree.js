import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import './ExerciseCreateStepThree.css';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';

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
    if (hintText.length) {
      let hint = hintText;
      const updatingExerciseForm = {...initialForm};
      updatingExerciseForm.hints.push(hint.trim());
      dispatch(fillInExercise(updatingExerciseForm));
      setHintText('');
    }
  }

  // ADDING EXAMPLES TO ARRAY IN REDUX STORE
  function addExample (e) {
    e.preventDefault();
    if (exampleText.length) {
      let example = exampleText;
      const updatingExerciseForm = {...initialForm};
      updatingExerciseForm.examples.push(example.trim());
      dispatch(fillInExercise(updatingExerciseForm));
      setExampleText('');
    }
  }

  // REMOVE HINTS AND UPDATE STORE
  function removeHint (e) {
    e.preventDefault();
    const target = e.target.parentElement.firstChild.innerText;
    const updatingExerciseForm = {...initialForm};
    const allHints = initialForm.hints.filter(hint => hint !== target
    );
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
   
    <>
    <Row>
      <Col sm={12}>

        <Form style ={{margin: '20px'}}>
          <Row className="third-step-firstRow">
            {/* <Form.Row style={{display: 'flex', margin: '20px'}}> */}
            <Col sm={6}>
              <Form.Group  controlId="placeholderCode" className="placeholder-code-editor">
                <Form.Label>Please create placeholder function here</Form.Label>
                <AceEditor
                  height='100%'
                  width='100%'
                  mode='javascript'
                  theme='tomorrow'
                  fontSize='16px'
                  tabSize={2}
                  onChange={handleFunctionPlaceholder}
                  value={initialForm.placeholderCode}
                  name='placeholderCode'
                  editorProps={{ $blockScrolling: true }}
                  style={{fontFamily: 'Roboto Mono', border:'3px solid black'}}
                />  
              </Form.Group>
            </Col>
            <Col sm={6}>
        
              <Form.Group  controlId="hints">
                <Form.Label>Hints for the exercise</Form.Label>
                <div style={{display: 'flex'}}>
                  <Form.Control value={hintText} type="text" placeholder="Hints" onChange={handleExerciseForm}/>
                  <button className='addBtnsApplicationExercise' variant="secondary" onClick={addHint}>Add</button>
                </div>
              </Form.Group>
              <ListGroup as="ul" className="hints-list-group">
                {initialForm.hints && initialForm.hints.map(hint => (
                  <ListGroup.Item 
                    as="li"
                    key={Math.floor(Math.random() * 10000)} 
                    className="hint-item">
                    <p className="hints-text">{hint}</p>
                    <Button variant='outline-danger' className="delete-hints-button" onClick={removeHint}>x</Button>
                  </ListGroup.Item>
                ))}

              </ListGroup>
            </Col>
          </Row>
        </Form>
      </Col>
      {/* </Form.Row> */}
      <Col sm={12}>

        <Form style ={{margin: '20px'}}>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="instructions" style={{width: '100%'}}>
                <Form.Label>Please enter instructions for the exercise</Form.Label>
                <Form.Control as="textarea" rows="6" value={initialForm.instructions} type="text" placeholder="Instructions for the exercise" onChange={handleExerciseForm} style={{resize:'none', height: '23.05vh'}}/>
              </Form.Group>

            </Col>
            <Col sm={6}>
            
              <Form.Group controlId="examples">
                <Form.Label>Please create examples for the exercise</Form.Label>
                <span style={{display: 'flex'}}>
                  <Form.Control value={exampleText} type="text" placeholder="Examples" onChange={handleExerciseForm}/>
                  <button className='addBtnsApplicationExercise' variant="secondary" onClick={addExample}>Add </button>
                </span>
              </Form.Group>
              <ListGroup as="ul" className="hints-list-group">
                {initialForm.examples && initialForm.examples.map(example => (
                  <ListGroup.Item 
                    as="li"
                    key={Math.floor(Math.random() * 10000)} 
                    className="hint-item">
                    <p className="hints-text">{example}</p>
                    <Button variant='outline-danger' className="delete-hints-button" onClick={removeExample}>x</Button>
                  </ListGroup.Item>
                ))}

              </ListGroup>


            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
    </>
  );
}

export default ExerciseCreateStepThree;