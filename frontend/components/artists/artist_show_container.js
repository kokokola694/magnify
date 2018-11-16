import { connect } from 'react-redux';
import ArtistShow from './artist_show';
import { withRouter } from 'react-router';
import { fetchArtist } from '../../actions/artist_actions';

const msp = (state, ownProps) => {
  const artistId = ownProps.match.params.artistId;
  const artist = state.entities.artists[artistId] || {};
  return { artist };
}

const mdp = dispatch => {
  return {
    fetchArtist: (id) => dispatch(fetchArtist(id))
  }
}

export default withRouter(connect(msp, mdp)(ArtistShow));
