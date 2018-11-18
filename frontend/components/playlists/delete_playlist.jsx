import { connect } from 'react-redux';
import React from 'react';
import { deletePlaylist } from '../../actions/playlist_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

class DeletePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit () {
    this.props.deletePlaylist(this.props.playlistId).then( () => {
      this.props.closeModal();
      this.props.history.push(`/collection/playlists`);
    });
  }

  render () {
    if (!this.props.modal) {
      return null;
    }
    return (

      <>
        <button onClick={() => this.props.closeModal()} className="exit-modal">X</button>
        <h1>Do you really want to delete this playlist?t</h1>
        <button onClick={() => this.props.closeModal()}>Cancel</button>
        <button onClick={this.handleSubmit} >Delete</button>
      </>
    )
  }
}

const msp = (state, ownProps) => {
  const pathArray = ownProps.location.pathname.split("/");
  const playlistId = pathArray[pathArray.length - 1];
  
  return {
    modal: state.ui.modal,
    playlistId
  }
}

const mdp = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    deletePlaylist: id => dispatch(deletePlaylist(id))
  }
}

export default withRouter(connect(msp, mdp)(DeletePlaylist));
