import { ADD_QUEUE, PLAY_SONG, PAUSE_SONG, RESUME_SONG, CLEAR_QUEUE } from '../actions/player_actions';
import merge from 'lodash/merge';

const defaultState = { queue: [], playSong: null, playing: false };

export default (state = defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case ADD_QUEUE:
      newState = merge({}, state);
      newState.queue = action.queue;
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
      return defaultState;
    default:
      return state;
  }
}
