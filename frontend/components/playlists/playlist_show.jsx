import React from 'react';
import SongIndexContainer from '../songs/song_index_container';

class PlaylistShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPlaylist(this.props.match.params.playlistId);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.params.playlistId !== this.props.match.params.playlistId) {
      this.props.fetchPlaylist(this.props.match.params.playlistId);
    }
  }

  render () {
    const songIds = this.props.playlist.song_ids || {length: ""};
    const emptyDesc = songIds.length === 0 ? "It's a bit empty here..." : "";
    // debugger
    const belongsToCurrentUser = this.props.playlist.author_id === this.props.currentUserId;
    const openModal = belongsToCurrentUser ? this.props.openModal : null;
    // debugger
    return (
      <section className="playlist-show show">
        <header>
          <img className="show-img" src={this.props.playlist.photoUrl}/>
          <section className="show-info">
            <h1>{this.props.playlist.title}</h1>
            <h2>By {this.props.playlist.author}</h2>
            <h3>{songIds.length} Songs</h3>
            <button className="green-play">Play</button>
            {openModal}
          </section>
          <h1>{emptyDesc}</h1>
        </header>
        <SongIndexContainer playlist={this.props.playlist} songIds={this.props.playlist.song_ids}/>
      </section>
    )
  }
}

export default PlaylistShow;
