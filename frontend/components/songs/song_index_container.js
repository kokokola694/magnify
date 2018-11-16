import { connect } from 'react-redux';
import { fetchSongs } from '../../actions/song_actions';
import SongIndex from './song_index';
import { withRouter } from 'react-router'
import { fetchAlbum } from '../../actions/album_actions';

const msp = (state, ownProps) => {
  let songs
  const albumId = ownProps.match.params.albumId;
  const artistId = ownProps.match.params.artistId
  if (albumId) {
    songs = Object.values(state.entities.songs).filter(song => song.album_id == albumId);
  } else if (artistId) {
    songs = Object.values(state.entities.songs).filter(song => song.artist_id == artistId);
  } else {
    songs = Object.values(state.entities.songs);
  }
  const updatedSongs = songs.map(song => {
    const artistName = state.entities.artists[song.artist_id].name;
    const albumName = state.entities.albums[song.album_id].title;
    return Object.assign({}, song, {artistName}, {albumName});
  })

  return {
    songs: updatedSongs,
    currentUserId: state.session.id,
    indexType: ownProps.match.params.url,
  }
}

const mdp = dispatch => {
  return {
    fetchSongs: (ids) => dispatch(fetchSongs(ids)),
    fetchAlbum: (id) => dispatch(fetchAlbum(id))
  }
}

export default withRouter(connect(msp, mdp)(SongIndex));
