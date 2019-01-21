import { ADD_QUEUE, PLAY_SONG, PAUSE_SONG, RESUME_SONG, ADD_NEXT, CLEAR_NEXT,
  CLEAR_QUEUE, SHUFFLE, DELETE_QUEUE } from '../actions/player_actions';
import merge from 'lodash/merge';

const defaultState = {
  queue: [],
  shuffledQueue:[],
  playSong: null,
  playing: false,
  shuffled: false,
  recent: [],
  next: []
};

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
      newState.recent = newState.recent
        .filter(playSong => playSong.song.id !== action.song.song.id);
      newState.recent.unshift(action.song);
      newState.recent = newState.recent.slice(0,5);
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
      newState = merge({}, defaultState);
      newState.shuffled = state.shuffled;
      newState.recent = state.recent;
      return newState;

    case SHUFFLE:
      newState = merge({}, state);
      newState.shuffled = !newState.shuffled;
      if (newState.shuffled && newState.queue.length > 0) {
        newState.shuffledQueue = shuffle(newState.queue, newState.playSong.song);
      }
      return newState;

    case ADD_NEXT:
      newState = merge({}, state);
      newState.next.push(action.song);
      return newState;

    case CLEAR_NEXT:
      newState = merge({}, state);
      newState.next.shift();
      return newState;

    default:
      return state;
  }
}
