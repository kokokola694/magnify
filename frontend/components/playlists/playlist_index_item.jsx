import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistIndexItem = ({playlist}) => {
  return (
    <li className="index-item">
      <Link to={`/browse/playlists/${playlist.id}`}>
        <img className="index-item-img" src={playlist.photoUrl}/>
        <section>{playlist.title}</section>
      </Link>
      <Link id="user-show-link" to={`/browse/users/${playlist.author_id}`}>{playlist.author}</Link>

    </li>

  )
}

export default PlaylistIndexItem;
