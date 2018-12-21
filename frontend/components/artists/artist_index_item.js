import React from 'react';
import { Link } from 'react-router-dom';

const ArtistIndexItem = ({artist: {id, name, photoUrl}}) => {
  return (
    <li className="index-item">
      <Link to={`/browse/artists/${id}`}>
        <img className="index-item-img avatar" src={photoUrl}/>
        <section>{name}</section>
      </Link>
    </li>
  )
}

export default ArtistIndexItem;
