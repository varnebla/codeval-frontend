import React from 'react';

import Button from 'react-bootstrap/Button';
import './Landing.css';

function Introduction () {


  return (
    <div className="introduction-background">
      <div className="box"/>
      <div className="text-block">
        <Button variant="primary" className="button-get-started">GET STARTED!</Button>
        <p className="codeval-explanation">CODEVAL is a tool for automatizing the process of first tech interviews. Made with love.</p>
      </div>
    </div>

  );
}

export default Introduction;