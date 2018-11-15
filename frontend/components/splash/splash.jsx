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
      <NavBarContainer />

      <section className="splash-main">
        <h1>Music for everyone.</h1>
        <h2>"Millions" of songs. No credit card needed.</h2>
        <div>
          <Link to='/signup'>Get Magnify Free</Link>
        </div>
      </section>

      <footer className="splash-footer">
        <section className="nav-bar-logo">magnify</section>
        <section className="splash-footer-link">
          <div className="splash-footer-list">
            <section>
              <h3>Company</h3>
              <ul >
                <li><a href="#">About</a></li>
                <li><a href="#">Jobs</a></li>
                <li><a href="#">For the Record</a></li>
              </ul>
            </section>
            <section>
              <h3>Communities</h3>
              <ul >
                <li><a href="#">For Artists</a></li>
                <li><a href="#">Developers</a></li>
                <li><a href="#">Brands</a></li>
                <li><a href="#">Investors</a></li>
                <li><a href="#">Vendors</a></li>
              </ul>
            </section>
            <section>
              <h3>Useful Links</h3>
              <ul >
                <li><a href="#">Help</a></li>
                <li><a href="#">Gift</a></li>
                <li><a href="#">Web Player</a></li>
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
