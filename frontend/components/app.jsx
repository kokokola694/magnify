import React from 'react';
import Splash from './splash/splash';
import {AuthRoute, ProtectedRoute} from '../util/route_util';
import LoginFormContainer from './splash/login_form_container';
import SignupFormContainer from './splash/signup_form_container';
import Browse from './browse/browse';
import Collection from './collection/collection';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer}/>
        <ProtectedRoute path="/browse/" component={Browse}/>
        <ProtectedRoute path="/collection/" component={Collection}/>
        <ProtectedRoute path="/search/" component={Browse}/>
        <AuthRoute exact path="/" component={Splash} />
      </Switch>
    </>
  )
}

export default App;
