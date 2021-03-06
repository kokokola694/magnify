import { connect } from 'react-redux';
import AlbumShow from './album_show';
import { withRouter } from 'react-router-dom';
import { fetchSong, fetchSongs } from '../../actions/song_actions';
import { fetchAlbum } from '../../actions/album_actions';
import { createSave, deleteSave } from '../../actions/save_actions';
import { fetchPlaySong, addQueue, clearQueue } from '../../actions/player_actions';

const msp = (state, ownProps) => {
  const albumId = ownProps.match.params.albumId;
  const { albums, songs, users, artists } = state.entities;

  const album = albums[albumId] || { song_ids: [] };
  const updatedAlbum = Object.assign({}, album,
    { artist: artists[album.artist_id] });

  const currentUser = users[state.session.id];
  const savedIndicator = currentUser.saved_album_ids.includes(parseInt(albumId));
  const updatedSongs = Object.values(songs)
    .filter(song => album.song_ids.includes(song.id));

  return {
    album: updatedAlbum,
    songs: updatedSongs,
    currentUser,
    savedIndicator,
  }
}

const mdp = dispatch => {
  return {
    fetchAlbum: (albumId) => dispatch(fetchAlbum(albumId)),
    createSave: (saveInfo) => dispatch(createSave(saveInfo)),
    deleteSave: (saveInfo) => dispatch(deleteSave(saveInfo)),
    fetchPlaySong: (id) => dispatch(fetchPlaySong(id)),
    addQueue: (queue, shuffledQueue) => dispatch(addQueue(queue, shuffledQueue)),
    fetchSongs: (ids) => dispatch(fetchSongs(ids)),
    clearQueue: () => dispatch(clearQueue()),
  }
}

export default withRouter(connect(msp, mdp)(AlbumShow));
