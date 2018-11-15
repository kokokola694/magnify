import React from 'react';
import { NavLink } from 'react-router-dom';

const BrowseNavbar = (props) => {
  return (
    <nav className="browse-navbar">
      <NavLink to='/browse/playlists'>Playlists</NavLink>
      <NavLink to='/browse/artists'>Artists</NavLink>
      <NavLink to='/browse/albums'>Albums</NavLink>
      <NavLink to='/browse/songs'>Songs</NavLink>
    </nav>
  )
}


export default BrowseNavbar;
