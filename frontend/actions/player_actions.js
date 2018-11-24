export const ADD_QUEUE = "ADD_QUEUE";
export const PLAY_SONG = "PLAY_SONG";
import * as SongApi from '../util/song_api_util';

export const playSong = song => {
  return {
    type: PLAY_SONG,
    song
  }
}

export const addQueue = (queue) => {
  return {
    type: ADD_QUEUE,
    queue
  }
}

export const fetchPlaySong = id => dispatch => {
  return SongApi.fetchSong(id).then((song) => dispatch(playSong(song)));
}
