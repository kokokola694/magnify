import { connect } from 'react-redux';
import { fetchArtists, searchArtists } from '../../actions/artist_actions';
import ArtistIndex from './artist_index';
import { withRouter } from 'react-router'

const msp = (state, ownProps) => {
  let artists;
  let input;
  const currentUser = state.entities.users[state.session.id];
  if (ownProps.match.path.slice(0,11) === "/collection") {
    artists = Object.values(state.entities.artists).filter(artist => currentUser.saved_artist_ids.includes(artist.id));
  } else if (ownProps.match.path.slice(0,7) === "/browse") {
    artists = Object.values(state.entities.artists)
  } else if (ownProps.match.path.slice(0,7) === "/search") {
    input = ownProps.location.pathname.split('/')[3];
    artists = Object.values(state.entities.artists).filter(artist => artist.name.toLowerCase().includes(input.toLowerCase()));
  }
  return {
    artists,
    currentUser,
    input
  }
}

const mdp = dispatch => {
  return {
    fetchArtists: (ids) => dispatch(fetchArtists(ids)),
    searchArtists: input => dispatch(searchArtists(input))
  }
}

export default withRouter(connect(msp, mdp)(ArtistIndex));
