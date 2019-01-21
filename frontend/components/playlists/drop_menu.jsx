import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router';
import { deletePlaylistSong } from '../../actions/playlist_actions';
import { addNext } from '../../actions/player_actions';
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
    this.props.openModal("addToPlaylist");
  }

  handleRemove () {
    this.props.deletePlaylistSong({
      song_id: this.props.selectedSong.id,
      playlist_id: this.props.match.params.playlistId
    });
  }

  handleSaveSong (saveInfo) {
    this.props.createSave(saveInfo);
  }

  handleUnsaveSong (saveInfo) {
    this.props.deleteSave(saveInfo);
  }

  handleAddNext() {
    this.props.addNext(this.props.selectedSong);
  }

  handleDisp () {
    this.props.fetchSelectedSong(this.props.song.id);
    const dropmenu = document.getElementById(`dropmenu-${this.props.song.id}`);
    dropmenu.classList.toggle("disp");
    const dropmenus = document.getElementsByClassName("dropmenu");
    for (let i = 0; i < dropmenus.length; i++) {
      if (dropmenus[i].classList.contains('disp') &&
        dropmenus[i].id !== `dropmenu-${this.props.song.id}`) {
        dropmenus[i].classList.remove('disp');
      }
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
        <li onClick={() => {
            this.handleSaveSong({
              savable_id: this.props.song.id,
              savable_type: "Song",
              saver_id: this.props.currentUser.id
            });
          }
        }>
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

    window.onclick = (e) => {
      if (!e.target.matches('.drop-btn')) {
        const dropmenus = document.getElementsByClassName("dropmenu");
        for (let i = 0; i < dropmenus.length; i++) {
          if (dropmenus[i].classList.contains('disp')) {
            dropmenus[i].classList.remove('disp');
          }
        }
      }
    }

    return (
      <div className="drop">
        <button onClick={this.handleDisp} className="drop-btn">•••</button>
          <ul className="dropmenu" id={`dropmenu-${this.props.song.id}`}>
            <div className="dropmenu-songinfo">
              <img src={this.props.album.photoUrl} />
              <h1>{this.props.song.title}</h1>
              <h2 id="mobile-drop-artist">{this.props.artist.name}</h2>
            </div>
            <li className="playlist-addto" onClick={() => this.handleAdd()}>
              <button className="playlist-addto-btn" >
                Add To Playlist
              </button>
            </li>
            <li className="playlist-addto" onClick={() => this.handleAddNext()}>
              <button className="playlist-addto-btn" >
                Add To Queue
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
    currentUser: state.entities.users[state.session.id],
    album: state.entities.albums[ownProps.song.album_id],
    artist: state.entities.artists[ownProps.song.artist_id]
  }
}

const mdp = dispatch => {
  return {
    closeModal: () => closeModal(),
    openModal: (modal) => dispatch(openModal(modal)),
    deletePlaylistSong: (playlistSong) => dispatch(deletePlaylistSong(playlistSong)),
    fetchSelectedSong: (id) => dispatch(fetchSelectedSong(id)),
    createSave: (saveInfo) => dispatch(createSave(saveInfo)),
    deleteSave: (saveInfo) => dispatch(deleteSave(saveInfo)),
    addNext: (song) => dispatch(addNext(song)),
  }
}

export default withRouter(connect(msp, mdp)(DropMenu));
