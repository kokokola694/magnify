export const ADD_QUEUE = "ADD_QUEUE";
export const PLAY_SONG = "PLAY_SONG";
export const PAUSE_SONG = "PAUSE_SONG";
export const RESUME_SONG = "RESUME_SONG";
export const CLEAR_QUEUE = "CLEAR_QUEUE";
export const DELETE_QUEUE = "DELETE_QUEUE";
export const SHUFFLE = "SHUFFLE";
import * as SongApi from '../util/song_api_util';

export const playSong = song => {
  return {
    type: PLAY_SONG,
    song
  }
}

export const shuffle = () => {
  return {
    type: SHUFFLE
  }
}

export const resumeSong = () => {
  return {
    type: RESUME_SONG
  }
}

export const clearQueue = () => {
  return {
    type: CLEAR_QUEUE
  }
}

export const deleteQueue = () => {
  return {
    type: DELETE_QUEUE
  }
}

export const pauseSong = () => {
  return {
    type: PAUSE_SONG
  }
}

export const addQueue = (queue, shuffledQueue) => {
  return {
    type: ADD_QUEUE,
    queue,
    shuffledQueue
  }
}

export const fetchPlaySong = id => dispatch => {
  return SongApi.fetchSong(id).then((song) => dispatch(playSong(song)));
}
