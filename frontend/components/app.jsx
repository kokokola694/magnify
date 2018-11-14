import React from 'react';
import Splash from './splash';
import {AuthRoute, ProtectedRoute} from '../util/route_util';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';
import Browse from './browse';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer}/>
        <ProtectedRoute path="/browse/" component={Browse}/>
        <AuthRoute exact path="/" component={Splash} />
      </Switch>
    </>
  )
}

export default App;
