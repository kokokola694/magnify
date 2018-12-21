import PlaylistIndex from './playlist_index';
import { connect } from 'react-redux';
import { fetchPlaylists } from '../../actions/playlist_actions';
import { fetchSongs } from '../../actions/song_actions';
import { withRouter } from 'react-router'

const msp = (state, ownProps) => {

  let playlists = Object.values(state.entities.playlists);
  let input;
  const currentUser = state.entities.users[state.session.id];
  const pathName = ownProps.match.path;

  if (pathName.slice(0,11) === "/collection") {
    const allSavedPlaylists = currentUser.saved_playlist_ids
      .concat(currentUser.playlist_ids);
    playlists = playlists.filter(playlist => allSavedPlaylists
      .includes(playlist.id));

  } else if (pathName.slice(0,13) === "/browse/users") {
    playlists = playlists.filter(playlist =>
      playlist.author_id == ownProps.match.params.userId)

  } else if (pathName.slice(0,16) === "/browse/featured") {
    playlists = playlists.filter(playlist =>
      playlist.author_id !== currentUser.id).slice(0,14);

  } else if (pathName.slice(0,7) === "/search") {
    input = ownProps.location.pathname.split('/')[3];
    playlists = playlists.filter(playlist => playlist.title.toLowerCase()
      .includes(input.toLowerCase()));
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
    fetchSongs: (ids) => dispatch(fetchSongs(ids))
  }
}

export default withRouter(connect(msp, mdp)(PlaylistIndex));
