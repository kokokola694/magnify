import React from 'react';
import { Link } from 'react-router-dom';

const ArtistIndexItem = ({artist}) => {
  return (
    <li className="index-item">
      <Link to={`artists/${artist.id}`}>
        <img className="index-item-img" src={artist.photoUrl}/>
        <section>{artist.name}</section>
      </Link>
    </li>

  )
}

export default ArtistIndexItem;
