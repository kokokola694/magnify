import { RECEIVE_SONGS, RECEIVE_SONG } from '../actions/song_actions';
import { RECEIVE_PLAYLIST } from '../actions/playlist_actions';

import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONGS:
    case RECEIVE_PLAYLIST:
      return merge({}, state, action.songs);
    case RECEIVE_SONG:
      return merge({}, state, {[action.song.id]: action.song});
    default:
      return state;
  }
}
