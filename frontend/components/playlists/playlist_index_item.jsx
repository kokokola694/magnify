import React from 'react';

const PlaylistIndexItem = ({playlist}) => {
  return (
    <li className="index-item">
      <section>{playlist.title}</section>
      <section>{playlist.author}</section>

      <img className="index-item-img" src="http://downloadicons.net/sites/default/files/music-icons-789.png"/>
    </li>

  )
}

export default PlaylistIndexItem;
