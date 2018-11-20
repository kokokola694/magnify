import { connect } from 'react-redux';
import { fetchSongs } from '../../actions/song_actions';
import SongIndex from './song_index';
import { withRouter } from 'react-router'
import { fetchAlbum } from '../../actions/album_actions';

const msp = (state, ownProps) => {
  let songs;
  const albumId = ownProps.match.params.albumId;
  const artistId = ownProps.match.params.artistId;
  const playlist = ownProps.playlist;
  if (albumId) {
    songs = Object.values(state.entities.songs).filter(song => song.album_id == albumId);
  } else if (artistId) {
    songs = Object.values(state.entities.songs).filter(song => song.artist_id == artistId);
  } else if (!!playlist) {
      const songIds = ownProps.playlist.song_ids || { length: 0 }
      if (songIds.length === 0) {
        songs = [];
      } else {
        songs = Object.values(state.entities.songs).filter(song => songIds.includes(song.id));
      }
  } else if (ownProps.match.path.slice(0,11) === "/collection") {
    const currentUser = state.entities.users[state.session.id];
    songs = Object.values(state.entities.songs).filter(song => currentUser.saved_song_ids.includes(song.id));
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
    playlist
  }
}

const mdp = dispatch => {
  return {
    fetchSongs: (ids) => dispatch(fetchSongs(ids)),
    fetchAlbum: (id) => dispatch(fetchAlbum(id))
  }
}

export default withRouter(connect(msp, mdp)(SongIndex));
