import { connect } from 'react-redux';
import { fetchArtists } from '../../actions/artist_actions';
import ArtistIndex from './artist_index';
import { withRouter } from 'react-router'

const msp = (state, ownProps) => {
  return {
    artists: Object.values(state.entities.artists),
    currentUserId: state.session.id,
    indexType: ownProps.match.params.url
  }
}

const mdp = dispatch => {
  return {
    fetchArtists: () => dispatch(fetchArtists())
  }
}

export default withRouter(connect(msp, mdp)(ArtistIndex));
