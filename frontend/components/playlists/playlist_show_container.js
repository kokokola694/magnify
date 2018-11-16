import { connect } from 'react-redux';
import PlaylistShow from './playlist_show';
import { withRouter } from 'react-router-dom';
import { fetchPlaylist } from '../../actions/playlist_actions';

const msp = (state, ownProps) => {
  const playlistId = ownProps.match.params.playlistId;
  const playlist = state.entities.playlists[playlistId] || {};
  return { playlist }
}

const mdp = dispatch => {
  return {
    fetchPlaylist: (playlistId) => dispatch(fetchPlaylist(playlistId))
  }
}

export default withRouter(connect(msp, mdp)(PlaylistShow));
