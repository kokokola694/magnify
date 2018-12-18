import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({currentUser, logout}) => {
  const sessionLinks = () => {
    if (currentUser) {
      return (
        <div className="nav-bar-session">
          <NavLink to='/'>{currentUser ? currentUser.username : ""}</NavLink>
          <button onClick={logout}>Log Out</button>
        </div>
      )
    } else {
      return (
        <section className="nav-bar-session">
          <NavLink to='/signup'>Sign up</NavLink>
          <NavLink to='/login'>Log In</NavLink>
        </section>
      )
    }

  }

  return (
    <nav className="nav-bar">
      <section className="logo nav-bar-logo">
        <section id="favicon"></section>Magnify
      </section>
      <div className="nav-menu">
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="nav-drop-menu" htmlFor="menu-btn"><span className="navicon"></span></label>
        <section className="nav-bar-right">
          <section className="nav-bar-links">
            <a href='https://www.linkedin.com/in/michael-ko-7bb503b1/'>LinkedIn</a>
            <a href='https://github.com/kokokola694'>Github</a>
          </section>
           <div id="nav-div">|</div>
           {sessionLinks()}
           <section id="mobile-nav-logo" className="nav-bar-logo">
             <section id="favicon"></section>Magnify
           </section>
        </section>

      </div>


    </nav>
  )
}

export default NavBar;
