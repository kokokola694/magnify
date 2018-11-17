import { connect } from 'react-redux';
import { fetchPlaylists } from '../../actions/playlist_actions';
import PlaylistIndex from './playlist_index';
import { withRouter } from 'react-router'

const msp = (state, ownProps) => {

  let playlists;
  const currentUser = state.entities.users[state.session.id];
  if (ownProps.match.path.slice(0,11) === "/collection") {
    const allSavedPlaylists = currentUser.saved_playlist_ids.concat(currentUser.playlist_ids);
    playlists = Object.values(state.entities.playlists).filter(playlist => allSavedPlaylists.includes(playlist.id));
  } else if (ownProps.match.path.slice(0,7) === "/browse") {
    playlists = Object.values(state.entities.playlists)
  }
  return {
    playlists,
    currentUser,
  }
}

const mdp = dispatch => {
  return {
    fetchPlaylists: (ids) => dispatch(fetchPlaylists(ids))
  }
}

export default withRouter(connect(msp, mdp)(PlaylistIndex));
