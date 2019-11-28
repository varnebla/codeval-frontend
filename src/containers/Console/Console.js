import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-chaos';
import Spinner from 'react-bootstrap/Spinner';


import { useDispatch, useSelector } from 'react-redux';
import { getApplication, updateTestCreator } from '../../redux/applicant';


import './Console.css';

function Console () {

  const situation = useSelector(store => store.applicant.situation);
  const suites = useSelector(store => store.applicant.situation.suites);

  return (
    <div className="console">
      {
        !situation.stats
          ? <p>Start testing</p>
          : <div>

            <div className="logs-container">
              {
                !!situation.consoles.length && situation.consoles.map((logCons, i) => <p key={i}>{logCons}</p>)
              }
            </div>
            <div className="test-result-container"></div>
            {
              suites.map((suite, suiteIndex) => <div key={suiteIndex}>{
                suite.map((test, testIndex) => <div key={testIndex}>{
                  <div>
                    <p>{test.title}</p>
                    {
                      test.state === 'passed'
                        ? <p>passed</p>
                        : <p>{test.err.message}</p>
                    }
                  </div>
                }</div>)
              }</div>)
            }
          </div>
      }

    </div>
  );
}

export default Console;