import {
  RECEIVE_ARTISTS,
  RECEIVE_ARTIST} from '../actions/artist_actions';
  import {
    RECEIVE_ALBUMS,
    RECEIVE_ALBUM} from '../actions/album_actions';
  import {
    RECEIVE_SONGS,
    RECEIVE_SONG} from '../actions/song_actions';

import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ARTISTS:
    case RECEIVE_ALBUMS:
    case RECEIVE_SONGS:
      return merge({}, state, action.artists);
    case RECEIVE_ARTIST:
    case RECEIVE_ALBUM:
    case RECEIVE_SONG:
      return merge({}, state, {[action.artist.id]: action.artist});

    default:
      return state;
  }
}
