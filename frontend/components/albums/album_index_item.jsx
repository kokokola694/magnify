import React from 'react';
import { Link } from 'react-router-dom';

const AlbumIndexItem = ({album}) => {
  return (
    <li className="index-item">
      <Link to={`/browse/albums/${album.id}`}>
        <img className="index-item-img" src={album.photoUrl}/>
        <section>{album.title}</section>
        <section className="album-item-artist">{album.artistName}</section>
      </Link>

    </li>

  )
}

export default AlbumIndexItem;
