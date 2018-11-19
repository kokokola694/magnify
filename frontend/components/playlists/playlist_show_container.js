import { connect } from 'react-redux';
import PlaylistShow from './playlist_show';
import { withRouter } from 'react-router-dom';
import { fetchPlaylist } from '../../actions/playlist_actions';
import React from 'react';
import { openModal, closeModal } from '../../actions/modal_actions';


const msp = (state, ownProps) => {
  const playlistId = ownProps.match.params.playlistId;
  const playlist = state.entities.playlists[playlistId] || {};
  const currentUserId = state.session.id;
  return { playlist, currentUserId }
}

const mdp = dispatch => {
  return {
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
