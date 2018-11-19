import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router';
import { deletePlaylistSong } from '../../actions/playlist_actions';
import { fetchSelectedSong } from '../../actions/song_actions';

class DropMenu extends React.Component {
  constructor (props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd () {
    this.props.fetchSelectedSong(this.props.song.id)
    .then(() => dispatch(this.props.openModal("addToPlaylist")));
  }

  handleRemove () {
    this.props.fetchSelectedSong(this.props.song.id)
    .then((song) => this.props.deletePlaylistSong(
      {song_id: this.props.selectedSong.id, playlist_id: this.props.match.params.playlistId}));
  }

  render () {
    return (
      <div className="dropmenu">
        <div className="playlist-addto">
          <button className="playlist-addto-btn" onClick={() => this.handleAdd()}>
            Add To Playlist
          </button>
        </div>
        <div className="playlist-remfrom">
          <button className="playlist-remfrom-btn" onClick={() => this.handleRemove()}>
            Remove From Playlist
          </button>
        </div>
      </div>
    )
  }

}

const msp = (state, ownProps) => {

  return {
    selectedSong: state.ui.selectedSong
  }
}

const mdp = dispatch => {
  return {
    closeModal: () => closeModal(),
    openModal: (modal) => openModal(modal),
    deletePlaylistSong: (playlistSong) => dispatch(deletePlaylistSong(playlistSong)),
    fetchSelectedSong: (id) => dispatch(fetchSelectedSong(id))
  }
}

export default withRouter(connect(msp, mdp)(DropMenu));
