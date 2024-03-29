import React from 'react';
import { useSelector } from 'react-redux';

import './Console.css';

function Console () {

  const situation = useSelector(store => store.applicant.situation);
  const suites = useSelector(store => store.applicant.situation.suites);

  return (
    <div className="console-div">
      {
        !situation.stats
          ? <p>Start testing</p>
          : <div>
            <div className="logs-container">
              {
                !!situation.consoles.length
                && <div>
                  <h1 className="console-title">Console</h1>
                  {situation.consoles.map((logCons, i) => <p key={i} className="console-text">{logCons}</p>)}
                  <div className="logs-padding"/>
                </div>
              }
            </div>
            <div className="test-result-container">
              <h1 className="console-title">Tests</h1>
              {
                suites.map((suite, suiteIndex) => <div key={suiteIndex}>{
                  suite.map((test, testIndex) => <div key={testIndex}>{
                    <div>
                      <p className="test-title" style={test.state === 'passed' ? {color: 'green'}:{color: 'red'}}>{test.title}</p>
                      {
                        test.state !== 'passed' && <p className="test-error">{test.err.message}</p>
                      }
                    </div>
                  }</div>)
                }</div>)
              }
            </div>
          </div>
      }
    </div>
  );
}

export default Console;