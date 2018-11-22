import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../actions/session_actions';
import {RECEIVE_USER, RECEIVE_FOLLOW, REMOVE_FOLLOW} from '../actions/user_actions';
import { merge } from 'lodash';
import { RECEIVE_SAVE, REMOVE_SAVE } from '../actions/save_actions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.currentUser.id]: action.currentUser});
    case RECEIVE_USER:
      return merge({}, state, {[action.user.id]: action.user});
    case RECEIVE_SAVE:
      const newState = merge({}, state);
      const ids = "saved_" + action.savableType.toLowerCase() + "_ids";
      newState[action.saverId][ids].push(action.savableId);
      return newState;
    case REMOVE_SAVE:
      const newState1 = merge({}, state);
      const ids1 = "saved_" + action.savableType.toLowerCase() + "_ids";
      const idx = newState1[action.saverId][ids1].indexOf(action.savableId);
      newState1[action.saverId][ids1].splice(idx, 1);
      return newState1;
    case RECEIVE_FOLLOW:
      const newState2 = merge({}, state);
      newState2[action.followedId].followers_user_ids.push(action.followerId);
      newState2[action.followerId].follows_user_ids.push(action.followedId);
      return newState2;
    case REMOVE_FOLLOW:
      const newState3 = merge({}, state);
      const idx1 = newState3[action.followedId].followers_user_ids.indexOf(action.followerId);
      newState3[action.followedId].followers_user_ids.splice(idx1, 1);
      const idx2 = newState3[action.followerId].follows_user_ids.indexOf(action.followedId);
      newState3[action.followerId].follows_user_ids.splice(idx1, 1);
      return newState3;
    default:
      return state;
  }
}
