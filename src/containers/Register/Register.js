import React from 'react';

import { logIn, logOut } from '../../redux/tesing';

import { useSelector, useDispatch } from 'react-redux';

function Register () {

  const logged = useSelector(state => state.logged);

  const dispatch = useDispatch();
  
  function handleClick () {
    logged ? dispatch(logOut()) : dispatch(logIn());
  }


  return (
    <div>
      <h1>Register</h1>
      <div>
        {
          !logged
            ?<button onClick={handleClick}>LogIn</button>
            : <div>
              <h2>You are IN!</h2>
              <button onClick={handleClick}>LogOut</button>
            </div>
        }
      </div>
      
    </div>
  );
}

export default Register;