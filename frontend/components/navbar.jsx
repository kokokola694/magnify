import React from 'react';
import { NavLink } from 'react-router-dom';

// Remove else logic - this comp is rendered when not logged in.
const NavBar = ({currentUser, logout}) => {
  const sessionLinks = () => {
    if (currentUser) {
      return (
        <div>
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
      <section className="nav-bar-logo">
        m a g n i f y
      </section>
      <section className="nav-bar-right">
        <section className="nav-bar-links">
          <NavLink to='/'>Premium</NavLink>
          <NavLink to='/'>Help</NavLink>
          <NavLink to='/'>Download</NavLink>
        </section>
         | {sessionLinks()}
      </section>

    </nav>
  )
}

export default NavBar;
