import { connect } from 'react-redux';
import React from 'react';
import { addPlaylistSong, fetchPlaylists } from '../../actions/playlist_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import AddToPlaylistItem from './add_to_playlist_item';

class AddToPlaylist extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchPlaylists(this.props.currentUser.playlist_ids);
  }

  render () {
    if (!this.props.modal) {
      return null;
    }

    const playlists = this.props.playlists.map(pl => (
      <AddToPlaylistItem key={pl.id} playlist={pl} selectedSong={this.props.selectedSong}
        addToPlaylist={this.props.addToPlaylist} closeModal={this.props.closeModal}/>));
    return (

      <section className="create-playlist">
        <button id="exit-modal" onClick={() => this.props.closeModal()}> X </button>
        <h1>Add to playlist</h1>
        <ul id="addto-playlist"className="index-list">
          {playlists}
        </ul>
      </section>
    )
  }
}

const msp = state => {
  const currentUser = state.entities.users[state.session.id];
  const allPlaylists = Object.values(state.entities.playlists);
  return {
    modal: state.ui.modal,
    playlists: allPlaylists.filter(playlist => currentUser.playlist_ids.includes(playlist.id)),
    currentUser,
    selectedSong: state.ui.selectedSong

  }
}

const mdp = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    addToPlaylist: playlistSong => dispatch(addPlaylistSong(playlistSong)),
    fetchPlaylists: (ids) => dispatch(fetchPlaylists(ids))
  }
}

export default withRouter(connect(msp, mdp)(AddToPlaylist));
