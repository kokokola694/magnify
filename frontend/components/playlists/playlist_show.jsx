import React from 'react';
import SongIndexContainer from '../songs/song_index_container';
import { Link } from 'react-router-dom';

class PlaylistShow extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
  }

  componentDidMount () {
    document.body.style.backgroundImage = "linear-gradient(rgb(117, 78, 112), black)";
  }

  play() {
    this.props.clearQueue();
    this.props.addQueue(this.props.songs, this.shuffle(this.props.songs))
    this.props.fetchPlaySong(this.props.songs[0].id);
  }

  shuffle (songs) {
    const shuffledSongs = songs.slice(1);
    let currentIdx = shuffledSongs.length - 1;
    let randIdx;

    while (currentIdx >= 0) {
      randIdx = Math.floor(Math.random() * currentIdx);
      [shuffledSongs[currentIdx], shuffledSongs[randIdx]] =
        [shuffledSongs[randIdx], shuffledSongs[currentIdx]];
      currentIdx -= 1;
    }

    shuffledSongs.unshift(songs[0]);
    return shuffledSongs;
  };

  render () {
    const songIds = this.props.playlist.song_ids || {length: ""};
    const belongsToCurrentUser = this.props.playlist.author_id === this.props.currentUser.id;
    const extraInfo = belongsToCurrentUser ? (
      <>
        <h2 className="find-more">Find more of the music you love</h2>
        <Link to='/browse/playlists'>Browse</Link>
      </>
  ) : null;

    const emptyDesc = songIds.length === 0 ? (
      <section className="empty-desc">
        <svg width="50" height="49" viewBox="0 0 80 79"
          xmlns="http://www.w3.org/2000/svg"><title>Album</title>
          <path d="M76.8 3.138v72.126H3.2V3.138h73.6zM80 0H0v78.398h80V0zM40
             20.8c-9.72 0-17.6 7.88-17.6 17.6C22.4 48.12 30.28 56 40 56c9.72
             0 17.6-7.88 17.6-17.6 0-9.72-7.88-17.6-17.6-17.6zm0 3.2c7.94
             0 14.4 6.46 14.4 14.4S47.94 52.8 40 52.8s-14.4-6.46-14.4-14.4S32.06
             24 40 24z" fill="currentColor" fillRule="evenodd"></path></svg>
        <p>It's a bit empty here...</p>
        {extraInfo}
      </section>
    ) : null;

    const saveButton = this.props.savedIndicator ? (
      <button className="show-save" onClick={() => this.props.deleteSave({
          savable_id: this.props.playlist.id,
          savable_type: "Playlist",
          saver_id: this.props.currentUser.id
        })}>
        Remove From Your Library</button>
    ) : (
      <button className="show-save" onClick={() => this.props.createSave({
          savable_id: this.props.playlist.id,
          savable_type: "Playlist",
          saver_id: this.props.currentUser.id
        })}>
        Save To Your Library</button>
    );

    const playlistSongs = this.props.playlist.song_ids || {length: ""};

    const playButton = playlistSongs.length === 0 ? null : (
      <button onClick={this.play} className="green-play">Play</button>
    );
    const plural = playlistSongs.length === 1 ? "Song" : "Songs";

    const openModal = belongsToCurrentUser ? this.props.openModal : saveButton;

    const photoUrl = playlistSongs.length === 0 ? (
      this.props.playlist.photoUrl
    ) : (
      this.props.firstPhoto
    );

    return (
      <section className="playlist-show show">
        <header>
          <img className="show-img temp" src={photoUrl}/>
          <section className="show-info">
            <div className="show-title-author">
              <h1>{this.props.playlist.title}</h1>
              <h2><Link to={`/browse/users/${this.props.playlist.author_id}`}>
                {this.props.playlist.author}
              </Link></h2>
            </div>
            <div className="show-play-length">
              {playButton}
              <h3>{songIds.length} {plural}</h3>
            </div>
            <div id="delete-dropdown">
              {openModal}
            </div>
          </section>
        </header>
        <main>
          {emptyDesc}
          <SongIndexContainer className="show-songs" playlist={this.props.playlist}
            songIds={this.props.playlist.song_ids}/>
        </main>
      </section>
    )
  }
}

export default PlaylistShow;
