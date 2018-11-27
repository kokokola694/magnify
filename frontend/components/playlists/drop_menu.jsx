import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router';
import { deletePlaylistSong } from '../../actions/playlist_actions';
import { fetchSelectedSong } from '../../actions/song_actions';
import { createSave, deleteSave } from '../../actions/save_actions';


class DropMenu extends React.Component {
  constructor (props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSaveSong = this.handleSaveSong.bind(this);
    this.handleDisp = this.handleDisp.bind(this);
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

  handleSaveSong (saveInfo) {
    this.props.createSave(saveInfo);
  }

  handleUnsaveSong (saveInfo) {
    this.props.deleteSave(saveInfo);
  }

  handleDisp () {
    const dropmenu = document.getElementById(`dropmenu-${this.props.song.id}`);
    if (dropmenu.style.display === "none") {
      dropmenu.style.display = "block";
    } else {
      dropmenu.style.display = "none";
    }
  }

  render () {
    let removeButton;
    if (this.props.playlist && this.props.playlist.author_id === this.props.currentUser.id) {
      removeButton = (
        <li className="playlist-remfrom" onClick={() => this.handleRemove()}>
          <button className="playlist-remfrom-btn" >
            Remove From Playlist
          </button>
        </li>
      )
    } else {
        removeButton = null;
    }

    let saveButton;
    if (!this.props.currentUser.saved_song_ids.includes(this.props.song.id)) {
      saveButton = (
        <li onClick={() => this.handleSaveSong({
          savable_id: this.props.song.id,
          savable_type: "Song",
          saver_id: this.props.currentUser.id
        })}>
          <button className="save-library-button">
            Save to Your Library
          </button>
        </li>
      )
    } else {
      saveButton = (
        <li onClick={() => this.handleUnsaveSong({
          savable_id: this.props.song.id,
          savable_type: "Song",
          saver_id: this.props.currentUser.id
        })}>
          <button className="save-library-button">
            Remove From Your Library
          </button>
        </li>
      )
    }

    return (
      <div className="drop" onClick={() => this.handleDisp()} tabIndex="1" onBlur={() => this.handleDisp()}>
        <i  className="fa fa-bars"></i>
        <ul className="dropmenu" id={`dropmenu-${this.props.song.id}`} style={{display: "none"}}>
          <li className="playlist-addto" onClick={() => this.handleAdd()}>
            <button className="playlist-addto-btn" >
              Add To Playlist
            </button>
          </li>
          { removeButton }
          { saveButton }
        </ul>
      </div>
    )
  }

}

const msp = (state, ownProps) => {

  return {
    selectedSong: state.ui.selectedSong,
    currentUser: state.entities.users[state.session.id]
  }
}

const mdp = dispatch => {
  return {
    closeModal: () => closeModal(),
    openModal: (modal) => openModal(modal),
    deletePlaylistSong: (playlistSong) => dispatch(deletePlaylistSong(playlistSong)),
    fetchSelectedSong: (id) => dispatch(fetchSelectedSong(id)),
    createSave: (saveInfo) => dispatch(createSave(saveInfo)),
    deleteSave: (saveInfo) => dispatch(deleteSave(saveInfo))
  }
}

export default withRouter(connect(msp, mdp)(DropMenu));
