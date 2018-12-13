import React from 'react';
import { Link } from 'react-router-dom';

export default ({song, album, artist}) => {
  return (
    <li id={song.id} className="recent-item">
      <Link to={`/browse/albums/${album.id}`}>
        <h3>{song.title}</h3>
        <h4>{album.title}</h4>
      </Link>
    </li>
  )
}
