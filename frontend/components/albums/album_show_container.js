import { connect } from 'react-redux';
import AlbumShow from './album_show';
import { withRouter } from 'react-router-dom';
import { fetchSong, fetchSongs } from '../../actions/song_actions';
import { fetchAlbum } from '../../actions/album_actions';
import { createSave, deleteSave } from '../../actions/save_actions';
import { fetchPlaySong, addQueue } from '../../actions/player_actions';

const msp = (state, ownProps) => {
  const albumId = ownProps.match.params.albumId;
  const album = state.entities.albums[albumId] || {};
  const updatedAlbum = Object.assign({}, album, {artist: state.entities.artists[album.artist_id]});
  const currentUser = state.entities.users[state.session.id];
  const savedIndicator = currentUser.saved_album_ids.includes(parseInt(albumId));
  return {
    album: updatedAlbum,
    currentUser,
    savedIndicator
  }
}

const mdp = dispatch => {
  return {
    fetchAlbum: (albumId) => dispatch(fetchAlbum(albumId)),
    createSave: (saveInfo) => dispatch(createSave(saveInfo)),
    deleteSave: (saveInfo) => dispatch(deleteSave(saveInfo)),
    fetchPlaySong: (id) => dispatch(fetchPlaySong(id)),
    addQueue: (queue) => dispatch(addQueue(queue)),
    fetchSongs: (ids) => dispatch(fetchSongs(ids))
  }
}

export default withRouter(connect(msp, mdp)(AlbumShow));
