import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const BrowseNavbar = (props) => {
  const browseBar =  props.noNavBar ? null : (
    <nav className="complete-navbar">
      <div></div>
      <nav className="browse-navbar">
        {props.navType === "search" ? <NavLink to={`/search/results`}>Top Results</NavLink> : null}
        {props.navType === "browse" ? <NavLink to={`/${props.navType}/featured`}>Featured</NavLink> : null}
        <NavLink to={`/${props.navType}/playlists`}>Playlists</NavLink>
        <NavLink to={`/${props.navType}/artists`}>Artists</NavLink>
        <NavLink to={`/${props.navType}/albums`}>Albums</NavLink>
        <NavLink to={`/${props.navType}/songs`}>Songs</NavLink>
      </nav>
      {props.openModal}
    </nav>
  );
  return (
    <>
      {browseBar}
    </>
  )
}


export default BrowseNavbar;
