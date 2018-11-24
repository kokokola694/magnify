import { ADD_QUEUE, PLAY_SONG } from '../actions/player_actions';
import merge from 'lodash/merge';

const defaultState = { queue: [], playSong: null };

export default (state = defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case ADD_QUEUE:
      newState = merge({}, state);
      newState.queue = action.queue;
      return newState;
    case PLAY_SONG:
      // Future plan: If song is already in queue, change idx to where song's queue index.
      newState = merge({}, state);
      newState.playSong = action.song;
      return newState;
    default:
      return state;
  }
}
