import React from 'react';

import {useDispatch} from 'react-redux';
import {sendLogout} from '../../redux/authentication';

import Button from 'react-bootstrap/Button'

function Settings () {
  
  const dispatch = useDispatch();

  function handleLogOut () {
    dispatch(sendLogout());
  }

  return (
    <div>
      <h1>Settings</h1>
      <Button variant='primary' onClick={handleLogOut}>Log out</Button>
    </div>
  );
}

export default Settings;