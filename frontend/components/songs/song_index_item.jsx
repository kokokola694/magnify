import React from 'react';
import DropMenu from '../playlists/drop_menu';
import { Link } from 'react-router-dom';

class SongIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
  }

  play () {
    this.props.addQueue(this.props.queue);
    this.props.fetchPlaySong(this.props.song.id);
  }

  render() {
    const artistName = (
      <Link to={`/browse/artists/${this.props.song.artist_id}`}>{this.props.song.artistName}</Link>
    )

    const albumName = (
      <Link to={`/browse/albums/${this.props.song.album_id}`}>{this.props.song.albumName}</Link>
    )

    return (
      <li className="song-index-item">
        <div id="song-item-left">
          <button onClick={this.play} className="song-index-item-img"></button>
          <section className="song-info">
            <h1>{this.props.song.title}</h1>
            <section className="song-info-bottom">
              {artistName}
              <div className="middot">&middot;</div>
              {albumName}
            </section>
          </section>
        </div>
        <div id="song-item-right">
          <DropMenu song={this.props.song} playlist={this.props.playlist}/>
          <h2>{this.props.song.duration}</h2>
        </div>
      </li>
    )
  }
}


export default SongIndexItem;
