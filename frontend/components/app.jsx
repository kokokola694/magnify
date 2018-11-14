import React from 'react';
import NavBarContainer from './navbar_container';
import { Route } from 'react-router-dom';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';
import AuthRoute from '../util/route_util';
import Browse from './browse';

const App = () => {
  return (
    <div className="splash">
      <NavBarContainer />

      <section className="main-content">
        <h1>Music for everyone.</h1>
        <h2>"Millions" of songs. No credit card needed.</h2>
        <button>Get Spotify Free</button>
      </section>

      <AuthRoute path="/browse/playlists" component={Browse} />
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer}/>
    </div>
  );
}

export default App;
