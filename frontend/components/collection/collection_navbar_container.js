import { connect } from 'react-redux';
import BrowseNavbar from '../browse/browse_navbar';
import { withRouter } from 'react-router-dom';
import { openModal, closeModal } from '../../actions/modal_actions';
import React from 'react';

const msp = (state, ownProps) => {
  const path = ownProps.location.pathname;
  const noNavBar = path.split('/').length === 4;
  return {
    navType: "collection",
    noNavBar
  }
}

const mdp = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    openModal: (
      <div className="playlist-create">
        <button className="playlist-create-btn"
          onClick={() => dispatch(openModal("createPlaylist"))}>
            New Playlist
        </button>
      </div>
    )
  }
}

export default withRouter(connect(msp, mdp)(BrowseNavbar));
