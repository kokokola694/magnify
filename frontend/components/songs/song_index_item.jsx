import React from 'react';
import DropMenu from '../playlists/drop_menu';
import { Link } from 'react-router-dom';

class SongIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
  }

  play () {
    this.props.addQueue(this.props.queue);
    this.props.fetchPlaySong(this.props.song.id);
  }

  pause() {
    this.props.pauseSong();
    document.getElementById('audio').pause();
  }

  resume() {
    this.props.resumeSong();
    document.getElementById('audio').play();
  }

  render() {
    const artistName = (
      <Link to={`/browse/artists/${this.props.song.artist_id}`}>{this.props.song.artistName}</Link>
    )

    const albumName = (
      <Link to={`/browse/albums/${this.props.song.album_id}`}>{this.props.song.albumName}</Link>
    )

    let playButton
    if (this.props.playSongId !== this.props.song.id ) {
      playButton = (<svg onClick={this.play} className="song-index-item-img icon-play" viewBox="0 0 85 100"><path fill="currentColor"
        d="M81 44.6c5 3 5 7.8 0 10.8L9 98.7c-5 3-9 .7-9-5V6.3c0-5.7 4-8 9-5l72
        43.3z"><title></title></path></svg>)
    } else if (this.props.playing) {
      playButton = (<svg onClick={this.pause}  className="song-index-item-img icon-pause green-text" viewBox="0 0 60 100"><path fill="currentColor"
        d="M0 8c0-5 3-8 8-8s9 3 9 8v84c0 5-4 8-9 8s-8-3-8-8V8zm43 0c0-5 3-8
        8-8s8 3 8 8v84c0 5-3 8-8 8s-8-3-8-8V8z"><title></title></path></svg>)
    } else {
      playButton = (<svg onClick={this.resume} className="song-index-item-img icon-play green-text" viewBox="0 0 85 100"><path fill="currentColor"
        d="M81 44.6c5 3 5 7.8 0 10.8L9 98.7c-5 3-9 .7-9-5V6.3c0-5.7 4-8 9-5l72
        43.3z"><title></title></path></svg>)
    }

    const songTitle = (this.props.playSongId !== this.props.song.id) ? (
      <h1>{this.props.song.title}</h1>
    ) : (
      <h1 className="green-text">{this.props.song.title}</h1>
    )

    const songDuration = (this.props.playSongId !== this.props.song.id) ? (
      <h2>{this.props.song.duration}</h2>
    ) : (
      <h2 className="green-text">{this.props.song.duration}</h2>
    )

    // <button onClick={this.play} className="song-index-item-img"></button>
    return (
      <li className="song-index-item">
        <div id="song-item-left">
          {playButton}
          <section className="song-info">
            {songTitle}
            <section className="song-info-bottom">
              {artistName}
              <div className="middot">&middot;</div>
              {albumName}
            </section>
          </section>
        </div>
        <div id="song-item-right">
          <DropMenu song={this.props.song} playlist={this.props.playlist}/>
          {songDuration}
        </div>
      </li>
    )
  }
}


export default SongIndexItem;
