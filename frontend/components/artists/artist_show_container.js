import { connect } from 'react-redux';
import ArtistShow from './artist_show';
import { withRouter } from 'react-router';
import { fetchSongs } from '../../actions/song_actions';
import { fetchArtist } from '../../actions/artist_actions';
import { createSave, deleteSave } from '../../actions/save_actions';
import { fetchPlaySong, addQueue, clearQueue } from '../../actions/player_actions';


const msp = (state, ownProps) => {
  const artistId = ownProps.match.params.artistId;
  const artist = state.entities.artists[artistId] || {};
  const currentUser = state.entities.users[state.session.id];
  const savedIndicator = currentUser.saved_artist_ids.includes(parseInt(artistId));
  const songs = Object.values(state.entities.songs).filter(song => artist.song_ids.includes(song.id));
  return {
    artist,
    currentUser,
    savedIndicator,
    songs
  };
}

const mdp = dispatch => {
  return {
    fetchArtist: (id) => dispatch(fetchArtist(id)),
    createSave: (saveInfo) => dispatch(createSave(saveInfo)),
    deleteSave: (saveInfo) => dispatch(deleteSave(saveInfo)),
    fetchPlaySong: (id) => dispatch(fetchPlaySong(id)),
    addQueue: (queue, shuffledQueue) => dispatch(addQueue(queue, shuffledQueue)),
    fetchSongs: (ids) => dispatch(fetchSongs(ids)),
    clearQueue: () => dispatch(clearQueue())
  }
}

export default withRouter(connect(msp, mdp)(ArtistShow));
