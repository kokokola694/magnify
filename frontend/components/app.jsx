import React from 'react';
import Splash from './splash/splash';
import {AuthRoute, ProtectedRoute} from '../util/route_util';
import LoginFormContainer from './splash/login_form_container';
import SignupFormContainer from './splash/signup_form_container';
import { Switch, Route } from 'react-router-dom';
import Modal from './playlists/modal';
import Home from './home/home';

const App = () => {
  return (
    <>
      <Route path="/" component={Modal}/>
      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer}/>
        <AuthRoute exact path="/" component={Splash} />
        <ProtectedRoute path="/" component={Home}/>
      </Switch>
    </>
  )
}

export default App;
