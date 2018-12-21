import { connect } from 'react-redux';
import { fetchPlaylists, searchPlaylists } from '../../actions/playlist_actions';
import { fetchSongs } from '../../actions/song_actions';
import PlaylistIndex from './playlist_index';
import { withRouter } from 'react-router'

const msp = (state, ownProps) => {

  let playlists;
  const currentUser = state.entities.users[state.session.id];
  let input;
  if (ownProps.match.path.slice(0,11) === "/collection") {
    const allSavedPlaylists = currentUser.saved_playlist_ids
      .concat(currentUser.playlist_ids);
    playlists = Object.values(state.entities.playlists)
      .filter(playlist => allSavedPlaylists.includes(playlist.id));

  } else if (ownProps.match.path.slice(0,13) === "/browse/users") {
    playlists = Object.values(state.entities.playlists)
      .filter(playlist => playlist.author_id == ownProps.match.params.userId)

  } else if (ownProps.match.path.slice(0,16) === "/browse/featured") {
    playlists = Object.values(state.entities.playlists)
      .filter(playlist => playlist.author_id !== currentUser.id).slice(0,14);

  } else if (ownProps.match.path.slice(0,7) === "/browse") {
    playlists = Object.values(state.entities.playlists)

  } else if (ownProps.match.path.slice(0,7) === "/search") {
    input = ownProps.location.pathname.split('/')[3];
    playlists = Object.values(state.entities.playlists)
      .filter(playlist => playlist.title.toLowerCase().includes(input.toLowerCase()));
  }

  const songs = Object.values(state.entities.songs);
  const albums = Object.values(state.entities.albums);

  return {
    playlists,
    currentUser,
    input,
    songs,
    albums
  }
}

const mdp = dispatch => {
  return {
    fetchPlaylists: (ids) => dispatch(fetchPlaylists(ids)),
    searchPlaylists: (input) => dispatch(searchPlaylists(input)),
    fetchSongs: (ids) => dispatch(fetchSongs(ids))
  }
}

export default withRouter(connect(msp, mdp)(PlaylistIndex));
