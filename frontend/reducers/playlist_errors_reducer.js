import { RECEIVE_PLAYLIST_ERRORS, RECEIVE_PLAYLIST } from '../actions/playlist_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PLAYLIST_ERRORS:
      return action.errors;
    case RECEIVE_PLAYLIST:
      return [];
    default:
      return state;
  }
}
