import { connect } from 'react-redux';
import { fetchPlaylists } from '../../actions/playlist_actions';
import PlaylistIndex from './playlist_index';
import { withRouter } from 'react-router'

const msp = (state, ownProps) => {

  return {
    playlists: Object.values(state.entities.playlists),
    currentUserId: state.session.id,
    indexType: ownProps.match.params.url
  }
}

const mdp = dispatch => {
  return {
    fetchPlaylists: () => dispatch(fetchPlaylists())
  }
}

export default withRouter(connect(msp, mdp)(PlaylistIndex));
