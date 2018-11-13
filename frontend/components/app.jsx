import React from 'react';
import NavBarContainer from './navbar_container';
import { Route } from 'react-router-dom';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';
import AuthRoute from '../util/route_util';

const App = () => {
  return (
    <div>
      <NavBarContainer />
      <h1>Magnify</h1>

      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer}/>
    </div>
  );
}

export default App;
