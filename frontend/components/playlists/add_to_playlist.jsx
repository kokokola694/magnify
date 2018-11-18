import { connect } from 'react-redux';
import React from 'react';
import { addPlaylistSong, fetchPlaylists } from '../../actions/playlist_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import PlaylistIndexItem from './playlist_index_item';

class AddToPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.props.fetchPlaylists(this.props.currentUser.playlist_ids);
  }

  handleSubmit (e) {
    this.props.addToPlaylist({}).then( () => {
      this.props.closeModal();
    });
  }

  render () {
    if (!this.props.modal) {
      return null;
    }

    const playlists = this.props.playlists.map(pl => <PlaylistIndexItem key={pl.id} playlist={pl}/>);
    return (

      <>
        <h1 onClick={() => this.props.closeModal()}> HELLO </h1>
        <ul className="index-list">
          {playlists}
        </ul>
      </>
    )
  }
}

const msp = state => {
  const currentUser = state.entities.users[state.session.id];
  const allPlaylists = Object.values(state.entities.playlists);
  return {
    modal: state.ui.modal,
    playlists: allPlaylists.filter(playlist => currentUser.playlist_ids.includes(playlist.id)),
    currentUser

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
