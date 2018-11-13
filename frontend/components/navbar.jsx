import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = ({currentUser, logout}) => {
  const sessionLinks = () => {
    if (currentUser) {
      return (
        <div>
          <NavLink to='/'>{currentUser ? currentUser.username : "abc"}</NavLink>
          <button onClick={logout}>Log Out</button>
        </div>
      )
    } else {
      return (
        <div>
          <NavLink to='/signup'>Sign up</NavLink>
          <NavLink to='/login'>Log In</NavLink>
        </div>
      )
    }

  }

  return (
    <header>
      <div>
        <NavLink to='/'>Premium</NavLink>
        <NavLink to='/'>Help</NavLink>
        <NavLink to='/'>Download</NavLink>
      </div>
      {sessionLinks()}
    </header>
  )
}

export default NavBar;
