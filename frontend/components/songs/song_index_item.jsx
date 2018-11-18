import React from 'react';
// import { connect } from 'react-redux';


const SongIndexItem = ({song, openModal}) => {
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
      <div className="playlist-addto">
        <button className="playlist-addto-btn" onClick={() => dispatch(openModal("addToPlaylist"))}>
          Add To Playlist
        </button>
      </div>

    </li>

  )
}


export default SongIndexItem;
