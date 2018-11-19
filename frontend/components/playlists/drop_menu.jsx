import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router';
import { deletePlaylistSong } from '../../actions/playlist_actions';
import { fetchSelectedSong } from '../../actions/song_actions';

class DropMenu extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.fetchSelectedSong(this.props.song.id)
    .then(() => dispatch(this.props.openModal("addToPlaylist")));
  }

  render () {
    return (
      <div className="dropmenu">
        <div className="playlist-addto">
          <button className="playlist-addto-btn" onClick={() => this.handleClick()}>
            Add To Playlist
          </button>
        </div>
      </div>
    )
  }

}

const msp = (state, ownProps) => {
  return {
    // selectedSong = state.ui.selectedSong
  }
}

const mdp = dispatch => {
  return {
    closeModal: () => closeModal(),
    openModal: (modal) => openModal(modal),
    deletePlaylistSong: (id) => dispatch(deletePlaylistSong(id)),
    fetchSelectedSong: (id) => dispatch(fetchSelectedSong(id))
  }
}

export default withRouter(connect(msp, mdp)(DropMenu));
