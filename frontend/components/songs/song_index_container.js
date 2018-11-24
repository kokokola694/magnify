import { connect } from 'react-redux';
import { fetchSongs, searchSongs } from '../../actions/song_actions';
import SongIndex from './song_index';
import { withRouter } from 'react-router';
import { fetchAlbum } from '../../actions/album_actions';
import { fetchPlaylist } from '../../actions/playlist_actions';
import { addQueue, fetchPlaySong } from '../../actions/player_actions';

const msp = (state, ownProps) => {
  let songs;
  const albumId = ownProps.match.params.albumId;
  const artistId = ownProps.match.params.artistId;
  const playlist = ownProps.playlist;
  let input = null;
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
  } else if (ownProps.match.path.slice(0,7) === "/search") {
    input = ownProps.location.pathname.split('/')[3];
    songs = Object.values(state.entities.songs).filter(song => song.title.toLowerCase().includes(input.toLowerCase()));
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
    playlist,
    input,
    albums: state.entities.albums,
    artists: state.entities.artists,
    queue: state.ui.queue
  }
}

const mdp = dispatch => {
  return {
    fetchSongs: (ids) => dispatch(fetchSongs(ids)),
    searchSongs: (input) => dispatch(searchSongs(input)),
    fetchAlbum: (id) => dispatch(fetchAlbum(id)),
    fetchPlaylist: (id) => dispatch(fetchPlaylist(id)),
    addQueue: (queue) => dispatch(addQueue(queue)),
    fetchPlaySong: (id) => dispatch(fetchPlaySong(id))
  }
}

export default withRouter(connect(msp, mdp)(SongIndex));
