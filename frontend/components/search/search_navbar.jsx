import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const SearchNavbar = (props) => {

  return (
    <nav className="search-navbar browse-navbar">
      <NavLink to={`/search/results/${props.input}`}>Top Results</NavLink>
      <NavLink to={`/search/playlists/${props.input}`}>Playlists</NavLink>
      <NavLink to={`/search/artists/${props.input}`}>Artists</NavLink>
      <NavLink to={`/search/albums/${props.input}`}>Albums</NavLink>
      <NavLink to={`/search/songs/${props.input}`}>Songs</NavLink>
    </nav>
  )
}


export default SearchNavbar;
