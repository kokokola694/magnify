import ArtistIndex from './artist_index';
import { connect } from 'react-redux';
import { fetchArtists } from '../../actions/artist_actions';
import { withRouter } from 'react-router'

const msp = (state, ownProps) => {
  const pathUrl = ownProps.match.path;
  const currentUser = state.entities.users[state.session.id];
  let artists = Object.values(state.entities.artists);
  let input;

  if (pathUrl.slice(0,11) === "/collection") {
    artists = artists.filter(artist =>
      currentUser.saved_artist_ids.includes(artist.id));
  } else if (pathUrl.slice(0,16) === "/browse/featured") {
    artists = artists.slice(6,16);
  } else if (pathUrl.slice(0,7) === "/browse") {
    artists = artists
  } else if (pathUrl.slice(0,7) === "/search") {
    input = ownProps.location.pathname.split('/')[3];
    artists = artists.filter(artist =>
      artist.name.toLowerCase().includes(input.toLowerCase()));
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
  }
}

export default withRouter(connect(msp, mdp)(ArtistIndex));
