import { connect } from 'react-redux';
import PlaylistShow from './playlist_show';
import { withRouter } from 'react-router-dom';
import { fetchPlaylist } from '../../actions/playlist_actions';
import React from 'react';
import { openModal, closeModal } from '../../actions/modal_actions';
import { createSave, deleteSave } from '../../actions/save_actions';


const msp = (state, ownProps) => {
  const playlistId = ownProps.match.params.playlistId;
  const playlist = state.entities.playlists[playlistId] || {};
  const currentUserId = state.session.id;
  const currentUser = state.entities.users[currentUserId]
  const savedIndicator = currentUser.saved_playlist_ids.includes(parseInt(playlistId));

  return { playlist, currentUserId, currentUser, savedIndicator }
}

const mdp = dispatch => {
  return {
    createSave: (saveInfo) => dispatch(createSave(saveInfo)),
    deleteSave: (saveInfo) => dispatch(deleteSave(saveInfo)),
    closeModal: () => dispatch(closeModal()),
    openModal: (
      <div className="playlist-delete">
        <button className="playlist-delete-btn" onClick={() => dispatch(openModal("deletePlaylist"))}>
          Delete
        </button>
      </div>
    ),
    fetchPlaylist: (playlistId) => dispatch(fetchPlaylist(playlistId))
  }
}

export default withRouter(connect(msp, mdp)(PlaylistShow));
