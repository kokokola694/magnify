import { ADD_QUEUE, PLAY_SONG, PAUSE_SONG, RESUME_SONG, CLEAR_QUEUE, SHUFFLE, DELETE_QUEUE } from '../actions/player_actions';
import merge from 'lodash/merge';

const defaultState = { queue: [], shuffledQueue:[], playSong: null, playing: false, shuffled: false };
const clearState = { queue: [], shuffledQueue:[], playSong: null, playing: false };


const shuffle = (songs, firstSong) => {
  const shuffledSongs = songs.filter(song => song.id !== firstSong.id);
  let currentIdx = shuffledSongs.length - 1;
  let randIdx;
  while (currentIdx >= 0) {
    randIdx = Math.floor(Math.random() * currentIdx);
    [shuffledSongs[currentIdx], shuffledSongs[randIdx]] = [shuffledSongs[randIdx], shuffledSongs[currentIdx]];
    currentIdx -= 1;
  }
  shuffledSongs.unshift(firstSong);
  return shuffledSongs;
};


export default (state = defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case ADD_QUEUE:
      newState = merge({}, state);
      newState.queue = action.queue;
      newState.shuffledQueue = action.shuffledQueue;
      return newState;
    case PLAY_SONG:
      newState = merge({}, state);
      newState.playSong = action.song;
      newState.playing = true;
      return newState;
    case PAUSE_SONG:
      newState = merge({}, state);
      newState.playing = false;
      return newState;
    case RESUME_SONG:
      newState = merge({}, state);
      if (state.playSong) newState.playing = true;
      return newState;
    case CLEAR_QUEUE:
      newState = merge({}, clearState, state);
      return newState;
    case DELETE_QUEUE:
      return defaultState;
    case SHUFFLE:
      newState = merge({}, state);
      newState.shuffled = !newState.shuffled;
      if (newState.shuffled) {
        newState.shuffledQueue = shuffle(newState.queue, newState.playSong.song);
      }
      return newState;
    default:
      return state;
  }
}
