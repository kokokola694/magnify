import React from 'react';
import { NavLink } from 'react-router-dom';

const SearchNavbar = ({input}) => {

  return (
    <nav className="search-navbar browse-navbar">
      <NavLink to={`/search/results/${input}`}>Top Results</NavLink>
      <NavLink to={`/search/playlists/${input}`}>Playlists</NavLink>
      <NavLink to={`/search/artists/${input}`}>Artists</NavLink>
      <NavLink to={`/search/albums/${input}`}>Albums</NavLink>
      <NavLink to={`/search/songs/${input}`}>Songs</NavLink>
    </nav>
  )
}


export default SearchNavbar;
