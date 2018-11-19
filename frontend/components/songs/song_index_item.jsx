import React from 'react';
import DropMenu from '../playlists/drop_menu';

const SongIndexItem = ({song}) => {
  return (
    <li className="song-index-item">

      <i className="material-icons song-index-item-img">music_note</i>
      <section className="song-info">
        <h1>{song.title}</h1>
        <section className="song-info-bottom">
          {song.artistName} &middot; {song.albumName}
        </section>
      </section>
      <audio src={song.audioUrl} controls="controls">
          Your browser does not support the audio element.
      </audio>
      <DropMenu song={song}/>

    </li>

  )
}


export default SongIndexItem;
