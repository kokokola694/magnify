import React from 'react';
import SongIndexItem from './song_index_item';
import { openModal, closeModal } from '../../actions/modal_actions';


class SongIndex extends React.Component {
  constructor(props) {
    super(props);
    this.addQueue = this.addQueue.bind(this);
  }

  componentDidMount() {
    if (this.props.songIds) {
      this.props.fetchSongs(this.props.songIds);
    // } else if (this.props.match.params.playlistId) {
    //   this.props.fetchPlaylist(this.props.match.params.playlistId)
    //   .then(playlist => this.props.fetchSongs(playlist.song_ids))
    // } else if (this.props.match.path.slice(0,7) === "/search") {
    //   this.props.searchSongs(this.props.input);
    } else {
      this.props.fetchSongs();
    }
  }

  addQueue (song) {
    const songForQueue = [{
      title: song.title,
      audio: song.audioUrl,
      image: this.props.albums[song.album_id].photoUrl,
      artist: this.props.artists[song.artist_id].name
    }];
    this.props.receiveQueue(songForQueue);
  }

  render() {
    const songlist =
      this.props.songs.map(s => <SongIndexItem key={s.id}
        song={s} playlist={this.props.playlist}
        openModal={openModal} queue={this.props.songs} addQueue={this.props.addQueue}
        fetchPlaySong={this.props.fetchPlaySong} />)
    return (
      <section>
        <ul className="song-index-list">
          {songlist}
        </ul>
      </section>

    )
  }
}


export default SongIndex;
