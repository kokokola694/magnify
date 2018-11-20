import React from 'react';
import DropMenu from '../playlists/drop_menu';
import { Link } from 'react-router-dom';

const SongIndexItem = ({song, playlist}) => {
  // <audio src={song.audioUrl} controls="controls">
  //   Your browser does not support the audio element.
  // </audio>
  const randTime = ["1:04", "3:29", "2:21", "2:47", "3:08"];
  const randIdx = Math.floor(Math.random() * 5);
  const time = randTime[randIdx];

  const artistName = (
    <Link to={`/browse/artists/${song.artist_id}`}>{song.artistName}</Link>
  )

  const albumName = (
    <Link to={`/browse/albums/${song.album_id}`}>{song.albumName}</Link>
  )

  return (
    <li className="song-index-item">
      <div id="song-item-left">
        <i className="material-icons song-index-item-img">music_note</i>
        <section className="song-info">
          <h1>{song.title}</h1>
          <section className="song-info-bottom">
            {artistName}
            <div className="middot">
              &middot;
            </div>
            {albumName}
          </section>
        </section>
      </div>
      <div id="song-item-right">
        <DropMenu song={song} playlist={playlist}/>
        <h2>{time}</h2>
      </div>
    </li>

  )
}


export default SongIndexItem;
