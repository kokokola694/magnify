import React from 'react';

const ArtistIndexItem = ({artist}) => {
  return (
    <li className="index-item">
      <img className="index-item-img" src={artist.photoUrl}/>
      <section>{artist.name}</section>

    </li>

  )
}

export default ArtistIndexItem;
