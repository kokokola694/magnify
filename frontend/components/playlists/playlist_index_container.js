import { connect } from 'react-redux';
import { fetchPlaylists, searchPlaylists } from '../../actions/playlist_actions';
import PlaylistIndex from './playlist_index';
import { withRouter } from 'react-router'

const msp = (state, ownProps) => {

  let playlists;
  const currentUser = state.entities.users[state.session.id];
  let input;
  if (ownProps.match.path.slice(0,11) === "/collection") {
    const allSavedPlaylists = currentUser.saved_playlist_ids.concat(currentUser.playlist_ids);
    playlists = Object.values(state.entities.playlists).filter(playlist => allSavedPlaylists.includes(playlist.id));
  } else if (ownProps.match.path.slice(0,13) === "/browse/users") {
    
    playlists = Object.values(state.entities.playlists).filter(playlist => playlist.author_id == ownProps.match.params.userId)
  } else if (ownProps.match.path.slice(0,7) === "/browse") {
    playlists = Object.values(state.entities.playlists)
  } else if (ownProps.match.path.slice(0,7) === "/search") {
    input = ownProps.location.pathname.split('/')[3];
    playlists = Object.values(state.entities.playlists).filter(playlist => playlist.title.toLowerCase().includes(input.toLowerCase()));
  }
  return {
    playlists,
    currentUser,
    input
  }
}

const mdp = dispatch => {
  return {
    fetchPlaylists: (ids) => dispatch(fetchPlaylists(ids)),
    searchPlaylists: (input) => dispatch(searchPlaylists(input))
  }
}

export default withRouter(connect(msp, mdp)(PlaylistIndex));
