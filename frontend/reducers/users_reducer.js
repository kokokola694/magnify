import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../actions/session_actions';
import {RECEIVE_USER, RECEIVE_FOLLOW, REMOVE_FOLLOW} from '../actions/user_actions';
import {NEW_PLAYLIST, REMOVE_PLAYLIST} from '../actions/playlist_actions';
import { merge } from 'lodash';
import { RECEIVE_SAVE, REMOVE_SAVE } from '../actions/save_actions';

export default (state = {}, action) => {
  let newState = merge({}, state);
  let ids, idx;
  switch (action.type) {

    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.currentUser.id]: action.currentUser});

    case RECEIVE_USER:
      return merge({}, state, {[action.user.id]: action.user});

    case RECEIVE_SAVE:
      ids = "saved_" + action.savableType.toLowerCase() + "_ids";
      newState[action.saverId][ids].push(action.savableId);
      return newState;
      break;

    case REMOVE_SAVE:
      ids = "saved_" + action.savableType.toLowerCase() + "_ids";
      idx = newState[action.saverId][ids].indexOf(action.savableId);
      newState[action.saverId][ids].splice(idx, 1);
      return newState1;
      break;

    case RECEIVE_FOLLOW:
      newState[action.followedId].followers_user_ids.push(action.followerId);
      newState[action.followerId].follows_user_ids.push(action.followedId);
      return newState;

    case REMOVE_FOLLOW:
      const idx1 = newState[action.followedId].followers_user_ids.indexOf(action.followerId);
      newState[action.followedId].followers_user_ids.splice(idx1, 1);
      
      const idx2 = newState[action.followerId].follows_user_ids.indexOf(action.followedId);
      newState[action.followerId].follows_user_ids.splice(idx2, 1);
      return newState;

    case NEW_PLAYLIST:
      newState[action.playlist.author_id].playlist_ids.push(action.playlist.id);
      return newState;
      break;

    case REMOVE_PLAYLIST:
      idx = newState[action.playlist.author_id].playlist_ids.indexOf(action.playlist.id);
      newState[action.playlist.author_id].playlist_ids.splice(idx, 1);
      return newState;
      break;

    default:
      return state;
  }
}
