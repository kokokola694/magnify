import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const BrowseNavbar = (props) => {

  return (
    <nav className="collection-navbar">
      <nav className="browse-navbar">
        <NavLink to={`/${props.navType}/playlists`}>Playlists</NavLink>
        <NavLink to={`/${props.navType}/artists`}>Artists</NavLink>
        <NavLink to={`/${props.navType}/albums`}>Albums</NavLink>
        <NavLink to={`/${props.navType}/songs`}>Songs</NavLink>
        {props.openModal}
      </nav>
    </nav>
  )
}


export default BrowseNavbar;
