import React from 'react';
import { NavLink } from 'react-router-dom';

const BrowseNavbar = (props) => {
  return (
    <nav className="browse-navbar">
      <NavLink to={`${props.navType}/playlists`}>Playlists</NavLink>
      <NavLink to={`${props.navType}/artists`}>Artists</NavLink>
      <NavLink to={`${props.navType}/albums`}>Albums</NavLink>
      <NavLink to={`${props.navType}/songs`}>Songs</NavLink>
    </nav>
  )
}


export default BrowseNavbar;
