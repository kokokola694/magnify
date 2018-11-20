import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistIndexItem = ({playlist}) => {
  return (
    <li className="index-item">
      <Link to={`/browse/playlists/${playlist.id}`}>
        <img className="index-item-img temp" src={playlist.photoUrl}/>
        <section>{playlist.title}</section>
        <section>{playlist.author}</section>
      </Link>

    </li>

  )
}

export default PlaylistIndexItem;
