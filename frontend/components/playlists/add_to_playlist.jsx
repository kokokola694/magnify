import React from 'react';
import { connect } from 'react-redux';
import { addPlaylistSong, fetchPlaylists } from '../../actions/playlist_actions';
import { fetchSongs } from '../../actions/song_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import AddToPlaylistItem from './add_to_playlist_item';

class AddToPlaylist extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchPlaylists(this.props.currentUser.playlist_ids)
      .then(() => this.props.fetchSongs());
  }

  render () {
    if (!this.props.modal) return null;
    const songs = this.props.songs;
    const albums = this.props.albums;

    const playlists = this.props.playlists.map(pl => {
      const firstSong = songs.find(song => song.id == pl.song_ids[0]);
      const photo = pl.photoUrl;

      return (
        <AddToPlaylistItem
          key={pl.id} playlist={pl} selectedSong={this.props.selectedSong}
          addToPlaylist={this.props.addToPlaylist}
          closeModal={this.props.closeModal} photoUrl={photo}
        />
      )
    });


    return (

      <section className="create-playlist">
        <button id="exit-modal" onClick={() => this.props.closeModal()}> X </button>
        <div id="add-playlist-modal-header">
          <h1>Add to playlist</h1>
          {this.props.openModal}
        </div>
        <ul id="addto-playlist"className="index-list">
          {playlists}
        </ul>
      </section>
    )
  }
}

const msp = state => {
  const currentUser = state.entities.users[state.session.id];
  const allPlaylists = Object.values(state.entities.playlists);
  const playlists = allPlaylists.filter(playlist => currentUser.playlist_ids
    .includes(playlist.id));

  const songs = Object.values(state.entities.songs);
  const albums = Object.values(state.entities.albums);

  return {
    modal: state.ui.modal,
    selectedSong: state.ui.selectedSong,
    playlists,
    currentUser,
    songs,
    albums,
  }
}

const mdp = dispatch => {
  return {
    addToPlaylist: playlistSong => dispatch(addPlaylistSong(playlistSong)),
    fetchPlaylists: (ids) => dispatch(fetchPlaylists(ids)),
    fetchSongs: (ids) => dispatch(fetchSongs(ids)),
    closeModal: () => dispatch(closeModal()),
    openModal: (
      <div className="playlist-create">
        <button className="playlist-create-btn" onClick={() => dispatch(openModal("addThenCreate"))}>
          New Playlist
        </button>
      </div>
    ),
  }
}

export default withRouter(connect(msp, mdp)(AddToPlaylist));
