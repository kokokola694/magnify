import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchSongs } from '../../actions/song_actions';
import { fetchAlbum } from '../../actions/album_actions';
import { fetchArtist } from '../../actions/artist_actions';
import { fetchPlaylist } from '../../actions/playlist_actions';
import { addQueue, fetchPlaySong, pauseSong,
  resumeSong, clearQueue } from '../../actions/player_actions';
import SongIndex from './song_index';

const msp = (state, ownProps) => {
  let input;
  let songs = Object.values(state.entities.songs);
  let { albums, artists } = state.entities;

  const pathUrl = ownProps.match.path;
  const { albumId, artistId, url } = ownProps.match.params;
  const { playlist, queueSongs } = ownProps;

  const currentUser = state.entities.users[state.session.id];

  // Album, artist, or playlist show pages
  if (albumId) {
    songs = songs.filter(song => song.album_id == albumId);
  } else if (artistId) {
    songs = songs.filter(song => song.artist_id == artistId).slice(0,5);
  } else if (!!playlist) {
      const songIds = playlist.song_ids;
      songs = songIds.length === 0 ?
        [] : songs.filter(song => songIds.includes(song.id));

  // Library, search results, queue pages
  } else if (pathUrl.slice(0,11) === "/collection") {
    songs = songs.filter(song => currentUser.saved_song_ids.includes(song.id));
  } else if (pathUrl.slice(0,7) === "/search") {
    input = ownProps.location.pathname.split('/')[3];
    songs = songs.filter(song =>
      song.title.toLowerCase().includes(input.toLowerCase()));
  } else if (pathUrl.split('/')[1] === "queue") {
    songs = queueSongs;
  }

  const updatedSongs = songs.map(song => {
    const artistName = artists[song.artist_id].name;
    const albumName = albums[song.album_id].title;
    return Object.assign({}, song, { artistName }, { albumName });
  })

  const playSong = state.ui.player.playSong || { song: "" };
  const { queue, shuffledQueue, playing } = state.ui.player;

  return {
    songs: updatedSongs,
    currentUser,
    playlist,
    input,
    albums,
    artists,
    playing,
    queue,
    shuffledQueue,
    indexType: url,
    playSongId: playSong.song.id,
  }
}

const mdp = dispatch => {
  return {
    fetchSongs: (ids) => dispatch(fetchSongs(ids)),
    fetchAlbum: (id) => dispatch(fetchAlbum(id)),
    fetchArtist: (id) => dispatch(fetchArtist(id)),
    fetchPlaylist: (id) => dispatch(fetchPlaylist(id)),
    addQueue: (queue, shuffledQueue) => dispatch(addQueue(queue, shuffledQueue)),
    fetchPlaySong: (id) => dispatch(fetchPlaySong(id)),
    pauseSong: () => dispatch(pauseSong()),
    resumeSong: () => dispatch(resumeSong()),
    clearQueue: () => dispatch(clearQueue()),
  }
}

export default withRouter(connect(msp, mdp)(SongIndex));
