export const RECEIVE_SONGS = "RECEIVE_SONGS";
export const RECEIVE_SONG = "RECEIVE_SONG"
import * as SongApi from '../util/song_api_util';

export const fetchSongs = (ids) => dispatch => {
  return SongApi.fetchSongs(ids)
  .then(songs => dispatch(receiveSongs(songs)))
}

export const fetchSong = (id) => dispatch => {
  return SongApi.fetchSong(id)
  .then(song => dispatch(receiveSong(song)))
}


const receiveSongs = ({songs, artists, albums}) => {
  return {
    type: RECEIVE_SONGS,
    songs,
    artists,
    albums
  }
}

const receiveSong = ({song, artist, album}) => {
  return {
    type: RECEIVE_SONG,
    song,
    artist,
    album
  }
}
