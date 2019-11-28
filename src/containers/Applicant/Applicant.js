import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, Redirect } from 'react-router-dom';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-chaos';

import { useDispatch, useSelector } from 'react-redux';
import { getApplication } from '../../redux/applicant';


import './Applicant.css';

function Applicant () {

  const dispatch = useDispatch();
  const applicant = useSelector(store => store.application.application);
  
  const { id } = useParams();

  const [ code, setCode ] = useState('');

  const handleCodeChange = e => {
    setCode(e);
  };

  useEffect(() => {
    console.log(id);
    dispatch(getApplication(id));
  }, []);

  return (
    <Router>
      <div className="applicant-container">
        <div className="applicant-top">
          <div className="top-logo">Codeval</div>
          <div className="top-countdown">10:00</div>
          <div className="top-buttons">
            <button className="top-instructions-btn">Instructions</button>
            <button className="top-submit-btn">Submit</button>
          </div>
        </div>
        <div className="applicant-test">
          <div className="applicant-editor">
            <AceEditor
              mode='javascript'
              theme='monokai'
              onChange={handleCodeChange}
              value={code}
              defaultValue={applicant.exercise.placeholderCode}
              name='editorExercise'
            />
          </div>
          <div className="applicant-console-container">
            <div className="applicant-console">

            </div>
            <button className="applicant-test">Test</button>
          </div>
        </div>
      </div>
      
    </Router>

  );
}

export default Applicant;