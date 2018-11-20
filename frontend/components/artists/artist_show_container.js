import { connect } from 'react-redux';
import ArtistShow from './artist_show';
import { withRouter } from 'react-router';
import { fetchArtist } from '../../actions/artist_actions';
import { createSave, deleteSave } from '../../actions/save_actions';


const msp = (state, ownProps) => {
  const artistId = ownProps.match.params.artistId;
  const artist = state.entities.artists[artistId] || {};
  const currentUser = state.entities.users[state.session.id];
  const savedIndicator = currentUser.saved_artist_ids.includes(parseInt(artistId));
  return {
    artist,
    currentUser,
    savedIndicator
  };
}

const mdp = dispatch => {
  return {
    fetchArtist: (id) => dispatch(fetchArtist(id)),
    createSave: (saveInfo) => dispatch(createSave(saveInfo)),
    deleteSave: (saveInfo) => dispatch(deleteSave(saveInfo))
  }
}

export default withRouter(connect(msp, mdp)(ArtistShow));
