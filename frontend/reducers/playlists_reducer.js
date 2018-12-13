import {
  RECEIVE_PLAYLISTS,
  RECEIVE_PLAYLIST,
  REMOVE_PLAYLIST,
  RECEIVE_PLAYLIST_SONG,
  REMOVE_PLAYLIST_SONG,
  NEW_PLAYLIST } from '../actions/playlist_actions';

import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PLAYLISTS:
      return merge({}, state, action.playlists);
    case RECEIVE_PLAYLIST:
    case NEW_PLAYLIST:
      return merge({}, state, {[action.playlist.id]: action.playlist});
    case REMOVE_PLAYLIST:
      const newState = merge({}, state);
      delete newState[action.playlist.id];
      return newState;
    case RECEIVE_PLAYLIST_SONG:
      const newState1 = merge({}, state);
      newState1[action.playlistId].song_ids.push(action.songId);
      return newState1;
    case REMOVE_PLAYLIST_SONG:
      const newState2 = merge({}, state);
      const idx = newState2[action.playlistId].song_ids.indexOf(action.songId);
      newState2[action.playlistId].song_ids.splice(idx, 1);
      return newState2;
    default:
      return state;
  }
}
