import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Countdown from 'react-countdown-now';
import Modal from 'react-bootstrap/Modal';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-chaos';
import moment from 'moment';

import Console from '../Console/Console';

import { updateTestCreator, submitApplication } from '../../redux/applicant';

import './Applicant.css';

function Applicant () {

  const dispatch = useDispatch();

  const applicant = useSelector(store => store.applicant);
  
  const [ code, setCode ] = useState('');
  const [ showInst, setShowInst ] = useState(false);
  const [ showSub, setShowSub ] = useState(false);
  const [ showCd, setShowCd ] = useState(false);
  const [ countdown, setCountdown ] = useState('');

  // IN PROCESS
  // const [ testResults, setTestResults ] = useState([]);
  // const [ hintsUsed, setHintsUsed ] = useState([]);
  // const [ duration, setDuration ] = useState(0);
  // const [ finalScore, setFinalScore ] = useState(0);
  // const [ proces, setProces ] = useState([]);
  // const [ copyPaste, setCopyPaste ] = useState([]);

  const setModalInst = () => setShowInst(!showInst);
  const setModalSub = () => setShowSub(!showSub);
  const setModalCd = () => setShowCd(true);

  const handleCodeChange = e => setCode(e);
  const loadCode = () => setCode(applicant.exercise.placeholderCode);

  const handleTest = () => {
    const tests = applicant.exercise.tests;
    const final = code + '\n' + tests;
    const frame = document.getElementById('sandboxed');
    frame.contentWindow.postMessage(final, '*');
  };

  const checkPassed = (tests, passes) => {
    if (tests === passes) return true;
    return false;
  };

  const handleSubmit = () => {
    handleTest();
    if (Object.keys(applicant.situation).length) {
      const passed = checkPassed(applicant.situation.stats.tests, applicant.situation.stats.passes);
      const report = {
        submittedCode: code,
        completionTime: Date.now(), 
        passed,
      };
      dispatch(submitApplication(applicant._id, report));
    }
  };

  useEffect(() => {
    setCountdown(moment(applicant.startingTime).add(applicant.exercise.duration, 'milliseconds')._d);
    window.addEventListener('message', e => {
      const frame = document.getElementById('sandboxed');
      if (e.origin === 'null' && e.source === frame.contentWindow) {
        dispatch(updateTestCreator(e.data));
      }
    });
  }, []);
  
  useEffect(() => {
    if (moment() > moment(countdown)) setModalCd();
  }, [countdown]);

  return (
    <div className="applicant-container">
      <div className="applicant-countdown">
        <Countdown date={moment(applicant.startingTime).add(applicant.exercise.duration, 'milliseconds')._d} onComplete={setModalCd}/>
        <Modal show={showCd}>
          <p>Time to submit</p>
          <button onClick={handleSubmit}>Submit</button>
        </Modal>
      </div>
      <div className="applicant-top">
        <div className="top-logo">Codeval</div>
        <div className="top-buttons">
          <button className="top-instructions-btn" onClick={setModalInst}>Instructions</button>
          <Modal show={showInst} onHide={setModalInst}>
            <h1>Instructions</h1>
            <p>{applicant.exercise.instructions}</p>
          </Modal>
          <button className="top-submit-btn" onClick={setModalSub}>Submit</button>
          <Modal show={showSub} onHide={setModalSub}>
            <p>Are you sure you want to submit?</p>
            <button onClick={setModalSub}>No</button>
            <button onClick={handleSubmit}>Yes</button>
          </Modal>
        </div>
      </div>

      <div className="applicant-test">
        <div className="applicant-editor">
          <AceEditor
            mode='javascript'
            theme='monokai'
            onChange={handleCodeChange}
            value={code}
            height='100%'
            width='100%'
            name='editorExercise'
            onLoad={loadCode}
          />
        </div>
        <div className="applicant-console-container">
          <div className="applicant-console">
            <Console/>
          </div>
          <button className="applicant-test-btn" onClick={handleTest}>Test</button>
        </div>
      </div>
      <iframe style={{display: 'none'}} sandbox='allow-scripts' title='dontknow' id='sandboxed' src={process.env.PUBLIC_URL + '/test.html'}></iframe>
    </div>

  );
}

export default Applicant;