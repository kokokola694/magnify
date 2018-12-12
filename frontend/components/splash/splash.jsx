import React from 'react';
import NavBarContainer from './navbar_container';
import { Route, Link } from 'react-router-dom';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';
import AuthRoute from '../../util/route_util';
import Browse from '../browse/browse';

const Splash = () => {
  return (
    <div className="splash">
      <div id="splash-top">
        <NavBarContainer />
        <section className="splash-main">
          <h1>Music for everyone.</h1>
          <h2>"Millions" of songs for free.</h2>
          <div>
            <Link to='/signup'>Get Magnify Free</Link>
          </div>
        </section>
      </div>




      <footer className="splash-footer">
        <section className="splash-logo">
          <section id="favicon"></section>
          <Link to='/'>Magnify</Link></section>
        <section className="splash-footer-link">
          <div className="splash-footer-list">
            <section>
              <h3>About</h3>
              <ul >
                <li><a href='https://www.linkedin.com/in/michael-ko-7bb503b1/'>LinkedIn</a></li>
                <li><a href='https://github.com/kokokola694'>Github</a></li>
              </ul>
            </section>
            <section>
              <h3>Useful Links</h3>
              <ul >
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/login'>Log In</Link></li>
              </ul>
            </section>
          </div>
          <ul className="splash-footer-icons">
            <li><a href="http://instagram.com/spotify"><i className="fab fa-instagram"></i></a></li>
            <li><a href="http://twitter.com/spotify"><i className="fab fa-twitter"></i></a></li>
            <li><a href="http://facebook.com/Spotify"><i className="fab fa-facebook-f"></i></a></li>
          </ul>
        </section>
      </footer>
    </div>
  );
}

export default Splash;
