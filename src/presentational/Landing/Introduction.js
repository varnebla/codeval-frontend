import React from 'react';

import Button from 'react-bootstrap/Button';
import './Landing.css';

function Introduction (props) {


  return (
    <div className="introduction-container">
      <div className="introduction-background">
        <div className="introduction-box">
          <div className="box">
            <div className="landing-video"></div>
          </div>

        </div>
        <div className="text-block">
          <div className="brand-title"/>
          <p className="slogan">Take your tech interviews to the next level</p>
          <Button variant="primary" onClick={props.handleGetStarted} className="button-get-started">GET STARTED!</Button>
          <p className="codeval-explanation">CODEVAL is an amazing tool for automatizing the process of first tech interviews. Made with love.</p>
        </div>
      </div>

    </div>

  );
}

export default Introduction;