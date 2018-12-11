import React from 'react';
import { NavLink } from 'react-router-dom';

// Remove else logic - this comp is rendered when not logged in.
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
        Magnify
      </section>
      <section className="nav-bar-right">
        <section className="nav-bar-links">
          <a href='https://www.linkedin.com/in/michael-ko-7bb503b1/'>LinkedIn</a>
          <a href='https://github.com/kokokola694'>Github</a>
        </section>
         <div>|</div>
         {sessionLinks()}
      </section>

    </nav>
  )
}

export default NavBar;
