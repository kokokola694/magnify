import React from 'react';
import Splash from './splash/splash';
import {AuthRoute, ProtectedRoute} from '../util/route_util';
import LoginFormContainer from './splash/login_form_container';
import SignupFormContainer from './splash/signup_form_container';
import Browse from './browse/browse';
import Collection from './collection/collection';
import Search from './search/search_container';
import { Switch, Route } from 'react-router-dom';
import Modal from './playlists/modal';
import Player from './player/player';

const App = () => {
  return (
    <>
      <Route path="/" component={Modal}/>

      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer}/>
        <ProtectedRoute path="/browse/" component={Browse}/>
        <ProtectedRoute path="/collection/" component={Collection}/>
        <ProtectedRoute path="/search/" component={Search}/>
        <AuthRoute exact path="/" component={Splash} />
      </Switch>
    </>
  )
}

export default App;
