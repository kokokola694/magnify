import { connect } from 'react-redux';
import React from 'react';
import { createPlaylist } from '../../actions/playlist_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

class CreatePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.updateTitle = this.updateTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateTitle (e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit () {
    this.props.createPlaylist(this.state).then( playlist => {
      this.props.closeModal();
      this.props.history.push(`/collection/playlists/${playlist.playlist.id}`);
    });
  }

  render () {
    if (!this.props.modal) {
      return null;
    }
    return (

      <>
        <button onClick={() => this.props.closeModal()} className="exit-modal">X</button>
        <h1>Create new playlist</h1>
        <div className="modal-label">Playlist Name</div>
        <input className="modal-title" onChange={this.updateTitle} type="text" placeholder="Start typing..." value={this.state.title} />
        <button onClick={() => this.props.closeModal()}>Cancel</button>
        <button onClick={this.handleSubmit} >Create</button>
      </>
    )
  }
}

const msp = state => {
  return {
    modal: state.ui.modal
  }
}

const mdp = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    createPlaylist: playlist => dispatch(createPlaylist(playlist))
  }
}

export default withRouter(connect(msp, mdp)(CreatePlaylist));
