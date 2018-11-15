import React from 'react';

const AlbumIndexItem = ({album}) => {
  return (
    <li className="index-item">
      <img className="index-item-img" src={album.photoUrl}/>
      <section>{album.title}</section>
      <section>{album.artistName}</section>

    </li>

  )
}

export default AlbumIndexItem;
