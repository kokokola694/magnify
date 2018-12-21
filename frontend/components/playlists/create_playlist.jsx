import { connect } from 'react-redux';
import React from 'react';
import { createPlaylist, addPlaylistSong } from '../../actions/playlist_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchUser } from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';

class CreatePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', submitted: false };
    this.updateTitle = this.updateTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateTitle (e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit () {
    this.setState({submitted: true});
    if (this.props.nested === "false") {
      this.props.createPlaylist({title: this.state.title}).then( playlist => {
        this.props.closeModal();
        this.props.history.push(`/collection/playlists/${playlist.playlist.id}`);
      });
    } else {
      this.props.createPlaylist({title: this.state.title})
        .then(action => { this.props.addPlaylistSong({
          song_id: this.props.selectedSong.id,
          playlist_id: action.playlist.id
        })
        .then( playlistSong => {
        this.props.closeModal();
        this.props.history.push(`/collection/playlists/${playlistSong.playlistId}`);
        this.props.fetchUser(this.props.currentUser.id);
        })
      })
    }
  }

  render () {
    if (!this.props.modal) {
      return null;
    }
    const closeM = (this.props.nested === "true") ? (
      () => this.props.openModal()
    ) : (
      () => this.props.closeModal()
    );

    const submitButton = this.state.submitted ? (
      <button className="playlist-create-btn" >Create</button>
    ) : (
      <button className="playlist-create-btn" onClick={this.handleSubmit} >Create</button>
    )

    return (

      <section className="create-playlist">
        <button id="exit-modal" onClick={closeM} className="exit-modal">X</button>
        <h1>Create new playlist</h1>
        <label className="modal-label">
          <h2>Playlist Name</h2>
          <input className="modal-title" onChange={this.updateTitle} type="text" placeholder="Start typing..." value={this.state.title} />
        </label>
        <section className="modal-buttons">
          <button className="artist-save" onClick={closeM}>Cancel</button>
          {submitButton}
        </section>
      </section>
    )
  }
}

const msp = state => {
  return {
    modal: state.ui.modal,
    selectedSong: state.ui.selectedSong,
    currentUser: state.entities.users[state.session.id]
  }
}

const mdp = dispatch => {
  return {
    openModal: () => dispatch(openModal("addToPlaylist")),
    closeModal: () => dispatch(closeModal()),
    fetchUser: (id) => dispatch(fetchUser(id)),
    createPlaylist: playlist => dispatch(createPlaylist(playlist)),
    addPlaylistSong: playlistSong => dispatch(addPlaylistSong(playlistSong))
  }
}

export default withRouter(connect(msp, mdp)(CreatePlaylist));
