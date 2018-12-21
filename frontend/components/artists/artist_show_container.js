import { connect } from 'react-redux';
import ArtistShow from './artist_show';
import { withRouter } from 'react-router';
import { fetchSongs } from '../../actions/song_actions';
import { fetchArtist } from '../../actions/artist_actions';
import { createSave, deleteSave } from '../../actions/save_actions';
import { fetchPlaySong, addQueue, clearQueue } from '../../actions/player_actions';


const msp = (state, ownProps) => {
  const { artists, users, songs } = state.entities;

  const artistId = ownProps.match.params.artistId;
  const artist = artists[artistId] || {song_ids: []};
  const currentUser = users[state.session.id];
  const savedIndicator = currentUser.saved_artist_ids.includes(parseInt(artistId));
  const updatedSongs = Object.values(songs)
    .filter(song => artist.song_ids.includes(song.id));
    
  return {
    artist,
    currentUser,
    savedIndicator,
    songs: updatedSongs
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
