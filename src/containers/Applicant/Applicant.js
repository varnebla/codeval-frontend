import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Countdown from 'react-countdown-now';
import Modal from 'react-bootstrap/Modal';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';
import moment from 'moment';

import Console from '../Console/Console';

import { updateTestCreator, submitApplication } from '../../redux/applicant';

import './Applicant.css';
import '../../assets/CodeEditor.css';

function Applicant () {

  const dispatch = useDispatch();
  const applicant = useSelector(store => store.applicant);
  
  // STATES
  const [ code, setCode ] = useState('');
  const [ countdown, setCountdown ] = useState('');
  const [ submitting, setSubmitting ] = useState(false);
  const [ hintsArr, setHintsArr ] = useState([]);
  const [ hints, setHints ] = useState([]);
  const [ testClicked, setTestClicked ] = useState([]);
  const [ copyPaste, setCopyPaste ] = useState([]);
  const [ copies, setCopies ] = useState([]);
  
  // MODALS
  const [ showSub, setShowSub ] = useState(false);
  const setModalSub = () => setShowSub(!showSub);
  const [ showCd, setShowCd ] = useState(false);
  const setModalCd = () => setShowCd(true);
  const [ showHintAlert, setShowHintAlert ] = useState(false);
  const setModalHintAlert = () => setShowHintAlert(!showHintAlert);
  const [ showHint, setShowHint ] = useState(false);
  const setModalHint = () => setShowHint(!showHint);
  
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

  const returnTests = (suitesArr) => {
    const tests = [];
    suitesArr.forEach(suite => suite.forEach(test => {
      const passed = test.state === 'passed' ? true : false;
      tests.push({
        title: test.title,
        passed
      });
    }));
    return tests;
  };

  const handleSubmit = () => {
    handleTest();
    setSubmitting(true);
  };

  const handleHints = () => {
    setModalHintAlert();
    const hint = hintsArr.pop();
    setHints([...hints, {
      title: hint,
      used: true,
      time: Date.now()
    }]);
    setModalHint();
  };

  const calculateScore = (tests, hints, expectedDuration, duration, copyAndPaste) => {
    let result = 0;
    // CHECK THE TESTS PASSED
    tests.forEach(test => {
      if (test) result += 50 / tests.length;
    });
    result = Math.floor(result);
    // CHECK THE HINTS USED
    hints.forEach(hint => {
      if (!hint) result += 20 / hints.length;
    });
    result = Math.floor(result);
    // CHECK THE DURATION
    const minimumDuration = expectedDuration/2;
    if (duration < minimumDuration) result += 10;
    else result += Math.floor(10 - ((duration - minimumDuration) * 10) / minimumDuration);
    // CHECK THE COPY AND PASTE
    let substractCopy = 0;
    copyAndPaste.forEach(string => {
      if (string.length > 40) substractCopy += 20;
      else substractCopy += 10;
    });
    if (substractCopy < 20) result += 20 - substractCopy;
    if (result > 100) result = 100;
    if (result < 0) result = 0;
    return result;
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(applicant.situation).length) {
        const passed = checkPassed(applicant.situation.stats.tests, applicant.situation.stats.passes);
        const testResults = returnTests(applicant.situation.suites);
        const start = moment(applicant.startingTime);
        const end = moment();
        const duration = moment.duration(end.diff(start))._milliseconds;
        const finalHints = [...hints, ...hintsArr.map(hint => {
          return {
            title: hint,
            used: false,
            time: 0
          };
        })];
        const finalScore = calculateScore(
          testResults.map(test => test.passed),
          finalHints.map(hint => hint.used),
          applicant.exercise.duration,
          duration,
          copyPaste.map(copy => copy.content)
        );
        const report = {
          submittedCode: code,
          tests: testResults,
          hints: finalHints,
          passed,
          duration,
          finalScore,
          copyPaste,
          testClicked,
          completionTime: Date.now()
        };
        dispatch(submitApplication(applicant._id, report));
      }
    } else {
      if (code.length) {
        const newTestClicked = {
          time: Date.now(),
          currentCode: code
        };
        setTestClicked([...testClicked, newTestClicked]);  
      }
    }
  }, [applicant]);

  const handleCopy = (string) => setCopies([...copies, string.text]);

  const handlePaste = (string) => {
    if (!copies.includes(string.text)) setCopyPaste([...copyPaste, {
      content: string.text,
      time: Date.now()
    }]);
  };

  useEffect(() => {
    setCountdown(moment(applicant.startingTime).add(applicant.exercise.duration, 'milliseconds')._d);
    setHintsArr(applicant.exercise.hints);
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
        <Countdown date={countdown} onComplete={setModalCd} daysInHours={true}/>
      </div>
      <div className="applicant-top">
        <div className="top-logo">Codeval</div>
        <div className="top-buttons">
          {
            !!hintsArr.length && <button className="top-hints-btn" onClick={setModalHintAlert}>HINTS</button>
          }
        </div>
      </div>
      <div className="applicant-instructions">
        <div className="instructions-container">
          <div className="instructions-info">
            <div className="instructions-instructions">
              <h1 className="instructions-title">{'// Instructions'}</h1>
              <p className="instructions-text">{applicant.exercise.instructions}</p>
            </div>
            <div className="instructions-examples">
              <h1 className="instructions-title">{'// Examples'}</h1>
              {applicant.exercise.examples.map((example, i) => <p key={i} className="instructions-text">{example}</p>)}
            </div>
          </div>
          <div className="instructions-scroll">Scroll down</div>
        </div>
      </div>
      <div className="applicant-test">
        <div className="test-container">
          <div className="applicant-editor">
            <AceEditor
              mode='javascript'
              theme='tomorrow'
              onChange={handleCodeChange}
              value={code}
              height='100%'
              width='100%'
              name='editorExercise'
              onLoad={loadCode}
              onCopy={handleCopy}
              onPaste={handlePaste}
              style={{color: 'black', fontFamily: 'Roboto Mono'}}
            />
          </div>
          <div className="applicant-console-container">
            <div className="applicant-console">
              <Console/>
            </div>
            <div className="applicant-console-buttons">
              <button className="applicant-test-btn test" onClick={handleTest}>Test</button>
              <button className="applicant-test-btn submit" onClick={setModalSub}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <iframe style={{display: 'none'}} sandbox='allow-scripts' title='dontknow' id='sandboxed' src={process.env.PUBLIC_URL + '/test.html'}></iframe>

      {/* MODALS */}
      <Modal show={showCd} centered>
        <div className="applicant-modal">
          <p>Time to submit</p>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </Modal>
      <Modal show={showHintAlert} onHide={setModalHintAlert} centered>
        <div className="applicant-modal">
          <p className="applicant-modal-title">its okay to use hints</p>
          <div className="applicant-modal-btn-container">
            <button className="applicant-modal-btn no" onClick={setModalHintAlert}>No</button>
            <button className="applicant-modal-btn yes" onClick={handleHints}>Yes</button>
          </div>
        </div>
      </Modal>
      <Modal show={showHint} onHide={setModalHint} centered>
        <div className="applicant-modal">
          <p className="applicant-hint">{!!hints.length && hints[hints.length-1].title}</p>
        </div>
      </Modal>
      <Modal show={showSub} onHide={setModalSub} centered dialogClassName="something-modal">
        <div className="applicant-modal">
          <p className="applicant-modal-title">Are you sure you want to submit?</p>
          <div className="applicant-modal-btn-container">
            <button className="applicant-modal-btn no" onClick={setModalSub}>No</button>
            <button className="applicant-modal-btn yes" onClick={handleSubmit}>Yes</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Applicant;