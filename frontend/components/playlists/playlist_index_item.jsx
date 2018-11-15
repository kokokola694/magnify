import React from 'react';

const PlaylistIndexItem = ({playlist}) => {
  return (
    <li className="index-item">
      <img className="index-item-img" src={playlist.photoUrl}/>
      <section>{playlist.title}</section>
      <section>{playlist.author}</section>

    </li>

  )
}

export default PlaylistIndexItem;
