import React from 'react';
import { Link } from 'react-router-dom';

const AlbumIndexItem = ({album: {id, photoUrl, title, artist_id, artistName}}) => {
  return (
    <li className="index-item">
      <Link to={`/browse/albums/${id}`}>
        <img className="index-item-img" src={photoUrl}/>
        <section>{title}</section>
      </Link>
      <Link to={`/browse/artists/${artist_id}`}>
        <section className="album-item-artist">{artistName}</section>
      </Link>
    </li>
  )
}

export default AlbumIndexItem;
