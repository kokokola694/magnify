import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const BrowseNavbar = ({ noNavBar, navType, openModal }) => {
  const browseBar =  noNavBar ? null : (
    <nav className="complete-navbar">
      <div></div>
      <nav className="browse-navbar">
        {navType === "search" ?
          <NavLink to={`/search/results`}>Top Results</NavLink> : null}
        {navType === "browse" ?
          <NavLink to={`/${navType}/featured`}>Featured</NavLink> : null}
        {navType === "browse" ?
          <NavLink to={`/${navType}/genres`}>Genres</NavLink> : null}
        <NavLink to={`/${navType}/playlists`}>Playlists</NavLink>
        <NavLink to={`/${navType}/artists`}>Artists</NavLink>
        <NavLink to={`/${navType}/albums`}>Albums</NavLink>
        {navType === "collection" ?
          <NavLink to={`/${navType}/songs`}>Songs</NavLink> : null}
      </nav>
      {openModal}
    </nav>
  );
  return (
    <>
      {browseBar}
    </>
  )
}


export default BrowseNavbar;
